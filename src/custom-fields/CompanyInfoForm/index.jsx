import InputField from 'custom-fields/InputField';
import { FastField } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

CompanyInfoForm.propTypes = {
  disabled: PropTypes.bool
};

CompanyInfoForm.defaultProps = {
  disabled: false
}

function CompanyInfoForm(props) {
  const { disabled } = props;

  return (
    <>
      <FastField
        name="companyName"
        component={InputField}

        label="Company name"
        disabled={disabled}
      />
      <FastField
        name="location"
        component={InputField}

        label="Location"
        disabled={disabled}
      />
      <FastField
        name="phoneNumber"
        component={InputField}

        label="Phone Number"
        disabled={disabled}
      />
      <FastField
        name="companyIndustry"
        component={InputField}

        label="Company Industry"
        disabled={disabled}
      />
      <FastField
        name="companySize"
        component={InputField}

        label="Company Size"
        disabled={disabled}
      />
      <FastField
        name="taxCode"
        component={InputField}

        label="Tax Code"
        disabled={disabled}
        labelClassName="tax-code"
      />
    </>
  );
}

export default CompanyInfoForm;