import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './PopupConfirm.scss';

PopupConfirm.propTypes = {
  show: PropTypes.bool,
  onShow: PropTypes.func,
  titleConfirm: PropTypes.string,
  contentConfirm: PropTypes.string,
  pageUrl: PropTypes.string,
};

PopupConfirm.defaultProps = {
  show: false,
  onShow: null,
  titleConfirm: 'Ooops... Something went wrong!',
  contentConfirm: '...',
  pageUrl: ''
}

function PopupConfirm(props) {
  const { show, onShow, titleConfirm, contentConfirm, pageUrl } = props;
  const history = useHistory();

  const handleClose = () => {
    onShow(false)
  }

  const handleOK = () => {
    onShow(false);
    history.push(pageUrl);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton={false}>
          <Modal.Title>{titleConfirm}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{contentConfirm}</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleOK}>
            Okay, let's do it
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