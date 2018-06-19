import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Profile from '../profile/profile';
import * as profileActions from '../../actions/profile';
import * as postActions from '../../actions/posts';
import PostItem from '../post-item/post-item';

class Dashboard extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.pFetchUserProfile()
        .then(() => {
          this.props.pFetchPosts();
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
        <h3>My Events:</h3>
        {
          /* TODO: ADD EVENT ITEMS HERE */
          <p>No events to display</p>
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
  posts: PropTypes.array,
  events: PropTypes.array,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
