import studentApi from 'api/studentApi';
import LoadingChildUI from 'components/LoadingChild';
import Images from 'constants/images';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import { Link, useHistory } from 'react-router-dom';
import EmployerCard from '../EmployerCard';
import './MainEmployersArea.scss';

MainEmployersArea.propTypes = {
  initialValues: PropTypes.object,
  employers: PropTypes.array,
  setEmployers: PropTypes.func,
  onShow: PropTypes.func
};

MainEmployersArea.defaultProps = {
  initialValues: {},
  employers: [],
  setEmployers: null,
  onShow: null
}

function MainEmployersArea(props) {
  const { initialValues, employers, setEmployers } = props;
  // const user = useSelector((state) => state.user.current);
  const history = useHistory();
  const [mainLoading, setMainLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(true);

  const _limit = 2;

  useEffect(() => {
    setMainLoading(true);
    setCurrentPage(1);
    const fetchEmployers = async () => {
      try {
        const params = {
          page: 1,
          _limit,

          keyword: initialValues.keyword,
          location: initialValues.location
        };

        const data = await studentApi.findEmployers(params);
        console.log({ data })
        if (data.data.status === 1) {
          setEmployers(data.data.data.data);
          setTotal(data.data.data.total);
        }
        setMainLoading(false);
      } catch (error) {
        setMainLoading(false);
        console.log("Cannot fetch Employers. Error: " + error.message)
      }
    };

    fetchEmployers();
  }, [initialValues.keyword, initialValues.location, setEmployers]);


  const onViewCompany = (id) => {
    // if (user.s_profile === null) {
    //   onShow(true);
    // } else {
    //   history.push(`/company/${id}`);
    // }
    history.push(`/company/${id}`);
  }

  const handleSeeMore = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newPage = ++currentPage;
    setCurrentPage(newPage);
    console.log({ newPage })
    try {
      const params = {
        page: newPage,
        _limit,

        keyword: initialValues.keyword,
        location: initialValues.location,
      };

      const data = await studentApi.findEmployers(params);
      if (data.data.status === 1) {
        const newEmployers = employers.concat(...data.data.data.data);
        setEmployers(newEmployers);
        setTotal(data.data.data.total);
      }
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      console.log("Cannot fetch Employers. Error: " + error.message)
    }
  }

  return (
    <>
      {
        mainLoading
          ? <div className="loading-child-ui">
            <LoadingChildUI />
          </div>
          : <div className="main-employers-area">
            <div className="main-employers-area__title">
              <span>"{initialValues.keyword}" Company Results {`(${employers.length})`}</span>
              <div className="main-employers-area__title__show">
                {
                  !show
                    ? <FaIcons.FaEyeSlash
                      className="main-employers-area__title__show__icon"
                      onClick={() => setShow(!show)}
                    />
                    : <FaIcons.FaEye
                      className="main-employers-area__title__show__icon"
                      onClick={() => setShow(!show)}
                    />
                }
              </div>
            </div>
            {
              show &&
              <>
                {
                  employers.length > 0
                    ? <>
                      <div className="main-employers-area__content">
                        {
                          employers.map((item, index) => {
                            return <div
                              key={index}
                              className="main-employers-area__content__item"
                            >
                              <EmployerCard
                                employer={item}
                                onViewCompany={onViewCompany}
                              />
                            </div>
                          })
                        }
                        {
                          isLoading && <div className="main-employers-area__content__item-loading">
                            <LoadingChildUI />
                          </div>
                        }
                      </div>
                      {(!isLoading && (employers.length < total)) && <div className="main-employers-area__more">
                        <Link to="#" className="main-employers-area__more__link" onClick={handleSeeMore}>
                          <BsIcons.BsChevronDoubleDown className="main-employers-area__more__link__icon" />
                          <span>See more</span>
                        </Link>
                      </div>}
                    </>
                    : <div className="find-candidates__container__pagination__not-found">
                      <img src={Images.notfoundcandidate} alt="not-found-candidate" />
                      <div className="find-candidates__container__pagination__not-found__info">
                        <RiIcons.RiErrorWarningFill
                          className="find-candidates__container__pagination__not-found__info__icon"
                        />
                        <span>No matching results were found.</span>
                      </div>
                    </div>
                }
              </>
            }
          </div>
      }
    </>
  );
}

export default MainEmployersArea;