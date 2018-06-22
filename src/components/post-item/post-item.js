import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as postActions from '../../actions/posts';
import PostForm from '../post-form/post-form';
import './post-item.scss';
import Modal from '../modal/modal';

class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }
  render() {
    const { post } = this.props;
    const show = this.props.show ? 'show' : 'hide';
    const postClass = `post-item ${post.type}`;
    return (
      <li className={postClass}>
        <button onClick={() => this.props.deletePost(post)} className={show}> x </button>
        <button onClick={() => this.setState({ editing: true })} className={show}>edit</button>
        <h3>{ post.title }</h3>
        <p>{ post.description }</p>
        <p>{ post.likes.length > 0 && post.likes.length }</p>
        <img src={post.imageUrl}/>
        <div className={show}>
          <Modal handleClose={() => this.setState({ editing: false })} show={this.state.editing}>
            <PostForm
              onComplete={this.props.updatePost}
              post={post}
              type={post.type}
              handleClose={() => this.setState({ editing: false })}
            />
          </Modal>
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
