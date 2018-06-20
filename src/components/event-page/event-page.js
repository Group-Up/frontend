import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostItem from '../post-item/post-item';
import * as postActions from '../../actions/posts';
import * as selectedEventActions from '../../actions/single-event';
import PostForm from '../post-form/post-form';
import EventForm from '../event-form/event-form';
import * as eventActions from '../../actions/event';
import * as routes from '../../utils/routes';
import autobind from '../../utils/autobind';

class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.selectedEvent;
    autobind.call(this, EventPage);
  }

  componentDidMount() {
    const id = this.props.location.pathname.split('/')[2];
    this.props.fetchSelectedEvent(id)
      .then(() => {
        this.props.fetchEventPosts(this.props.selectedEvent._id);
      });
  }

  handleClick(event) {
    event.preventDefault();
    this.props.deleteEvent(this.props.selectedEvent);
    this.props.history.push(routes.DASHBOARD);
  }

  render() {
    const { selectedEvent, posts } = this.props;
    return (
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
};

const mapStateToProps = state => ({
  posts: state.posts,
  selectedEvent: state.selectedEvent,
});

const mapDispatchToProps = dispatch => ({
  fetchEventPosts: id => dispatch(postActions.getEventPosts(id)),
  fetchSelectedEvent: id => dispatch(selectedEventActions.getEventRequest(id)),
  createPostRequest: (post, id) => dispatch(postActions.createPostRequest(post, id)),
  deleteEvent: event => dispatch(eventActions.removeEventRequest(event)),
  updateEvent: event => dispatch(eventActions.updateEventRequest(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
