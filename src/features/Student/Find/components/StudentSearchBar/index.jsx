import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as RiIcons from 'react-icons/ri';
import { Input } from 'reactstrap';
import './StudentSearchBar.scss';

StudentSearchBar.propTypes = {
  onSubmit: PropTypes.func
};

StudentSearchBar.defaultProps = {
  onSubmit: null
}

function StudentSearchBar(props) {
  const { onSubmit } = props;

  const initialValues = {
    keyword: '',
  }

  return (
    <div className="student-search-bar">
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
              <Input
                name="keyword"
                id="keywordId"
                placeholder="Search for job titles, companies or keywords..."
              />

              <button
                className="btn btn-success btn-sm"
                style={(isSubmitting) ? { cursor: "default" } : { cursor: "pointer" }}
                type="submit"
                disabled={isSubmitting}
              >
                {/* {(isSubmitting) && <Spinner className="mr-2" children="" size="sm" />} */}
                <RiIcons.RiSearchLine className="student-search-bar-icon" />
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default StudentSearchBar;