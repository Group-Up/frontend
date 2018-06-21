import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

export default class Modal extends React.Component {
  render() {
    const { show, handleClose, children } = this.props;
    const showHide = show ? 'modal display-block' : 'modal display-none';
    return (
      <div className={showHide}>
        <main className='modal-main'>
          <button className='modal-button' onClick={handleClose}>X</button>
          { children }
        </main>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};
