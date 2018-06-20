import React from 'react';
import PropTypes from 'prop-types';

class PostItem extends React.Component {
  render() {
    const { post } = this.props;
    return (
      <li className='post-item'>
        <h3>{ post.title }</h3>
        <p>{ post.date }</p>
        <p>{ post.location }</p>
        <p>{ post.likes.length }</p>
      </li>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object,
};

export default PostItem;
