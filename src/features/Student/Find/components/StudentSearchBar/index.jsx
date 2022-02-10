import TextFieldDate from 'custom-fields/TextFieldDate';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as RiIcons from 'react-icons/ri';
import { Button, FormGroup, Spinner } from 'reactstrap';
import './StudentSearchBar.scss';

StudentSearchBar.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func
};

StudentSearchBar.defaultProps = {
  initialValues: {},
  onSubmit: null
}

function StudentSearchBar(props) {
  const { onSubmit, initialValues } = props;

  return (
    <div className="student-search-bar">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {formikProps => {
          const { isSubmitting } = formikProps;

          return (
            <Form>

              <FastField
                name='keyword'
                component={TextFieldDate}

                txtLabel="Keyword"
                moreClassName="width-60"
                lineHeight="0"
                fontSize="1.3rem"
                placeholder="Search for job titles, companies or keywords..."
              />

              <FastField
                name='location'
                component={TextFieldDate}

                txtLabel="Location"
                moreClassName="width-20"
                lineHeight="0"
                fontSize="1.3rem"
                placeholder="Eg: Da Nang..."
              />

              <FormGroup className="student-search-bar__group-button">
                <Button
                  disabled={isSubmitting}
                  style={isSubmitting ? { cursor: "default" } : { cursor: "pointer" }}
                  type="submit"
                  color={'success'}
                  className="candidates-search-button"
                >
                  {isSubmitting
                    ? <Spinner children="" size="lg" />
                    : <RiIcons.RiSearchLine className="student-search-bar-icon" />
                  }

                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default StudentSearchBar;