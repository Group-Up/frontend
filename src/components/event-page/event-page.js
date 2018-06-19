import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostItem from '../post-item/post-item';
import * as postActions from '../../actions/posts';

class EventPage extends React.Component {
  componentDidMount() {
    this.props.fetchEventPosts(this.props.event._id);
  }
  render() {
    const { event, posts } = this.props;
    return (
      <div>
        <h1>{ event.title }</h1>
        <h3>{ event.date }</h3>
        <h3>{ event.location }</h3>
        <p>{ event.description }</p>
        {
          posts.length > 0 ? posts.map(post => <PostItem post={post} key={post._id}/>) :
            <p>No posts to display</p>
        }
      </div>
    );
  }
}

EventPage.propTypes = {
  event: PropTypes.object,
  posts: PropTypes.array,
  fetchEventPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  fetchEventPosts: id => dispatch(postActions.getEventPosts(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
