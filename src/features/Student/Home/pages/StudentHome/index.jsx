import { yupResolver } from "@hookform/resolvers/yup";
import Aos from "aos";
import homeApi from 'api/homeApi';
import { CITY_OPTIONS } from 'constants/global';
import Images from 'constants/images';
import Paths from "constants/paths";
import RHFInputField from 'custom-fields/RHFInputField';
import RHFSelectField from 'custom-fields/RHFSelectField';
import EventCard from "features/Recruiter/Event/components/EventCard";
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as GoIcons from 'react-icons/go';
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import TopRecruiterGroupCard from "../../components/TopRecruiterGroupCard";
import './StudentHome.scss';

function StudentHomePage(props) {
  const history = useHistory();
  const options = CITY_OPTIONS;
  const [topRecruiters, setTopRecruiters] = useState([]);

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
    const fetchTopRecruiters = async () => {
      try {
        const result = await homeApi.getTopRecruiters();
        setTopRecruiters(result.data.data);
      } catch (error) {
        console.log("Cannot get top recruiters. Error: ", error.message);
      }
    }

    fetchTopRecruiters();
  }, []);

  const onFind = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("data: ", data);
        resolve(true);
      }, 2000)
    })
  };

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const onViewDetailEvent = () => {
    history.push(`${Paths.clientEvent}/1/detail`)
  }

  return (
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
              <p>There are 123 developer jobs.</p>
              <h1>Find now!</h1>
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
                <div>
                  <button disabled={isSubmitting} className="btn-success btn-custom" type="submit">
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

        {/* <div className="home__container__popular-jobs">
          <div className="home__container__popular-jobs__title">
            <h1>Popular Jobs</h1>
            <div className="home__container__popular-jobs__title__dot"></div>
          </div>
          <div
            data-aos="fade-zoom-in"
            className="home__container__popular-jobs__main">
            <RecruitmentCard />
            <RecruitmentCard />
            <RecruitmentCard />
            <RecruitmentCard />
          </div>
        </div> */}

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
              <button className="btn btn-success btn-sm">Post</button>
            </div>
          </div>
          <div
            data-aos="fade-zoom-in"
            className="home__container__top-events__right">
            {
              [1, 2, 3, 4].map((item, index) => {
                return <div
                  className="home__container__top-events__right__item"
                  key={index}
                >
                  <EventCard onViewDetailEvent={onViewDetailEvent}/>
                </div>
              })
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
            {topRecruiters.map((recruiters, index) => {
              return <TopRecruiterGroupCard
                cardSize={cardSize[index]}
                listImg={listImg[index]}
                recruiters={recruiters}
                key={index}
              />
            })}
          </div>
        </div>

        <div className="home__container__people-say">
          <div className="home__container__people-say__title">
            <h1 className="home__container__people-say__title__h1">
              What People Say About Us
              <GoIcons.GoPrimitiveDot className="home__container__people-say__title__h1__icon"/>
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
  );
}

export default StudentHomePage;