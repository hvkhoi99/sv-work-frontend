import { ErrorMessage, useField, useFormikContext } from 'formik';
import React from 'react';
import DatePicker from "react-datepicker";
import { FormFeedback } from 'reactstrap';

DatePickerField.propTypes = {

};

function DatePickerField(props) {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field] = useField(props);
  return (
    <>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
          setFieldValue(field.name, val);
        }}
        className="form-control"
        // withPortal
        fixedHeight
        isClearable={true}
        showPopperArrow={false}
        onChangeRaw={e => {
          setFieldTouched(field.name, true, true);
        }}
      />
      <ErrorMessage name={field.name} component={FormFeedback} />
    </>
  )
}

export default DatePickerField;