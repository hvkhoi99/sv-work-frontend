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
// import helper from 'utils/common';

ListCandidates.propTypes = {
  recruitmentId: PropTypes.string
};

ListCandidates.defaultProps = {
  recruitmentId: ''
}

function ListCandidates(props) {
  const { recruitmentId } = props;
  const user = useSelector((state) => state.user.current);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [isListCardLoading, setIsListCardLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const history = useHistory();
  const { search } = useLocation();
  const page = parseInt(queryString.parse(search).page);
  const currentCandidateId = parseInt(queryString.parse(search).candidateId);
  let [candidateId, setCandidateId] = useState(currentCandidateId);
  const indexOfCandidateId = candidateId > 0 ? candidates.findIndex((candidate) => candidate.id === candidateId) : null;
  const [activeIndex, setActiveIndex] = useState(indexOfCandidateId);
  let [currentPage, setCurrentPage] = useState(page > 0 ? page : 1);
  const [lastPage, setLastPage] = useState(1);
  const [isReloadPage, setIsReloadPage] = useState(false);
  const limit = 3;

  useEffect(() => {
    // helper.scrollToTop();
    const fetchRecruitmentCandidates = async () => {
      try {
        const params = {
          page: currentPage,
          _limit: limit
        }

        const data = user.role_id === 2
          ? await recruiterApi.getRecruitmentCandidates(recruitmentId, params)
          : await studentApi.getRecruitmentCandidates(recruitmentId, params)
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
    setCandidateId(candidate.id);
  }

  const handleChangePageIndex = (e, state) => {
    switch (state) {
      case 0:
        if (currentPage === 1) return;
        const prevPage = --currentPage;
        setIsListCardLoading(true);
        setActiveIndex(null);
        setCurrentPage(prevPage);
        history.push(`${Paths.recruiterDashboard}/available-jobs/${recruitmentId}/list-candidates?page=${prevPage}`);
        break;
      case 1:
        if (currentPage === lastPage) return;
        const nextPage = ++currentPage;
        setIsListCardLoading(true);
        setActiveIndex(null);
        setCurrentPage(nextPage);
        history.push(`${Paths.recruiterDashboard}/available-jobs/${recruitmentId}/list-candidates?page=${nextPage}`);
        break;
      default: break;
    }
  }

  const onApproveCandidate = async (candidateCard) => {
    // const newCandidates = candidates.filter((candidate) => {
    //   return candidate.id !== candidateCard.id;
    // })
    // setCandidates(newCandidates);
    try {
      const data = await studentApi.approveCandidate(recruitmentId, candidateCard.id);
      console.log({ data })
      if (data.data.status === 1) {
        setActiveIndex(-1);
        setCandidateId("#");
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
        enqueueSnackbar(`Candidate was successfully approved/rejected.`, 
        { variant: "success"}
        );
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
            : <div className="list-candidates-no-data">
              <span>Your job posting has no candidates yet.</span>
            </div>
          }
        </>
      }
    </>
  );
}

export default ListCandidates;