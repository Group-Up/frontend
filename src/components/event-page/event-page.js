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
import EventItem from '../event-item/event-item';
import Modal from '../modal/modal';
import autobind from '../../utils/autobind';
import './event-page.scss';
import { EVENT_EMAIL_BODY, EVENT_EMAIL_SUBJECT } from '../../utils/constants';

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
          this.props.fetchPublicEvents();
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
    const {
      selectedEvent, posts, profile, publicEvents,
    } = this.props;
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    let show;
    if (profile && selectedEvent) {
      show = profile._id === selectedEvent.profile ? 'show' : 'hide';
    }
    const body = `${EVENT_EMAIL_BODY}groupup.site${this.props.location.pathname}`;
    const memberJSX =
      <div className='event-page'>
        <div className='event-page-left'>
          <h3>Contacts</h3>
          {
           profile && profile.friends.length > 0 ?
           profile.friends.map((friend, i) => <li key={i}>
             <p>{ friend.name }</p>
             <a
               href={`mailto:${friend.email}?subject=${EVENT_EMAIL_SUBJECT}&body=${body}`}>
               <p>{ friend.email }</p>
             </a>
           </li>) :
             <p>No contacts to display</p>
          }
        </div>

        <div className='event-page-main'>
          <h1>{ selectedEvent.title }</h1>
          <button
            className='details'
            onClick={() => this.setState({ eventEdit: true })}>Edit Event Details</button>
          <div className='details-div'>
            <p>Date: { selectedEvent.eventDate }</p>
            <p>Location: { selectedEvent.location }</p>
            <p>{ selectedEvent.description }</p>
          </div>
          { (selectedEvent && selectedEvent.title) &&
          <Modal
            show={this.state.eventEdit}
            handleClose={() => this.setState({ eventEdit: false })}>
            <EventForm event={selectedEvent} onComplete={this.props.updateEvent}/>
          </Modal> }
          <Modal show={this.state.addPhoto} handleClose={() => this.setState({ addPhoto: false })}>
            <h4>Photo</h4>
            <PostForm
              type='photo'
              onComplete={this.props.createPostRequest}
              handleClose={() => this.setState({ addPhoto: false })}/>
          </Modal>
          <Modal show={this.state.addText} handleClose={() => this.setState({ addText: false })}>
            <h4>Text post</h4>
            <PostForm
              type='text'
              onComplete={this.props.createPostRequest}
              handleClose={() => this.setState({ addText: false })}
            />
          </Modal>
          <div className='post-buttons'>
            <button onClick={() => this.setState({ addPhoto: true })}>Upload photo</button>
            <button onClick={() => this.setState({ addText: true })}>Make text post</button>
            <button
              onClick={() => this.setState({ addAnnouncement: true })}>Make announcement</button>
          </div>

          <Modal
            show={this.state.addAnnouncement}
            handleClose={() => this.setState({ addAnnouncement: false })}>
            <h4>Announcement</h4>
            <PostForm
              type='announcement'
              onComplete={this.props.createPostRequest}
              handleClose={() => this.setState({ addAnnouncement: false })}
            />
          </Modal>
          <h1>Posts</h1>
          <div className='posts'>
            {
              posts.length > 0 ?
                sortedPosts.map(post => <PostItem post={post} key={post._id} show={true}/>) :
                <p>No posts to display</p>
            }
          </div>
          <div className={`delete-${show}`}>
            <button onClick={this.handleClick}>
              DELETE EVENT
            </button>
          </div>
        </div>
        <div className='event-page-right' onClick={() => window.location.reload()}>
          <h3>Public Events</h3>
            {
              publicEvents.length > 0 ?
              publicEvents.map(event => <EventItem event={event} key={event._id}/>) :
              <p>No events to display</p>
            }
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
  fetchPublicEvents: PropTypes.func,
  publicEvents: PropTypes.array,
};

const mapStateToProps = state => ({
  posts: state.posts,
  selectedEvent: state.selectedEvent,
  loggedIn: !!state.token,
  profile: state.profile,
  publicEvents: state.publicEvents,
});

const mapDispatchToProps = dispatch => ({
  fetchEventPosts: id => dispatch(postActions.getEventPosts(id)),
  fetchSelectedEvent: id => dispatch(selectedEventActions.getEventRequest(id)),
  createPostRequest: (post, id) => dispatch(postActions.createPostRequest(post, id)),
  deleteEvent: event => dispatch(eventActions.removeEventRequest(event)),
  updateEvent: event => dispatch(eventActions.updateEventRequest(event)),
  fetchProfile: () => dispatch(profileActions.profileFetchRequest()),
  fetchPublicEvents: () => dispatch(eventActions.getPublicEventsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
