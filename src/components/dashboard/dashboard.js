import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EventForm from '../event-form/event-form';
import * as eventActions from '../../actions/event';
// import ImageForm from '../image-form/image-form';
// import * as imageActions from '../../actions/images';
// import { WELCOME } from '../../text';
import Profile from '../profile/profile';
import EventItem from '../event-item/event-item';
import * as profileActions from '../../actions/profile';
import * as postActions from '../../actions/posts';
import PostItem from '../post-item/post-item';

class Dashboard extends React.Component {
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
        <EventForm onComplete={this.props.doCreateEvent}/>

        <h3>My Events:</h3>
        {
          events.length > 0 
           ? 
           events.map((event, i) => <EventItem event={event} key={i}/>) 
           :
          <p> No events to display </p>
        }
        <h3>Recent Posts:</h3>
        {
          posts.length > 0 ? posts.map(post => <PostItem post={post} key={post._id}/>) :
            <p>No posts to display</p>
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  // doCreateImage: PropTypes.func,
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
  // doCreateImage: image => dispatch(imageActions.createRequest(image)),
  pFetchUserProfile: () => dispatch(profileActions.profileFetchRequest()),
  pFetchPosts: () => dispatch(postActions.getPostsRequest()),
  pFetchEvents: () => dispatch(eventActions.getPrivateEventsRequest()),
  doCreateEvent: event => dispatch(eventActions.eventCreateRequest(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
