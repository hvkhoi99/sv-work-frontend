import TextEditor from 'components/TextEditor';
import PropTypes from 'prop-types';
import React from 'react';
import * as FiIcons from 'react-icons/fi';
import Popup from 'reactjs-popup';
import './PopupTextEditor.scss';

PopupTextEditor.propTypes = {
  // component: PropTypes.element
  onTextChange: PropTypes.func,
  initData: PropTypes.string,
  label: PropTypes.string,
};

PopupTextEditor.defaultProps = {
  // component: null
  onTextChange: null,
  initData: '',
  label: ''
}

const CustomButton = React.forwardRef(({ open, ...props }, ref) => (
  <button
    style={{
      backgroundColor: "transparent",
      border: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: ".5rem",
    }}
    type="button"
    className="button"
    ref={ref}
    {...props}>
    <FiIcons.FiEdit className="popup-text-editor__title__icon" />
    {/* Trigger - {props.open ? 'Opened' : 'Closed' */}
  </button>
));

function PopupTextEditor(props) {
  const { onTextChange, initData, label } = props;

  return (
    <div className="popup-text-editor">
      <Popup
        trigger={open => <CustomButton open={open} />}
        position="center"
        modal
        nested
        closeOnDocumentClick
      >
        {
          close => (
            <TextEditor
              title={label}
              close={close}
              onTextChange={onTextChange}
              initData={initData}

            />
          )
        }
      </Popup>
    </div>
  );
}

export default PopupTextEditor;