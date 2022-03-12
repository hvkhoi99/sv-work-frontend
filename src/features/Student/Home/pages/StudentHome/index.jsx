import { yupResolver } from "@hookform/resolvers/yup";
import Aos from "aos";
import PopupConfirm from 'components/PopupConfirm';
import homeApi from 'api/homeApi';
import { CITY_OPTIONS } from 'constants/global';
import Images from 'constants/images';
import Paths from "constants/paths";
import RHFInputField from 'custom-fields/RHFInputField';
import RHFSelectField from 'custom-fields/RHFSelectField';
import EventCard from "features/Recruiter/Event/components/EventCard";
import RecruitmentCard from 'features/Recruiter/Recruitment/components/RecruitmentCard';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as GoIcons from 'react-icons/go';
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import TopRecruiterGroupCard from "../../components/TopRecruiterGroupCard";
import './StudentHome.scss';
import userApi from 'api/userApi';
import { useSelector } from "react-redux";
import SkeletonRecruitmentCard from "components/SkeletonCards/SkeletonRecruitmentCard";
import EventCardSkeleton from 'features/Recruiter/Event/components/EventCardSkeleton';
import Skeleton from 'react-loading-skeleton';

function StudentHomePage(props) {
  const history = useHistory();
  const options = CITY_OPTIONS;
  const [topRecruiters, setTopRecruiters] = useState([]);
  const [topJobs, setTopJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [topEvents, setTopEvents] = useState([]);
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  const user = useSelector((state) => state.user.current);
  const [show, setShow] = useState(false);

  const [isRecruitmentLoading, setIsRecruitmentLoading] = useState(true);
  const [isEventLoading, setIsEventLoading] = useState(true);
  const [isCompanyLoading, setIsCompanyLoading] = useState(true);

  const listImg = [
    [{ src: Images.bmw }, { src: Images.fb }],
    [{ src: Images.levis }, { src: Images.shopee }],
    [{ src: Images.apple }],
    [{ src: Images.vinfast }, { src: Images.tw }],
    [{ src: Images.lamborghini }, { src: Images.burger }]
  ]

  const cardSize = [
    [{ size: "small-image" }, { size: "small-image" }],
    [{ size: "medium-image" }, { size: "medium-image" }],
    [{ size: "large-image" }],
    [{ size: "medium-image" }, { size: "medium-image" }],
    [{ size: "small-image" }, { size: "small-image" }]
  ]

  const schema = yup.object().shape({
    search: yup
      .string()
      .required("Need to enter information to search")
      .max(20),
    city: yup
      .string()
      .max(20)
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
      // mirror: true
    });
  }, []);

  useEffect(() => {
    const fetchToltalJobs = async () => {
      try {
        const totalJobs = await homeApi.getTotalJobs();
        if (totalJobs.data.status === 1) {
          setTotalJobs(totalJobs.data.data);
        }
        return;
      } catch (error) {
        console.log("Cannot get total jobs. Error: ", error.message);
        return;
      }
    }

    fetchToltalJobs();
  }, []);

  useEffect(() => {
    const fetchTopRecruitments = async () => {
      try {
        const topJobs = await homeApi.getTopRecruitments();
        if (topJobs.data.status === 1) {
          setTopJobs(topJobs.data.data);
        }
        setIsRecruitmentLoading(false);
        return;
      } catch (error) {
        console.log("Cannot get top Recruitments. Error: ", error.message);
        return;
      }
    }

    fetchTopRecruitments();
  }, []);

  useEffect(() => {
    const fetchTopEvents = async () => {
      try {
        const params = {
          _limit: 4
        };
        const data = await userApi.getTopEvents(params);
        if (data.data.status === 1) {
          setTopEvents(data.data.data);
        }
        setIsEventLoading(false);
        return;
      } catch (error) {
        console.log("Cannot get top Events. Error: ", error.message);
        return;
      }
    }

    fetchTopEvents();
  }, []);

  // useEffect(() => {
  //   const fetchTopRecruitments = async () => {
  //     try {
  //       const topJobs = await homeApi.getTopRecruitments();
  //       if (topJobs.data.status === 1) {
  //         setTopJobs(topJobs.data.data);
  //       }
  //       setIsRecruitmentLoading(false);
  //       return;
  //     } catch (error) {
  //       console.log("Cannot get top Recruitments. Error: ", error.message);
  //       return;
  //     }
  //   }

  //   fetchTopRecruitments();
  // }, []);

  useEffect(() => {
    const fetchTopRecruiters = async () => {
      try {
        const result = await homeApi.getTopRecruiters();
        if (result.data.status === 1) {
          setTopRecruiters(result.data.data);
        }
        setIsCompanyLoading(false);
        return;
      } catch (error) {
        console.log("Cannot get top recruiters. Error: ", error.message);
        return;
      }
    }

    fetchTopRecruiters();
  }, []);

  const onFind = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // console.log("data: ", data);
        history.push(
          `${Paths.clientFindJobs}?keyword=${data.search}&location=${data.options}`
        );
        resolve(true);
      }, 1000)
    })
  };

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const onViewDetailEvent = (event) => {
    history.push(
      roleId === 2
        ? `${Paths.recruiterEvent}/${event.id}`
        : `${Paths.clientEvent}/${event.id}`
    );
  }

  const renderStatusForApplyButton = (application) => {
    if (application.state === null) {
      if (application.is_invited) {
        return "Accept";
      } else {
        if (application.is_applied) {
          return "Applied";
        } else {
          return "Apply";
        }
      }
    } else {
      if (application.state === true) {
        if (application.is_invited) {
          return "Accepted";
        } else {
          if (application.is_applied) {
            return "Accepted";
          } else {
            return "Apply";
          }
        }
      } else {
        if (application.is_invited) {
          return "Rejected";
        } else {
          if (application.is_applied) {
            return "Rejected";
          } else {
            return "Apply";
          }
        }
      }
    }
  }

  const onApplyJob = (jobId) => {
    console.log({ jobId })
  }

  const onViewJob = (id) => {
    history.push(`/recruitment/${id}`);
  }

  // const handleSendNotifications = async () => {
  //   try {
  //     const params = {
  //       title: "Test Notification",
  //       body: "Test Notification"
  //     }

  //     await userApi.sendNotification(params);

  //   } catch (error) {
  //     console.log({error: error.message})
  //   }
  // }

  const onMoveToPostEvent = () => {
    if ((user && Object.keys(user).length === 0)) {
      onShow(true);
      return;
    } else {
      if (user.role_id === 2) {
        history.push({
          pathname: `${Paths.recruiterEvent}/create`,
          state: { event: null, isEditMode: false }
        });
        return;
      }

      if (user.role_id === 3) {
        if (roleId === 2) {
          history.push({
            pathname: `${Paths.recruiterEvent}/create`,
            state: { event: null, isEditMode: false }
          });
          return;
        }

        if (user.s_profile) {
          history.push({
            pathname: `${Paths.clientEvent}/create`,
            state: { event: null, isEditMode: false }
          });
          return;
        }

      }

      onShow(true);
      return;
    }
  }

  const onShow = (value) => {
    setShow(value);
  }

  const onTryThisPopupConfirm = () => {
    if ((user && Object.keys(user).length === 0)) {
      history.push("/auth/sign-in");
      return;
    } else {
      if (user.role_id === 2) {
        return;
      }

      if (user.role_id === 3) {
        if (roleId === 2) {
          return;
        }

        if (user.s_profile) {
          return;
        }

        history.push("/first-update/student");
      }
    }
  }

  return (
    <>
      <div className="home">
        <div className="home__container">
          <div
            data-aos="fade-zoom-in"
            className="home__container__find">
            <div className="home__container__find__img">
              <img src={Images.teamwork} alt="find" />
            </div>
            <div className="home__container__find__main">
              <div className="home__container__find__main__text">
                <p>There are {totalJobs} available jobs.</p>
                <h1>Find now!</h1>
                {/* <button 
              className="btn btn-success btn-sm"
              type="button"
              onClick={handleSendNotifications}
              >Send Notifications</button> */}
              </div>
              <div className="home__container__find__main__form">
                <form onSubmit={handleSubmit(onFind)} onKeyDown={(e) => checkKeyDown(e)}>
                  <div className="form-group search-input">
                    <RHFInputField
                      register={register}
                      inputName="search"
                      control={control}
                      scheme={errors.search}
                      placeholder="Ex: Company abc..."
                      type="text"
                      moreClassName="focus-input"
                    />
                  </div>
                  <div className="form-group select-input">
                    <RHFSelectField
                      control={control}
                      options={options}
                      scheme={errors.city}
                      placeholder="city..."
                      isTheme={true}
                      isStyles={true}
                    />
                  </div>
                  <div className="group-button-find-home">
                    <button
                      disabled={isSubmitting}
                      style={
                        isSubmitting
                          ? { cursor: "default", color: 'lightgreen' }
                          : {}
                      }
                      className="btn-success btn-custom"
                      type="submit"
                    >
                      {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                      <i className="fa fa-search" style={{ fontSize: '1.5rem' }} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="home__container__overview">
            <div className="home__container__overview__title">
              <div className="home__container__overview__title__dot"></div>
              <h1>Overview</h1>
            </div>
            <div className="home__container__overview__main">
              <div
                data-aos="fade-right"
                className="home__container__overview__main__text">
                <p>“Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto inventore quas maxime sequi aut! Assumenda aperiam eveniet saepe ad sunt nam necessitatibus sit odio. Voluptatum a eum recusandae. Soluta, amet.”</p>
              </div>
              <div
                // data-aos="fade-left"
                className="home__container__overview__main__img">
                <img src={Images.overview} alt="overview" />
              </div>
            </div>
          </div>

          <div className="home__container__popular-jobs">
            <div className="home__container__popular-jobs__title">
              <h1>Top Jobs</h1>
              <div className="home__container__popular-jobs__title__dot"></div>
            </div>
            <div
              data-aos="fade-zoom-in"
              className="home__container__popular-jobs__main">
              {
                isRecruitmentLoading
                  ? <div className="top-recruitment-skeleton">
                    <SkeletonRecruitmentCard />
                    <SkeletonRecruitmentCard />
                    <SkeletonRecruitmentCard />
                    <SkeletonRecruitmentCard />
                  </div>
                  : (
                    topJobs.length > 0
                      ? topJobs.map((job, index) => {
                        return <div
                          key={index}
                          className="home__container__popular-jobs__main__item"
                        >
                          <RecruitmentCard
                            recruitment={job}
                            applyText={renderStatusForApplyButton(job.application)}
                            // isApplying={isApplying}
                            onApplyJob={onApplyJob}
                            onViewJob={onViewJob}
                          />
                        </div>
                      })
                      : <span style={{ fontStyle: 'italic' }}>"No jobs have been created yet."</span>
                  )
              }
            </div>
          </div>

          <div className="home__container__top-events">
            <div className="home__container__top-events__left">
              <div className="home__container__top-events__left__title">
                <h1>Top Events</h1>
                <div className="home__container__top-events__left__title__dot"></div>
              </div>
              <div className="home__container__top-events__left__description">
                <p>"Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dolore alias atque eveniet odio beatae quidem asperiores dolorum excepturi
                  fuga eaque vitae laboriosam,
                  vero natus ratione facilis fugit quod similique deleniti!"
                </p>
              </div>
              <div className="home__container__top-events__left__btn-group">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={onMoveToPostEvent}
                >Post</button>
              </div>
            </div>
            <div
              data-aos="fade-zoom-in"
              className="home__container__top-events__right">
              {
                isEventLoading
                  ? <div className="top-event-skeleton">
                    <div className="top-event-skeleton__item">
                      <EventCardSkeleton />
                    </div>
                    <div className="top-event-skeleton__item">
                      <EventCardSkeleton />
                    </div>
                    <div className="top-event-skeleton__item">
                      <EventCardSkeleton />
                    </div>
                    <div className="top-event-skeleton__item">
                      <EventCardSkeleton />
                    </div>
                  </div>
                  : (
                    topEvents.length > 0
                      ? topEvents.map((event, index) => {
                        return <div
                          className="home__container__top-events__right__item"
                          key={index}
                        >
                          <EventCard
                            event={event}
                            onViewDetailEvent={onViewDetailEvent}
                          />
                        </div>
                      })
                      : <div className="event-main__container__upcomming-events__no-data">
                        {/* <span>"No events have been created yet."</span> */}
                        <img src={Images.upcomingEvent} alt="upcoming event" />
                      </div>
                  )
              }
            </div>
          </div>

          <div className="home__container__top-recruiter">
            <div className="home__container__top-recruiter__title">
              <h1>Top Recruiter</h1>
              <img src={Images.smDot} alt="smDot" />
            </div>
            <div
              data-aos="fade-zoom-in"
              className="home__container__top-recruiter__main">
              {
                isCompanyLoading
                  ? <div className="top-company-skeleton">
                    <Skeleton
                      circle
                      width={120}
                      height={120}
                    />
                    <Skeleton
                      circle
                      width={150}
                      height={150}
                    />
                    <Skeleton
                      circle
                      width={200}
                      height={200}
                    />
                    <Skeleton
                      circle
                      width={150}
                      height={150}
                    />
                    <Skeleton
                      circle
                      width={120}
                      height={120}
                    />
                  </div>
                  : (
                    topRecruiters.length > 0
                    ? topRecruiters.map((recruiters, index) => {
                      return <TopRecruiterGroupCard
                        cardSize={cardSize[index]}
                        listImg={listImg[index]}
                        recruiters={recruiters}
                        key={index}
                      />
                    })
                    : <span style={{fontStyle: 'italic'}}>No Employers registered yet.</span>
                  )
              }
            </div>
          </div>

          <div className="home__container__people-say">
            <div className="home__container__people-say__title">
              <h1 className="home__container__people-say__title__h1">
                What People Say About Us
                <GoIcons.GoPrimitiveDot className="home__container__people-say__title__h1__icon" />
              </h1>
            </div>
            <div
              data-aos="fade-zoom-in"
              className="home__container__people-say__img">
              <img src={Images.aboutUsCard} alt="about-us" />
            </div>
          </div>
        </div>
      </div>
      <PopupConfirm
        show={show}
        onShow={onShow}
        onOK={onTryThisPopupConfirm}
        // titleConfirm="Update Profile"
        contentConfirm={
          (user && Object.keys(user).length === 0)
            ? "Only accounts with the role of employer or student, and already have a personal profile, can use this function. Continue?"
            : (user.role_id === 2
              ? user.r_profile
                ? "Something went wrong. Please try again!"
                : "You need to update your Personal Profile to perform this function."
              : (user.role_id === 3
                ? (roleId === 2
                  ? (
                    user.r_profile
                      ? "Something went wrong. Please try again!"
                      : "You need to update your Personal Profile to perform this function. Continue?"
                  )
                  : (
                    user.s_profile
                      ? "Something went wrong. Please try again!"
                      : "You need to update your Personal Profile to perform this function. Continue?"
                  ))
                : "Something went wrong. Please try again!"))
        }
      />
    </>

  );
}

export default StudentHomePage;