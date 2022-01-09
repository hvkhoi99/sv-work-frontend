import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './PopupConfirm.scss';

PopupConfirm.propTypes = {
  show: PropTypes.bool,
  onShow: PropTypes.func,
  titleConfirm: PropTypes.string,
  contentConfirm: PropTypes.string,
  onOK: PropTypes.func,
  btnOKColor: PropTypes.string,
};

PopupConfirm.defaultProps = {
  show: false,
  onShow: null,
  titleConfirm: 'Ooops... Something went wrong!',
  contentConfirm: '...',
  onOK: null,
  btnOKColor: 'success'
}

function PopupConfirm(props) {
  const { 
    show, onShow, titleConfirm, contentConfirm,
    onOK, btnOKColor
  } = props;

  const handleClose = () => {
    onShow(false)
  }

  const handleOK = () => {
    onOK();
    onShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton={false}>
          <Modal.Title>{titleConfirm}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{contentConfirm}</Modal.Body>
        <Modal.Footer>
          <Button variant={btnOKColor} onClick={handleOK}>
            Ok
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopupConfirm;