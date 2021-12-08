import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

RHFSelectField.propTypes = {
  control: PropTypes.object,
  options: PropTypes.array
};

RHFSelectField.defaultProps = {
  control: {},
  options: []
}

function RHFSelectField(props) {
  const {control, options} = props;

  return (
    <>
      <Controller
        control={control}
        defaultValue={options.map(c => c.value)}
        name="options"
        render={({ field: { onChange, name, value, ref } }) => (
          <Select
            inputRef={ref}
            value={options.find((option) => option.value === value)}
            name={name}
            options={options}
            onChange={(selectedOption) => {
              onChange(selectedOption.label);
            }}
            placeholder="City?"
          // isMulti
          />
        )}
      />
    </>
  );
}

export default RHFSelectField;