import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import './RHFInputField.scss';

RHFInputField.propTypes = {
  inputName: PropTypes.string,
  register: PropTypes.func,
  control: PropTypes.object,
  scheme: PropTypes.object,
  placeholder: PropTypes.string,
  moreClassName: PropTypes.string,
  type: PropTypes.string,
};

RHFInputField.defaultProps = {
  inputName: '',
  register: null,
  control: {},
  scheme: {},
  placeholder: '',
  moreClassName: '',
  type: '',
}

function RHFInputField(props) {
  const { inputName, register, control, scheme, placeholder, moreClassName, type } = props;
  const isSchemeEmpty = (Object.keys(scheme).length === 0 && scheme.constructor === Object);

  return (
    <>
      <Controller
        control={control}
        defaultValue="Search"
        name=''
        render={({ field }) => (
          <>
            <input
              {...field}
              className={isSchemeEmpty ? `form-control form-control-input ${moreClassName}` : `form-control form-control-input is-invalid ${moreClassName}`}
              {...register(inputName)}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
              placeholder={placeholder}
              type={type}
              autoComplete={inputName}
            />
            {scheme &&
              <span className="text-danger form-span">{scheme?.message}</span>}
          </>
        )}
      />
    </>
  );
}

export default RHFInputField;