import PopupTextEditor from 'components/PopupTextEditor';
// import InputField from 'custom-fields/InputField';
// import { FastField } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import * as CgIcons from 'react-icons/cg';
import * as TiIcons from 'react-icons/ti';
import { FormGroup, Label } from 'reactstrap';
import './DivAreaText.scss';

DivAreaText.propTypes = {
  label: PropTypes.string,
  textValue: PropTypes.string,
  placeholder: PropTypes.string,
  onTextChange: PropTypes.func,
  onRereshField: PropTypes.func,

  name: PropTypes.string,
  isSubmit: PropTypes.bool,
};

DivAreaText.defaultProps = {
  label: '',
  textValue: '',
  placeholder: '',
  onTextChange: null,
  onRereshField: null,

  name: '',
  isSubmit: false,
}

function DivAreaText(props) {
  const { textValue, onTextChange, onRereshField, label, name, isSubmit } = props;
  const isValid = textValue.length <= 0;

  const handleRefreshField = () => {
    onRereshField(name);
  }

  return (
    <FormGroup className="formGroup-text-editor">
      <div className="formGroup-text-editor__title">
        {label && <Label for={name}>{label}</Label>}
        <PopupTextEditor
          onTextChange={onTextChange}
          label={label}
          initData={textValue}
        />
        {textValue !== "" && <TiIcons.TiDelete
          className="formGroup-text-editor__title__icon"
          onClick={handleRefreshField}
        />}
      </div>
      <div className={isSubmit && isValid ? "div-area-text invalid-validation" : "div-area-text"}>
        {(isSubmit && isValid) && <div className="invalid-validation__icon-danger">
          <CgIcons.CgDanger className="invalid-validation__icon-danger__icon" />
        </div>}
        {ReactHtmlParser(textValue)}
      </div>
      {(isSubmit && isValid) && <span className="text-danger" style={{ fontSize: ".8rem" }}>
        {label} is required
      </span>}
    </FormGroup>
  );
}

export default DivAreaText;