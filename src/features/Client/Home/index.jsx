import { yupResolver } from "@hookform/resolvers/yup";
import { CITY_OPTIONS } from 'constants/global';
import Images from 'constants/images';
import RHFInputField from 'custom-fields/RHFInputField';
import RHFSelectField from 'custom-fields/RHFSelectField';
import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import './Home.scss';

function HomePage(props) {
  const options = CITY_OPTIONS;

  const schema = yup.object().shape({
    search: yup
      .string()
      .required()
      .max(20),
    city: yup
      .string()
      .max(20)
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onLoginSubmit = (data) => {
    console.log(data);
    // console.log("type: ", typeof register);
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
              <h2>Find now!</h2>
            </div>
            <div className="home__container__find__main__form">
              <form onSubmit={handleSubmit(onLoginSubmit)}>
                <div className="form-group search-input">
                  <RHFInputField register={register} inputName="search" control={control} scheme={errors.search} />
                </div>
                <div className="form-group select-input">
                  <RHFSelectField control={control} options={options} />
                </div>
                <div>
                  <button className="btn btn-success btn-sm" type="submit">Find</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomePage;