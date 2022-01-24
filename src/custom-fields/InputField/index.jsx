import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import './InputField.scss';

InputField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string,
  moreClassName: PropTypes.string,
  inputClassName: PropTypes.string,

  newValue: PropTypes.string,
  labelClassName: PropTypes.string,

  isTextArea: PropTypes.bool,
};

InputField.defaultProps = {
  field: {},
  form: {},

  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
  autoComplete: '',
  moreClassName: '',
  inputClassName: '',
  newValue: '',
  labelClassName: '',
  isTextArea: false,
}

function InputField(props) {

  const {
    field, form,
    type, label, placeholder, disabled, moreClassName, autoComplete,
    inputClassName, newValue, labelClassName, isTextArea
  } = props;

  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup className={`${moreClassName}`}>
      {label && <Label className={`label ${labelClassName}`} for={name}>{label}</Label>}
      <Input
        id={name}
        {...field}
        value={field.value || newValue}

        type={type}
        placeholder={placeholder}
        disabled={disabled}
        invalid={showError}
        className={`input-field ${inputClassName}`}
        autoComplete={autoComplete}
        rows={isTextArea ? 10 : 1}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default InputField;