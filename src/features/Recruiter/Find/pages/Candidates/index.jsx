import { GENDER, JOB_TAGS_OPTIONS } from 'constants/global';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import * as RiIcons from 'react-icons/ri';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import SortByItem from '../../components/SortByItem';
import './FindCandidates.scss';
import CandidateFindCard from '../../components/CandidateFindCard';
import LoadingUI from 'components/Loading';

FindCadidatesPage.propTypes = {

};

function FindCadidatesPage(props) {
  const [isLoading, setIsLoading] = useState(true);

  const initialValues = {
    career: '',
    location: '',
    language: '',
    gender: '',
    education: '',
  };

  const validationSchema = Yup.object().shape({
    gender: Yup
      .string()
      .typeError('Type of Job is required')
      .required('Type of Job is required'),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, []);

  const onSubmit = (values) => {
    console.log({ values });
  };

  return (
    <>
      {
        isLoading
          ? <div className="loading-ui">
            <LoadingUI />
          </div>
          : <div className="find-candidates">
            <div className="find-candidates__container">
              <div className="find-candidates__container__above">
                <div className="find-candidates__container__above__search">
                  <input type="text" placeholder="Name..." />
                  <button className="btn btn-success btn-sm">
                    <RiIcons.RiSearchLine className="search-icon" />
                  </button>
                </div>
                <div className="find-candidates__container__above__search-type">
                  <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {formikProps => {
                      const { isSubmitting } = formikProps;

                      return (
                        <Form>
                          <FastField
                            name="career"
                            component={SelectField}

                            label="Career"
                            placeholder="Eg: Designer"
                            // options={GENDER}
                            isCreatableSelect={true}
                          />

                          <FastField
                            name="location"
                            component={SelectField}

                            label="Location"
                            placeholder="Eg: Da Nang"
                            // options={GENDER}
                            isCreatableSelect={true}
                          />

                          <FastField
                            name="language"
                            component={SelectField}

                            label="Language"
                            placeholder="Eg: English"
                            // options={GENDER}
                            isCreatableSelect={true}
                          />

                          <FastField
                            name="gender"
                            component={SelectField}

                            label="Gender"
                            placeholder="Male"
                            options={GENDER}
                            // isCreatableSelect={true}
                            isOptionValue={true}
                          />
                          <FastField
                            name="education"
                            component={SelectField}

                            label="Education"
                            placeholder="Eg: Bach Khoa"
                            options={JOB_TAGS_OPTIONS}
                            isCreatableSelect={true}
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
                              {isSubmitting ? "Searching" : "Search"}
                            </Button>
                          </FormGroup>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
                <div className="find-candidates__container__above__sort">
                  <SortByItem />
                </div>
              </div>
              <div className="find-candidates__container__below">
                <CandidateFindCard />
                <CandidateFindCard />
                <CandidateFindCard />
                <CandidateFindCard />
                <CandidateFindCard />
                <CandidateFindCard />
                <CandidateFindCard />
              </div>
            </div>
          </div>
      }
    </>
  );
}

export default FindCadidatesPage;