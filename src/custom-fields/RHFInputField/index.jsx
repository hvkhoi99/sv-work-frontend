import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

RHFInputField.propTypes = {
  inputName: PropTypes.string,
  register: PropTypes.func,
  control: PropTypes.object,
  scheme: PropTypes.object
};

RHFInputField.defaultProps = {
  inputName: '',
  register: null,
  control: {},
  scheme: {},
}

function RHFInputField(props) {
  const { inputName, register, control, scheme } = props;
  const isSchemeEmpty = (Object.keys(scheme).length === 0 && scheme.constructor === Object);


  return (
    <>
      <Controller
        control={control}
        defaultValue="Search"
        name="options"
        render={({ field: { onChange } }) => (
          <>
            <input
              className={isSchemeEmpty ? "form-control" : "form-control is-invalid"}
              {...register(inputName)}
              onChange={(e) => onChange(parseInt(e.target.value))}
            />
            {/* {scheme &&
              <span className="text-danger">{scheme?.message}</span>} */}
          </>
        )}
      />
    </>
  );
}

export default RHFInputField;