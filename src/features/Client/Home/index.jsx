import Images from 'constants/images';
import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import './Home.scss';

HomePage.propTypes = {

};

function HomePage(props) {
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
            <div className="home__container__find__main__input">
              <Form>
                <FormGroup>
                  <Input

                  placeholder="find here ..."
                  />
                </FormGroup>
                <FormGroup>
                  <Button
                    color="success"
                    type="button"
                  >Find</Button>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomePage;