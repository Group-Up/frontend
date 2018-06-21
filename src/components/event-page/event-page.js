import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as postActions from '../../actions/posts';
import * as selectedEventActions from '../../actions/single-event';
import * as eventActions from '../../actions/event';
import * as profileActions from '../../actions/profile';
import * as routes from '../../utils/routes';
import PostItem from '../post-item/post-item';
import PostForm from '../post-form/post-form';
import EventForm from '../event-form/event-form';
import Modal from '../modal/modal';
import autobind from '../../utils/autobind';
import './event-page.scss';

class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.selectedEvent,
      authorized: 'loading',
      eventEdit: false,
      addPhoto: false,
      addText: false,
      addAnnouncement: false,
    };
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
                this.props.fetchEventPosts(this.props.selectedEvent._id);
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
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    const memberJSX =
      <div className='event-page'>
        <div className='event-page-left'>
          <p>contacts here</p>
        </div>

        <div className='event-page-main'>
          <h1>{ selectedEvent.title }</h1>
          <p>Date: { selectedEvent.eventDate }</p>
          <p>Location: { selectedEvent.location }</p>
          <p>{ selectedEvent.description }</p>
          { (selectedEvent && selectedEvent.title) &&
          <Modal
            show={this.state.eventEdit}
            handleClose={() => this.setState({ eventEdit: false })}>
            <EventForm event={selectedEvent} onComplete={this.props.updateEvent}/>
          </Modal> }
          <button onClick={() => this.setState({ eventEdit: true })}>Edit Details</button>
          <button className='delete' onClick={this.handleClick}>
            DELETE EVENT
          </button>
          <button onClick={() => this.setState({ addPhoto: true })}>Upload photo</button>
          <Modal show={this.state.addPhoto} handleClose={() => this.setState({ addPhoto: false })}>
            <PostForm
              type='photo'
              onComplete={this.props.createPostRequest}
              handleClose={() => this.setState({ addPhoto: false })}/>
          </Modal>

          <button onClick={() => this.setState({ addText: true })}>Make text post</button>
          <Modal show={this.state.addText} handleClose={() => this.setState({ addText: false })}>
            <PostForm
              type='text'
              onComplete={this.props.createPostRequest}
              handleClose={() => this.setState({ addText: false })}
            />
          </Modal>

          <button onClick={() => this.setState({ addAnnouncement: true })}>Add announcement</button>
          <Modal
            show={this.state.addAnnouncement}
            handleClose={() => this.setState({ addAnnouncement: false })}>
            <PostForm
              type='announcement'
              onComplete={this.props.createPostRequest}
              handleClose={() => this.setState({ addAnnouncement: false })}
            />
          </Modal>
          <div className='posts'>
            {
              posts.length > 0 ?
                sortedPosts.map(post => <PostItem post={post} key={post._id} show={true}/>) :
                <p>No posts to display</p>
            }
          </div>
        </div>
        <div className='event-page-right'>
          <p>something else here</p>
        </div>
      </div>;

    const unauthorizedJSX =
      <div>
        <h2>YOU DO NOT HAVE ACCESS TO THIS EVENT</h2>
      </div>;

    const loadingJSX =
      <div>Loading...</div>;

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
