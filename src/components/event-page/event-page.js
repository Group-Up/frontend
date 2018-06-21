import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostItem from '../post-item/post-item';
import * as postActions from '../../actions/posts';
import * as selectedEventActions from '../../actions/single-event';
import PostForm from '../post-form/post-form';
import EventForm from '../event-form/event-form';
import * as eventActions from '../../actions/event';
import * as profileActions from '../../actions/profile';
import * as routes from '../../utils/routes';
import autobind from '../../utils/autobind';

class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.selectedEvent, authorized: 'loading' };
    autobind.call(this, EventPage);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      const id = this.props.location.pathname.split('/')[2];
      this.props.fetchProfile()
        .then(() => {
          this.props.fetchSelectedEvent(id)
            .then((selectedEvent) => {
              const creator = this.props.profile._id === selectedEvent.payload.profile;
              const guest = selectedEvent.payload.guests.includes(this.props.profile._id);
              if (selectedEvent.payload.isPublic || (creator || guest)) {
                return this.setState({ authorized: true });
              }
              this.props.fetchEventPosts(this.props.selectedEvent._id);
              return this.setState({ authorized: false });
            });
        });
    }
  }

  handleClick(event) {
    event.preventDefault();
    this.props.deleteEvent(this.props.selectedEvent);
    this.props.history.push(routes.DASHBOARD);
  }

  render() {
    const { selectedEvent, posts } = this.props;
    const memberJSX =
      <div>
        <h1>{ selectedEvent.title }</h1>
        <h3>{ selectedEvent.date }</h3>
        <h3>{ selectedEvent.location }</h3>
        <p>{ selectedEvent.description }</p>
        { (selectedEvent && selectedEvent.title) &&
        <EventForm event={selectedEvent} onComplete={this.props.updateEvent}/> }
        <button onClick={this.handleClick}>
          DELETE EVENT
        </button>

        {
          posts.length > 0 ? posts.map(post => <PostItem post={post} key={post._id} show={true}/>) :
            <p>No posts to display</p>
        }
        <h4>Upload photo</h4>
        <PostForm type='photo' onComplete={this.props.createPostRequest}/>

        <h4>Make text post</h4>
        <PostForm type='text' onComplete={this.props.createPostRequest}/>

        <h4>Add announcement</h4>
        <PostForm type='announcement' onComplete={this.props.createPostRequest}/>
      </div>;

    const unauthorizedJSX =
      <div>
        <h2>YOU DO NOT HAVE ACCESS TO THIS EVENT</h2>
      </div>;

    const loadingJSX =
      <div>Loading...</div>

    return (
      <div>
        { !this.state.authorized && unauthorizedJSX }
        { this.state.authorized === true && memberJSX }
        { this.state.authorized === 'loading' && loadingJSX }
      </div>
    );
  }
}

EventPage.propTypes = {
  selectedEvent: PropTypes.object,
  posts: PropTypes.array,
  fetchEventPosts: PropTypes.func,
  fetchSelectedEvent: PropTypes.func,
  createPostRequest: PropTypes.func,
  deleteEvent: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
  updateEvent: PropTypes.func,
  loggedIn: PropTypes.bool,
  profile: PropTypes.object,
  fetchProfile: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: state.posts,
  selectedEvent: state.selectedEvent,
  loggedIn: !!state.token,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  fetchEventPosts: id => dispatch(postActions.getEventPosts(id)),
  fetchSelectedEvent: id => dispatch(selectedEventActions.getEventRequest(id)),
  createPostRequest: (post, id) => dispatch(postActions.createPostRequest(post, id)),
  deleteEvent: event => dispatch(eventActions.removeEventRequest(event)),
  updateEvent: event => dispatch(eventActions.updateEventRequest(event)),
  fetchProfile: () => dispatch(profileActions.profileFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
