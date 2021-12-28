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
  const { field, form, options, label, placeholder, disabled } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const selectedOption = options.find(option => option.value === value);
  const colourStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: '.5rem',
      border: state.isFocused ? "default" : "1px solid #fff",
      boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      "&:hover": {
        cursor: 'text'
      },
    }),
  }

  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : selectedOption;

    const changeEvent = {
      target: {
        name: name,
        value: selectedValue
      }
    };
    field.onChange(changeEvent);
  }

  // const onBlur = () => {
  //   const changeEvent = {
  //     target: {
  //       name: "none",
  //       value: ''
  //     }
  //   };
  //   field.onChange(changeEvent);
  // }

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
        // onBlur={handleSelectedOptionChange}
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