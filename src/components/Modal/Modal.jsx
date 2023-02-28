import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Box, ModalContent } from './modal.styled';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      console.log('esc');
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Box onClick={this.handleBackdropClick}>
        <ModalContent>{this.props.children}</ModalContent>
      </Box>,
      modalRoot
    );
  }
}
