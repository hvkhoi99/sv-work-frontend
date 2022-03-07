import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

RHFSelectField.propTypes = {
  control: PropTypes.object,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  isStyles: PropTypes.bool,
  isTheme: PropTypes.bool,
  scheme: PropTypes.object
};

RHFSelectField.defaultProps = {
  control: {},
  options: [],
  placeholder: '',
  isStyles: false,
  isTheme: false,
  scheme: {}
}

function RHFSelectField(props) {
  const { control, options, placeholder, isStyles, isTheme, scheme } = props;

  const colourStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: 'lightgrey',
      }
    },
    control: (base, state) => ({
      ...base,
      borderRadius: '1rem',
      borderColor: state.isFocused ? 'var(--success)' : 'var(--success)',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(0, 194, 0, 0.4)' : null,
      outline: state.isFocused ? '0 none' : null,
      "&:hover": {
        borderColor: state.isFocused ? null : "var(--success)"
      },
      fontFamily: "Poppins, sans-serif",
      fontSize: ".9rem",
    }),
  }

  const theme = (theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary: 'var(--success)',
    },
  })

  return (
    <>
      <Controller
        control={control}
        defaultValue=''
        name="options"
        render={({ field: { onChange, name, value, ref } }) => (
          <>
            <Select
              inputRef={ref}
              value={options.find((option) => option.value === value)}
              name={name}
              options={options}
              onChange={(selectedOption) => {
                onChange(selectedOption.label);
              }}
              placeholder={placeholder}
              styles={isStyles ? colourStyles : ''}
              theme={isTheme ? theme : null}
            // isMulti
            />
            {scheme &&
              <span className="text-danger form-span">{scheme?.message}</span>}
          </>
        )}
      />
    </>
  );
}

export default RHFSelectField;