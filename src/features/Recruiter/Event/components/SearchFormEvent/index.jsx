// import * as Yup from 'yup';
import TextFieldDate from 'custom-fields/TextFieldDate';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import './SearchFormEvent.scss';
import * as RiIcons from 'react-icons/ri';

SearchFormEvent.propTypes = {
  onSubmit: PropTypes.func,
};

SearchFormEvent.defaultProps = {
  onSubmit: null,
}

function SearchFormEvent(props) {
  const { onSubmit } = props;

  const initialValues = {
    event: '',
    in: '',
    when: ''
  };

  // const validationSchema = Yup.object().shape({
  //   event: Yup
  //     .string()
  //     .typeError('Type of Job is required')
  //     .required('Type of Job is required'),
  // });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formikProps => {
          const { isSubmitting } = formikProps;

          return (
            <Form>
              <FastField
                name="event"
                component={TextFieldDate}

                txtLabel="Event"
                placeholder=""
                // variant="standard"
                // label="Event"
                // labelClassName="input-field-label"
                moreClassName="width-40"
              />

              <FastField
                name="in"
                component={TextFieldDate}

                txtLabel="In"
                placeholder=""
                // label="In"
                // labelClassName="input-field-label"
              />

              <FastField
                name="when"
                component={TextFieldDate}

                txtLabel="When"
                placeholder=""
                // label="When"
                // labelClassName="input-field-label"
                type="date"
              />

              <FormGroup>
                <Button
                  disabled={isSubmitting}
                  style={isSubmitting ? { cursor: "default" } : { cursor: "pointer" }}
                  type="submit"
                  color={'success'}
                  className="candidates-search-button"
                >
                  {isSubmitting && <Spinner className="mr-2" children="" size="sm" />}
                  <RiIcons.RiSearchLine className="search-icon" />
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default SearchFormEvent;