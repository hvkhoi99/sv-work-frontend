// import * as Yup from 'yup';
import TextFieldDate from 'custom-fields/TextFieldDate';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as RiIcons from 'react-icons/ri';
import { Button, FormGroup } from 'reactstrap';
import './SearchFormEvent.scss';

SearchFormEvent.propTypes = {
  onSubmit: PropTypes.func,
  event: PropTypes.string,
  location: PropTypes.string,
  when: PropTypes.string,
};

SearchFormEvent.defaultProps = {
  onSubmit: null,
  event: '',
  location: '',
  when: ''
}

function SearchFormEvent(props) {
  const { onSubmit, event, location, when } = props;

  const initialValues = {
    event: event !== undefined ? event : "",
    location: location !== undefined ? location : "",
    when: when !== 'undefined' ? when : ""
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {formikProps => {
          // const { isSubmitting } = formikProps;

          return (
            <Form>
              <FastField
                name="event"
                component={TextFieldDate}

                txtLabel="Event"
                placeholder=""
                moreClassName="width-40"
              />

              <FastField
                name="location"
                component={TextFieldDate}

                txtLabel="Location"
                placeholder=""
              />

              <FastField
                name="when"
                component={TextFieldDate}

                txtLabel="When"
                placeholder=""
                type="date"
              />

              <FormGroup>
                <Button
                  // disabled={isSubmitting}
                  // style={isSubmitting ? { cursor: "default" } : { cursor: "pointer" }}
                  type="submit"
                  color={'success'}
                  className="candidates-search-button"
                >
                  {/* {isSubmitting && <Spinner className="mr-2" children="" size="sm" />} */}
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