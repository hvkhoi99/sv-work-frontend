import TextField from "@material-ui/core/TextField";
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import '../InputField/InputField.scss';
import './TextFieldDate.scss';
import { makeStyles } from "@material-ui/core/styles";

TextFieldDate.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  moreClassName: PropTypes.string,
  inputClassName: PropTypes.string,

  labelClassName: PropTypes.string,
  txtLabel: PropTypes.string,
};

TextFieldDate.defaultProps = {
  field: {},
  form: {},

  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
  moreClassName: '',
  inputClassName: '',
  labelClassName: '',
  txtLabel: ''
}

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiFormLabel-root": {
      color: 'var(--success)',
      fontWeight: '500',
      fontSize: '1.1rem'
    }
  }
}));

function TextFieldDate(props) {
  const {
    field, form,
    type, label, placeholder, disabled, moreClassName, inputClassName, labelClassName, txtLabel, variant
  } = props;

  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const classes = useStyles();

  return (
    <FormGroup className={`field-container ${moreClassName}`}>
      {label && <Label className={`label ${labelClassName}`} for={name}>{label}</Label>}

      <TextField
        // fullWidth
        id={name}
        {...field}

        label={txtLabel}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        error={showError}
        className={`${inputClassName} ${classes.root}`}
        variant={variant}
        helperText={showError && errors[name]}

        InputLabelProps={{
          shrink: true,
        }}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default TextFieldDate;