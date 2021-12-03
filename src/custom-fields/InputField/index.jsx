import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';
import './InputField.scss';

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false
}

function InputField(props) {

  const {
    field, form,
    type, label, placeholder, disabled
  } = props;

  const {name} = field;
  const {errors, touched} = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup>
      {label && <Label style={label === "Tax Code" ? {color: "var(--success)"} : {color: "black"}} className="label" for={name}>{label}</Label>}
      <Input 
      id={name}
      {...field}

      type={type}
      placeholder={placeholder}
      disabled={disabled}
      invalid={showError}
      className="input-field"
      />
    <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default InputField;