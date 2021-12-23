import { unwrapResult } from '@reduxjs/toolkit';
import adminApi from 'api/adminApi';
import LoadingUI from 'components/Loading';
import HelloAdmin from 'features/Admin/components/HelloAdmin';
import AdminNav from 'features/Admin/components/Nav';
import Sidebar from 'features/Admin/components/Sidebar';
import { getRecruiters, removeCompany, verifyCompany } from 'features/Auth/adminSlice';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminDashboardPage from '../Dashboard';
import VerificationPage from '../VerificationPage';

AdminMainPage.propTypes = {};

function AdminMainPage(props) {
  const admin = useSelector((state) => state.admin);
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const [dashboard, setDashboard] = useState({});
  var [currentPage, setCurrentPage] = useState(1);
  var [isVerify, setIsVerify] = useState(false);
  const [recruiter, setRecruiter] = useState({});
  const [lastPage, setLastPage] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await adminApi.getDashboard();
        setDashboard(result.data.data);
      } catch (error) {
        console.log("error dashboard: ", error.message);
      }
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    fetchDashboard();

    return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const params = {
          page: currentPage,
          _limit: 5
        };

        const action = getRecruiters(params);

        const actionResult = await dispatch(action);
        const result = unwrapResult(actionResult);
        setLastPage(result.last_page);

      } catch (error) {
        console.log("error show: ", error.message);
      }
    }

    fetchRecruiters();
  }, [currentPage, isVerify, dispatch]);

  const handlePageClick = (e, state) => {
    switch (state) {
      case 0:
        if (currentPage === 1) return;
        setCurrentPage(--currentPage);
        setRecruiter({});
        setActiveIndex(null);
        break;
      case 1:
        if (currentPage === lastPage) return;
        setCurrentPage(++currentPage);
        setRecruiter({});
        setActiveIndex(null);
        break;
      default: break;
    }
  }

  const handleCompanyClick = (index, company) => {
    setActiveIndex(index);
    setRecruiter(company);
  }

  const handleVerifyCompany = async (e, company, verify) => {
    try {
      const id = company.id;

      const params = {
        id,
        verify
      }

      const removeCompanyAction = removeCompany(id);
      const action = verifyCompany(params);
      setRecruiter({});
      setActiveIndex(null);
      enqueueSnackbar(`Successfully ${verify ? 'Approved' : 'Rejected'}`, { variant: "success" });

      dispatch(removeCompanyAction);
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
      setIsVerify(!isVerify);
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  }

  const currentUI = isLoading ? <LoadingUI />
    : (<>
      <Sidebar />
      <HelloAdmin />
      <AdminNav />
      <Switch>
        <Route
          exact
          path={match.url}
          component={() => <AdminDashboardPage data={dashboard} />}
        />
        <Route
          path={`${match.url}/verification`}
          component={
            () => <VerificationPage
              recruiters={admin.recruiters}
              handlePageClick={handlePageClick}
              handleCompanyClick={handleCompanyClick}
              handleVerifyCompany={handleVerifyCompany}
              currentPage={currentPage}
              company={recruiter}
              lastPage={lastPage}
              activeIndex={activeIndex}
            />
          }
        />
        <Route path={`${match.url}/company/:id`} component={VerificationPage} />
      </Switch>
    </>)

  return <>{currentUI}</>;
}

export default AdminMainPage;