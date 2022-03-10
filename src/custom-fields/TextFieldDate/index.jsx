import TextField from "@material-ui/core/TextField";
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import '../InputField/InputField.scss';
import './TextFieldDate.scss';
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

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
  lineHeight: PropTypes.string,
  fontSize: PropTypes.string,
  inputProps: PropTypes.object
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
  txtLabel: '',
  lineHeight: '1rem',
  fontSize: '1.2rem',
  inputProps: {}
}


const StyledTextField = styled(TextField)`
  /* default */
  /* .MuiInput-underline:before {
    border-bottom: 1px solid green;
  } */
  /* hover (double-ampersand needed for specificity reasons. */
  /* && .MuiInput-underline:hover:before {
    border-bottom: 2px solid lightblue;
  } */
  /* focused */
  .MuiInput-underline:after {
    border-bottom: 2px solid var(--success);
  }
`;

function TextFieldDate(props) {
  const {
    field, form,
    type, label, placeholder, disabled, moreClassName, inputClassName, 
    labelClassName, txtLabel, variant, lineHeight, fontSize, inputProps
  } = props;

  const useStyles = makeStyles(theme => ({
    root: {
      "& .MuiFormLabel-root": {
        color: 'var(--success)',
        fontWeight: '600',
        fontSize: `${fontSize}`,
        lineHeight: `${lineHeight}`,
      }
    }
  }));

  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const classes = useStyles();

  return (
    <FormGroup className={`field-container ${moreClassName}`}>
      {label && <Label className={`label ${labelClassName}`} for={name}>{label}</Label>}

      <StyledTextField
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
        inputProps={inputProps}

        InputLabelProps={{
          shrink: true,
        }}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default TextFieldDate;