import studentApi from 'api/studentApi';
import LoadingChildUI from 'components/LoadingChild';
import Paths from 'constants/paths';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import * as MdIcons from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { useHistory, useLocation } from 'react-router-dom';
import helper from 'utils/common';
import PopupUpdateStudentCV from '../../PopupUpdateStudentProfile/PopupUpdateStudentCV';
import * as RiIcons from 'react-icons/ri';
import StudentResumeItemCard from '../StudentResumeItem';
// import PropTypes from 'prop-types';
import './StudentResumeCard.scss';

StudentResumeCard.propTypes = {

};

function StudentResumeCard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [listCV, setListCV] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isReload, setIsReload] = useState(false);
  const { search } = useLocation();
  const page = parseInt(queryString.parse(search).page);
  const [currentPage, setCurrentPage] = useState(page > 1 ? page : 1);
  const [pageCount, setPageCount] = useState(0);
  const history = useHistory();
  const _limit = 4;

  useEffect(() => {
    helper.scrollToTop();
    // setIsLoading(true);
    const fetchListCV = async () => {
      try {
        const params = {
          page: currentPage,
          _limit
        }
        const data = await studentApi.getListCV(params);
        // console.log({ data });
        if (data.data.status === 1) {
          setListCV(data.data.data.data);
          const total = data.data.data.total;
          setPageCount(Math.ceil(total / _limit));
        }
        setIsLoading(false);
        return;
      } catch (error) {
        setIsLoading(false);
        console.log("Cannot fetch list cv. Error: " + error.message);
        return;
      }
    }

    return fetchListCV();
  }, [isReload, currentPage]);

  const handlePageClick = async (data) => {
    const newPage = data.selected + 1;
    setCurrentPage(newPage);
    history.push(`${Paths.clientProfile}/resume?page=${newPage}`);
    helper.scrollToTop(150);
  };

  const onUpload = async (values) => {
    try {
      const formData = new FormData();
      formData.append(
        "file",
        values.file,
        values.file.name
      );
      formData.append(
        "title",
        values.title
      );
      formData.append(
        "name",
        values.file.name
      )

      const data = await studentApi.uploadCV(formData);
      console.log({ data })
      if (data.data.status === 1) {
        // const newListCV = listCV;
        // newListCV.splice(0, 0, data.data.data);
        // setListCV(newListCV);
        setIsReload(!isReload);
        enqueueSnackbar(data.data.message, { variant: "success" });
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      }
      return;
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return;
    }
  }

  const onDeleteCV = async (cv) => {
    try {
      const action = await studentApi.deleteCV(cv.id);
      if (action.data.status === 1) {
        setIsReload(!isReload);
        enqueueSnackbar(action.data.message, { variant: "success" });
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      }
      return;
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return;
    }
  }

  return (
    <div className="student-resume-card">
      <div className="student-resume-card__header">
        <span>Manage Resume</span>
        {/* <FiIcons.FiPlusCircle className="student-resume-card__header__icon" /> */}
      </div>
      <div className="student-resume-card__main">
        {
          isLoading
            ? <div className="loading-child-ui">
              <LoadingChildUI />
            </div>
            : <>
              <div className="student-resume-card__main__items">
                {
                  listCV.length > 0 &&
                  listCV.map((cv, index) => {
                    return <div
                      key={index}
                      className="student-resume-card__main__items__item"
                    >
                      <StudentResumeItemCard
                        cv={cv}
                        onDeleteCV={onDeleteCV}
                      />
                    </div>
                  })
                }
                <div className="student-resume-card__main__items__upload">
                  <PopupUpdateStudentCV
                    onSubmit={onUpload}
                  // isUploading={isUploading}
                  />
                </div>
              </div>
              <div className="student-resume-card__main__paginator">
                {
                  listCV.length <= 0
                    // ? <div className="no-available">
                    //   <span>You haven't uploaded any CV at this time.</span>
                    // </div>
                    ? <div className="find-candidates__container__pagination__not-found__info">
                      <RiIcons.RiErrorWarningFill
                        className="find-candidates__container__pagination__not-found__info__icon"
                      />
                      <span>You haven't uploaded any CV at this time.</span>
                    </div>
                    : <ReactPaginate
                      previousLabel={
                        <MdIcons.MdArrowBackIosNew />
                      }
                      nextLabel={
                        <MdIcons.MdArrowForwardIos />
                      }

                      // initialPage={1}
                      // initialPage={currentPage}
                      forcePage={currentPage - 1}
                      breakLabel={"..."}
                      pageCount={pageCount}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={2}
                      onPageChange={handlePageClick}
                      containerClassName={"pagination justify-content-center"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={pageCount === 0 ? "page-item disabled" : "page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={pageCount === 0 ? "page-item disabled" : "page-item"}
                      nextLinkClassName={"page-link"}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      activeClassName={"active"}
                    />
                }
              </div>
            </>
        }
      </div>
    </div>
  );
}

export default StudentResumeCard;