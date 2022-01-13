import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export function PrivateRouteAdminAuth({ component: Component, ...rest }) {
  const admin = useSelector((state) => state.admin);
  const adminRole = admin.current.role_id === 1;

  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return adminRole ? (
            <Redirect to='/admin' />
          ) : (
            <Component {...props} />
          );
        }}
      />
    </div>
  );
}

export function PrivateRouteAdmin({ component: Component, ...rest }) {
  const admin = useSelector((state) => state.admin);
  const adminRole = admin.current.role_id === 1;

  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return adminRole ? (
            <Component {...props} />
          ) : (
            <Redirect to='/admin/auth/admin-sign-in' />
          );
        }}
      />
    </div>
  );
}

export function PrivateRouteUserAuth({ component: Component, ...rest }) {
  const user = useSelector((state) => state.user.current);
  const userRole = user.role_id;

  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return userRole === 3 ? (
            <Redirect to='/' />
          ) : userRole === 2 ? (
            <Redirect to='/recruiter' />
          ) : (
            <Component {...props} />
          )
        }}
      />
    </div>
  );
}

export function PrivateRouteStudent({ component: Component, ...rest }) {
  const user = useSelector((state) => state.user.current);
  const userRole = parseInt(localStorage.getItem('role_id'));

  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          // return userRole === 3 ? (
          //   <Component {...props} />
          // ) : userRole === 2 ? (
          //   <Redirect to='/recruiter' />
          // ) : (
          //   <Redirect to='/' />
          // );
          return userRole === 3 ? (
            user.s_profile !== null
              ? <Component {...props} />
              : <Redirect to='/first-update' />
          ) : userRole === 2 ? (
            user.r_profile !== null
              ? <Redirect to='/recruiter' />
              : <Redirect to='/first-update' />
          ) : <Redirect to='/' />
        }}
      />
    </div>
  );
}

export function PrivateRouteFirstUpdateProfile({ component: Component, ...rest }) {
  const user = useSelector((state) => state.user.current);
  // const userRole = parseInt(localStorage.getItem('role_id'));

  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return user.role_id === 3
            ? (
              user.s_profile === null
                ? (
                  user.r_profile === null
                    ? (
                      <Component {...props} />
                    )
                    : (
                      window.location.pathname !== "/first-update/recruiter"
                        ? <Component {...props} />
                        : <Redirect to='/first-update' />
                    )
                ) : (
                  user.r_profile === null
                    ? (
                      window.location.pathname !== "/first-update/student"
                        ? <Component {...props} />
                        : <Redirect to='/first-update' />
                    ) : <Redirect to='/' />
                )
            )
            : user.role_id === 2 && user.r_profile === null
              ? (
                window.location.pathname !== "/first-update/student"
                  ? <Component {...props} />
                  : <Redirect to='/first-update' />
              )
              : <Redirect to='/' />;
        }}
      />
    </div>
  )
}

export function PrivateRouteRecruiter({ component: Component, ...rest }) {
  const user = useSelector((state) => state.user.current);
  const userRole = parseInt(localStorage.getItem('role_id'));
  // localStorage.removeItem('isRecruiterPath');

  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return userRole === 2 ? (
            user.r_profile !== null
              ? <Component {...props} />
              : <Redirect to='/first-update' />
          ) : (
            <Redirect to='/auth/sign-in' />
          );
        }}
      />
    </div>
  );
}