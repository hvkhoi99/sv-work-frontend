import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
};

SelectField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: [],
}

function SelectField(props) {
  const { field, form, label, placeholder, disabled, options } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  
  const selectedOption = options.find(option => option.value === value);

  const colourStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: '.5rem',
      borderColor: showError
        ? "#dc3545"
        : state.isFocused ? "rgba(0, 0, 255, 0.2)" : "#fff",
      boxShadow: state.isFocused
        ? (showError ? "0 0 0 3px rgba(255, 0, 0, 0.2)" : "0 0 0 3px rgba(0, 150, 255, 0.3)")
        : "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      "&:hover": {
        cursor: 'text'
      },
      "transition": state.isFocused && "all 0.15s ease-out",
    }),
  }

  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.label : selectedOption;

    const changeEvent = {
      target: {
        name: name,
        value: selectedValue
      }
    };
    field.onChange(changeEvent);
  }

  return (
    <FormGroup>
      {label && <Label style={{
        fontWeight: "500"
      }} for={name}>{label}</Label>}

      <Select
        id={name}
        {...field}
        value={selectedOption}
        onChange={handleSelectedOptionChange}

        isClearable={true}
        placeholder={placeholder}
        isDisabled={disabled}
        options={options}
        styles={colourStyles}

        className={showError ? 'is-invalid' : ''}
      />

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default SelectField;