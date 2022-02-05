import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import InviteCandidateForm from '../InviteCandidateForm';

PopupInviteCandidate.propTypes = {

};


PopupInviteCandidate.propTypes = {
  onInvite: PropTypes.func
};

PopupInviteCandidate.defaultProps = {
  onInvite: null
};

const InviteCandidateButton = React.forwardRef(({ open, ...props }, ref) => (
  <button
    type="button"
    className="btn btn-success btn-sm"
    ref={ref}
    {...props}
  >
    {/* Trigger - {props.open ? 'Opened' : 'Closed' */}
    Invite
  </button>
));

function PopupInviteCandidate(props) {
  const { onInvite } = props;

  return (
    <>
      <Popup
        trigger={open => <InviteCandidateButton open={open} />}
        position="center"
        modal
        nested
        closeOnDocumentClick
      >
        {
          close => (
            <InviteCandidateForm
              onInvite={onInvite}
              close={close}
            />
          )
        }
      </Popup>
    </>
  );
}

export default PopupInviteCandidate;