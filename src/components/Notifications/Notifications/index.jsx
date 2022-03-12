import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { getToken } from 'init-fcm';
import userApi from 'api/userApi';

Notifications.propTypes = {
  
};

function Notifications(props) {
  const [isTokenFound, setTokenFound] = useState(false);

  console.log("Token found", isTokenFound);

  // To load once
  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        // console.log("Token is", data);
        const params = {
          device_token: data
        };
        await userApi.updateDeviceToken(params);
        // const rs = await userApi.updateDeviceToken(params);
        // console.log({rs})
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);

  return <></>;
}

export default Notifications;