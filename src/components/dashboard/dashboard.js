import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as eventActions from '../../actions/event';
import * as profileActions from '../../actions/profile';
import * as postActions from '../../actions/posts';
import Profile from '../profile/profile';
import EventForm from '../event-form/event-form';
import EventItem from '../event-item/event-item';
import PostItem from '../post-item/post-item';
import Modal from '../modal/modal';
import autobind from '../../utils/autobind';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventForm: false,
    };
    autobind.call(this, Dashboard);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.pFetchUserProfile()
        .then(() => {
          this.props.pFetchPosts();
          this.props.pFetchEvents();
        })
        .catch(console.error);
    }
  }

  render() {
    const { profile, posts, events } = this.props;
    const username = profile && profile.username;
    return (
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <h2>Welcome { username && username }</h2>
        <Profile profile={profile}/>
        <Modal show={this.state.eventForm} handleClose={() => this.setState({ eventForm: false })}>
          <EventForm onComplete={this.props.doCreateEvent}/>
        </Modal>
        <button onClick={() => this.setState({ eventForm: true })}> CREATE EVENT</button>
        <h3>My Events:</h3>
        {
          events.length > 0 
           ? 
           events.map(event => <EventItem event={event} key={event._id}/>)
           :
          <p> No events to display </p>
        }
        <h3>Recent Posts:</h3>
        {
          posts.length > 0 ?
            posts.map(post => <PostItem post={post} show={false} key={post._id}/>) :
            <p>No posts to display</p>
        }
        <div>
          <h3>Contacts</h3>
          <ul>
            { profile &&
              profile.friends.map((friend, i) =>
              <li key={i}>
              <p>{ friend.name }</p>
              <p>{ friend.email }</p>
            </li>)
            }
          </ul>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object,
  loggedIn: PropTypes.bool,
  pFetchUserProfile: PropTypes.func,
  pFetchPosts: PropTypes.func,
  pFetchEvents: PropTypes.func,
  posts: PropTypes.array,
  events: PropTypes.array,
  doCreateEvent: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
  posts: state.posts,
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  pFetchUserProfile: () => dispatch(profileActions.profileFetchRequest()),
  pFetchPosts: () => dispatch(postActions.getPostsRequest()),
  pFetchEvents: () => dispatch(eventActions.getPrivateEventsRequest()),
  doCreateEvent: event => dispatch(eventActions.eventCreateRequest(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
