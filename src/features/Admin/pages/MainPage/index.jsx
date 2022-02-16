import { unwrapResult } from '@reduxjs/toolkit';
import adminApi from 'api/adminApi';
import LoadingUI from 'components/Loading';
import Paths from 'constants/paths';
import HelloAdmin from 'features/Admin/components/HelloAdmin';
import AdminNav from 'features/Admin/components/Nav';
import Sidebar from 'features/Admin/components/Sidebar';
import { getRecruiters, removeCompany, verifyCompany } from 'features/Auth/adminSlice';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import AdminDashboardPage from '../Dashboard';
import VerificationPage from '../VerificationPage';

AdminMainPage.propTypes = {};

function AdminMainPage(props) {
  const history = useHistory();
  const { search } = useLocation();
  const page = parseInt(queryString.parse(search).page);
  let [currentPage, setCurrentPage] = useState(page > 1 ? page : 1);
  const admin = useSelector((state) => state.admin);
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const [dashboard, setDashboard] = useState({
    application: {
      isUp: 0,
      percent: 0,
      total_application: 0
    },
    event: {
      isUp: 0,
      percent: 0,
      total_event: 0
    },
    recruiter: {
      isUp: 0,
      percent: 0,
      total_recruiter: 0
    },
    student: {
      isUp: 0,
      percent: 0,
      total_student: 0
    },
  });
  const [chartData, setChartData] = useState({
    accounts: {
      total_students: [],
      total_recruiters: [],
      total_users: []
    },
    jobs: {
      total_recruitments: [],
      total_applications: []
    },
    events: {
      total_participants: [],
      total_events: []
    }
  })
  var [isVerify, setIsVerify] = useState(false);
  const [recruiter, setRecruiter] = useState({});
  const [lastPage, setLastPage] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardData = await adminApi.getDashboard();
        const chartData = await adminApi.getChartData();
        console.log({ chartData })
        if (dashboardData.data.status === 1 || chartData.data.status === 1) {
          setDashboard(dashboardData.data.data);
          setChartData(chartData.data.data);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("error dashboard: ", error.message);
      }
    }

    fetchDashboard();
  }, [])

  useEffect(() => {
    setCurrentPage(page > 0 ? page : 1)

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
        setRecruiter({});
        setActiveIndex(null);
        return result;
      } catch (error) {
        console.log("error show: ", error.message);
      }
    }

    fetchRecruiters();
  }, [currentPage, isVerify, dispatch, page]);

  const handlePageClick = (e, state) => {
    switch (state) {
      case 0:
        if (currentPage === 1) return;
        const prevPage = --currentPage;
        setRecruiter({});
        setActiveIndex(null);
        setCurrentPage(prevPage);
        history.push(`${Paths.adminVerification}?page=${prevPage}`);
        break;
      case 1:
        if (currentPage === lastPage) return;
        const nextPage = ++currentPage;
        setRecruiter({});
        setActiveIndex(null);
        setCurrentPage(nextPage);
        history.push(`${Paths.adminVerification}?page=${nextPage}`);
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
          component={() => <AdminDashboardPage data={dashboard} chartData={chartData}/>}
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