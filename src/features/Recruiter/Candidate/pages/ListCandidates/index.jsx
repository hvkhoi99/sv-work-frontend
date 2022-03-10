import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import LoadingChildUI from 'components/LoadingChild';
import PaginationSimple from 'components/PaginationSimple';
import Paths from 'constants/paths';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import CandidatesCard from '../../components/CandidatesCard';
import CandidatePage from '../Candidate';
import * as MdIcons from 'react-icons/md';
import './ListCandidates.scss';
import { useSnackbar } from 'notistack';
import * as RiIcons from 'react-icons/ri';
import helper from 'utils/common';

ListCandidates.propTypes = {
  recruitmentId: PropTypes.string,
  isClosed: PropTypes.bool,
};

ListCandidates.defaultProps = {
  recruitmentId: '',
  isClosed: false,
}

function ListCandidates(props) {
  const history = useHistory();
  const user = useSelector((state) => state.user.current);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isListCardLoading, setIsListCardLoading] = useState(true);
  const [isReloadPage, setIsReloadPage] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { recruitmentId, isClosed } = props;
  const { search } = useLocation();
  const page = parseInt(queryString.parse(search).page);
  let [currentPage, setCurrentPage] = useState(page > 1 ? page : 1);
  const [lastPage, setLastPage] = useState(1);
  const limit = 3;

  const currentCandidateId = parseInt(queryString.parse(search).candidateId);
  let [candidateId, setCandidateId] = useState(currentCandidateId);
  const indexOfCandidateId = candidateId > 0 ? candidates.findIndex((candidate) => candidate.id === candidateId) : null;
  const [activeIndex, setActiveIndex] = useState(indexOfCandidateId);
  const [currentApplication, setCurrentApplication] = useState({
    id: 0,
    is_applied: false,
    is_invited: false,
    is_saved: false,
    recruitment_id: 0,
    state: false,
  });

  useEffect(() => {
    setActiveIndex(-1);
    setCandidateId("#");
    const fetchRecruitmentCandidates = async () => {
      try {
        const params = {
          page: currentPage,
          _limit: limit
        }

        const data = user.role_id === 2
          ? await recruiterApi.getRecruitmentCandidates(recruitmentId, params)
          : await studentApi.getRecruitmentCandidates(recruitmentId, params)
        // console.log({ data })
        data.data.data.data.length === 0 && helper.scrollToTop();
        setCandidates(data.data.data.data);
        setLastPage(data.data.data.last_page);
        setIsListCardLoading(false);
        setIsLoading(false);
      } catch (error) {
        console.log("Cannot fetch candidates. " + error.message)
      }
    }

    fetchRecruitmentCandidates();
  }, [currentPage, recruitmentId, user, isReloadPage])

  const handleActiveCard = (index, candidate) => {
    setActiveIndex(index);
    setCurrentApplication(candidate.application)
    setCandidateId(candidate.id);
  }

  const handleChangePageIndex = (e, state) => {
    helper.scrollToTop(350);
    switch (state) {
      case 0:
        if (currentPage === 1) return;
        const prevPage = --currentPage;
        setIsListCardLoading(true);
        setActiveIndex(null);
        setCurrentPage(prevPage);
        history.push(
          !isClosed
            ? `${Paths.recruiterDashboard}/available-jobs/${recruitmentId}/list-candidates?page=${prevPage}`
            : `${Paths.recruiterDashboard}/closed-recruitments/${recruitmentId}/list-candidates?page=${prevPage}`
        );
        break;
      case 1:
        if (currentPage === lastPage) return;
        const nextPage = ++currentPage;
        setIsListCardLoading(true);
        setActiveIndex(null);
        setCurrentPage(nextPage);
        history.push(
          !isClosed
            ? `${Paths.recruiterDashboard}/available-jobs/${recruitmentId}/list-candidates?page=${nextPage}`
            : `${Paths.recruiterDashboard}/closed-recruitments/${recruitmentId}/list-candidates?page=${nextPage}`
        );
        break;
      default: break;
    }
  }

  const onApproveCandidate = async (candidateCard) => {

    try {
      const data = user.role_id === 2
        ? await recruiterApi.approveCandidate(recruitmentId, candidateCard.id)
        : await studentApi.approveCandidate(recruitmentId, candidateCard.id);
      if (data.data.status === 1) {
        const newCandidates = candidates.filter((candidate) => {
          return candidate.id !== candidateCard.id;
        })
        setCandidates(newCandidates);
        window.history.replaceState(
          null,
          "",
          candidates.length > 0
            ? (
              page > 0
                ? `${Paths.recruiterDashboard}/available-jobs/${recruitmentId}/list-candidates?page=${currentPage}`
                : `${Paths.recruiterDashboard}/available-jobs/${recruitmentId}/list-candidates`
            )
            : `${Paths.recruiterDashboard}/available-jobs/${recruitmentId}/list-candidates`
        )
        enqueueSnackbar(data.data.message, { variant: "success" });
        setIsReloadPage(!isReloadPage);
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  }

  const onRejectCandidate = async (candidateCard) => {

    try {
      const data = user.role_id === 2
        ? await recruiterApi.rejectCandidate(recruitmentId, candidateCard.id)
        : await studentApi.rejectCandidate(recruitmentId, candidateCard.id);
      if (data.data.status === 1) {
        const newCandidates = candidates.filter((candidate) => {
          return candidate.id !== candidateCard.id;
        })
        setCandidates(newCandidates);
        window.history.replaceState(
          null,
          "",
          candidates.length > 0
            ? (
              page > 0
                ? `${Paths.recruiterDashboard}/available-jobs/${recruitmentId}/list-candidates?page=${currentPage}`
                : `${Paths.recruiterDashboard}/available-jobs/${recruitmentId}/list-candidates`
            )
            : `${Paths.recruiterDashboard}/available-jobs/${recruitmentId}/list-candidates`
        )
        enqueueSnackbar(data.data.message, { variant: "success" });
        setIsReloadPage(!isReloadPage);
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  }

  return (
    <>
      {isLoading
        ? <div className="loading-child-ui">
          <LoadingChildUI />
        </div>
        : <>
          {candidates.length > 0 ?
            <div className="list-candidates">
              <div className="list-candidates__container">
                <div className="list-candidates__container__left">
                  {
                    isListCardLoading
                      ? <div className="loading-child-ui">
                        <LoadingChildUI />
                      </div>
                      : <>
                        {candidates.map((candidate, index) => {
                          const activeClass = index === (activeIndex) ? "" : "candidate-card-invisible";
                          return <CandidatesCard
                            key={index}
                            index={index}
                            activeClass={activeClass}
                            handleActiveCard={handleActiveCard}
                            recruitmentId={recruitmentId}
                            candidate={candidate}
                            page={page}
                            isClosed={isClosed}
                          />
                        })}
                      </>
                  }

                  <PaginationSimple
                    currentPage={currentPage}
                    lastPage={lastPage}
                    handlePageClick={handleChangePageIndex}
                  />
                </div>

                {
                  candidateId > 0
                    ? <div className="list-candidates__container__right">
                      <CandidatePage
                        candidateId={candidateId}
                        onApproveCandidate={onApproveCandidate}
                        onRejectCandidate={onRejectCandidate}
                        isClosed={isClosed}
                        currentApplication={currentApplication}
                      />
                    </div>
                    : <div className="list-candidates__container__intro">
                      <MdIcons.MdOutlineBusAlert className="list-candidates__container__intro__icon" />
                      <span>
                        Click on a candidate card to view that candidate's profile.
                      </span>
                    </div>
                }
              </div>
            </div>
            // : <div className="list-candidates-no-data">
            //   <span>Your job posting has no candidates yet.</span>
            // </div>
            : <div className="find-candidates__container__pagination__not-found__info">
                <RiIcons.RiErrorWarningFill
                  className="find-candidates__container__pagination__not-found__info__icon"
                />
                <span>Your job posting has no candidates yet.</span>
              </div>
          }
        </>
      }
    </>
  );
}

export default ListCandidates;