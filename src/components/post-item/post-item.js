import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as postActions from '../../actions/posts';
import './post-item.scss';

class PostItem extends React.Component {
  render() {
    const { post } = this.props;
    const showDelete = this.props.show ? 'show' : 'hide';
    return (
      <li className='post-item'>
        <h3>{ post.title }</h3>
        <p>{ post.date }</p>
        <p>{ post.location }</p>
        <p>{ post.likes.length }</p>
        <button onClick={() => this.props.deletePost(post)} className={showDelete}> Delete </button>
      </li>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object,
  deletePost: PropTypes.func,
  show: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  deletePost: post => dispatch(postActions.removePostRequest(post)),
});

export default connect(null, mapDispatchToProps)(PostItem);
