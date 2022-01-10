import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

SelectField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
  isMulti: PropTypes.bool,
  isOptionValue: PropTypes.bool,
  isCreatableSelect: PropTypes.bool,
  labelClassName: PropTypes.string,
};

SelectField.defaultProps = {
  field: {},
  form: {},

  label: '',
  placeholder: '',
  disabled: false,
  options: [],
  isMulti: false,
  isOptionValue: false,
  isCreatableSelect: false,
  labelClassName: ''
}

function SelectField(props) {
  const {
    field, form, label, placeholder, disabled,
    options, isMulti, isOptionValue, isCreatableSelect, labelClassName
  } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const selectedOption = options.find(option => option.label === value);

  const colourStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: 'lightgrey',
      }
    },
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
    const selectedValue = selectedOption ? selectedOption.value : selectedOption;
    const selectedValueB = selectedOption && selectedOption;

    const changeEvent = {
      target: {
        name: name,
        value: isOptionValue ? selectedValue : selectedValueB
      }
    };
    field.onChange(changeEvent);
  }

  return (
    <FormGroup>
      {label && <Label style={{ fontWeight: '500' }} className={labelClassName} for={name}>{label}</Label>}

      {isCreatableSelect
        ? <CreatableSelect
          id={name}
          {...field}
          // value={isOptionValue && field.value}

          onChange={handleSelectedOptionChange}

          isClearable={true}
          isMulti={isMulti}

          options={options}
          placeholder={placeholder}
          isDisabled={disabled}
          styles={colourStyles}

          className={showError ? 'is-invalid' : ''}
        /> : <Select
          id={name}
          {...field}
          value={isOptionValue ? selectedOption : field.value}
          onChange={handleSelectedOptionChange}

          isClearable={true}
          isMulti={isMulti}

          options={options}
          placeholder={placeholder}
          isDisabled={disabled}
          styles={colourStyles}

          className={showError ? 'is-invalid' : ''}
        />
      }


      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default SelectField;