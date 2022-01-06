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
import helper from 'utils/common';

ListCandidates.propTypes = {
  recruitmentId: PropTypes.string
};

ListCandidates.defaultProps = {
  recruitmentId: ''
}

function ListCandidates(props) {
  const user = useSelector((state) => state.user.current);
  const { recruitmentId } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isListCardLoading, setIsListCardLoading] = useState(true);
  const history = useHistory();
  const { search } = useLocation();
  const page = parseInt(queryString.parse(search).page);
  const candidateId = parseInt(queryString.parse(search).candidateId);
  const [activeIndex, setActiveIndex] = useState(null);
  let [currentPage, setCurrentPage] = useState(page > 0 ? page : 1);
  const [lastPage, setLastPage] = useState(1);
  const [candidates, setCandidates] = useState([]);
  const limit = 3;
  const indexOfCandidateId = candidateId ? candidates.findIndex((candidate) => candidate.id === candidateId) : -1;

  useEffect(() => {
    helper.scrollToTop();
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
  }, [currentPage, recruitmentId, user])

  const handleActiveCard = (index) => {
    setActiveIndex(index);
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
                          const activeClass = index === (indexOfCandidateId > -1 ? indexOfCandidateId : activeIndex) ? "" : "candidate-card-invisible";
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
                  candidateId
                    ? <div className="list-candidates__container__right">
                      <CandidatePage candidateId={candidateId} />
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