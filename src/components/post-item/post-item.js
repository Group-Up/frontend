import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as postActions from '../../actions/posts';
import PostForm from '../post-form/post-form';
import './post-item.scss';

class PostItem extends React.Component {
  render() {
    const { post } = this.props;
    const show = this.props.show ? 'show' : 'hide';
    return (
      <li className='post-item'>
        <h3>{ post.title }</h3>
        <p>{ post.date }</p>
        <p>{ post.location }</p>
        <p>{ post.likes.length > 0 && post.likes.length }</p>
        <img src={post.imageUrl}/>
        <button onClick={() => this.props.deletePost(post)} className={show}> Delete </button>
        <div className={show}>
          <PostForm onComplete={this.props.updatePost} post={post} type={post.type}/>
        </div>
      </li>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object,
  deletePost: PropTypes.func,
  show: PropTypes.bool,
  updatePost: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  deletePost: post => dispatch(postActions.removePostRequest(post)),
  updatePost: post => dispatch(postActions.updatePostRequest(post)),
});

export default connect(null, mapDispatchToProps)(PostItem);
