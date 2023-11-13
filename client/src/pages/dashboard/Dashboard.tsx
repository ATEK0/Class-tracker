import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import httpClient from '../../httpClient';
import DashboardAdmin from './individual Dashboards/DashboardAdmin';
import DashboardTeacher from './individual Dashboards/DashboardTeacher';

import Loading from '../UI/Loading';
import DashboardStudent from './individual Dashboards/DashboardStudent';

const Dashboard = () => {
  const [cookies] = useCookies();
  const [componentToRender, setComponentToRender] = useState<React.JSX.Element | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUserType = await httpClient.get("//localhost:1222/@me");
        const userTyperesp = getUserType.data;

        if (userTyperesp.type === "Admin") {
          document.title = 'Admin Dashboard - Class Tracker';
          setComponentToRender(<DashboardAdmin />);

        } else if (userTyperesp.type === "Teacher") {
          document.title = 'Teacher Dashboard - Class Tracker';
          setComponentToRender(<DashboardTeacher />);

        } else if (userTyperesp.type === "Student") {
          document.title = 'Student Dashboard - Class Tracker';
          setComponentToRender(<DashboardStudent />);

        } else {
            console.warn("Unexpected user type:", userTyperesp.type);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!cookies.session) {
    return <Navigate to="/" />;
  }

  if (!componentToRender) {
    return (
        <Loading />
    )
  }
  console.log("Component to Render:", componentToRender);
  return componentToRender;
};

export default Dashboard;
