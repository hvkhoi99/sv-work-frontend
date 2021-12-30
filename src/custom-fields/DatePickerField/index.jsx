import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from "react-datepicker";
import * as CgIcons from 'react-icons/cg';
import './DatePickerField.scss';

DatePickerField.propTypes = {
  label: PropTypes.string,
  isSubmit: PropTypes.bool,
};

DatePickerField.defaultProps = {
  label: '',
  isSubmit: false,
}

function DatePickerField(props) {
  const { label, isSubmit } = props;
  const { setFieldValue, } = useFormikContext();
  const [field] = useField(props);

  const handleChange = (value) => {
    setFieldValue(field.name, value);
  }

  return (
    <>
      <div className="date-picker-field">
        <DatePicker
          {...field}
          {...props}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(value) => handleChange(value)}
          customInput={<input
            className={
              (isSubmit && (field.value === "" || field.value === null))
                ? "form-control input-field invalid-validation"
                : "form-control input-field"
            }
          />}
          // withPortal
          fixedHeight
          isClearable={true}
          showPopperArrow={false}
        // onChangeRaw={e => {
        //   setFieldTouched(field.name, true, true);
        // }}
        />
        {(isSubmit && (field.value === "" || field.value === null)) && <CgIcons.CgDanger className="invalid-validation__icon" />}
      </div>
      {(isSubmit && (field.value === "" || field.value === null)) && <span className="text-danger" style={{ fontSize: ".8rem" }}>
        {label} is required
      </span>}
    </>
  )
}

export default DatePickerField;