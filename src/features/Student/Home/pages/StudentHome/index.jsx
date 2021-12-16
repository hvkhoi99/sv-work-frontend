import { yupResolver } from "@hookform/resolvers/yup";
import homeApi from 'api/homeApi';
import { CITY_OPTIONS } from 'constants/global';
import Images from 'constants/images';
import RHFInputField from 'custom-fields/RHFInputField';
import RHFSelectField from 'custom-fields/RHFSelectField';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import TopRecruiterGroupCard from "../../components/TopRecruiterGroupCard";
import './StudentHome.scss';

function StudentHomePage(props) {
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

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__container__find">
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
          <div className="home__container__overview__title"><h1>Overview</h1></div>
          <div className="home__container__overview__main">
            <div className="home__container__overview__main__text">
              <p>“Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto inventore quas maxime sequi aut! Assumenda aperiam eveniet saepe ad sunt nam necessitatibus sit odio. Voluptatum a eum recusandae. Soluta, amet.”</p>
            </div>
            <div className="home__container__overview__main__img">
              <img src={Images.overview} alt="overview" />
            </div>
          </div>
        </div>

        <div className="home__container__top-recruiter">
          <div className="home__container__top-recruiter__title">
            <h1>Top Recruiter</h1>
            <img src={Images.smDot} alt="smDot" />
          </div>
          <div className="home__container__top-recruiter__main">
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
      </div>
    </div>
  );
}

export default StudentHomePage;