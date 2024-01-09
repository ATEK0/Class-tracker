import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import DashboardAdmin from './individual Dashboards/DashboardAdmin';
import DashboardTeacher from './individual Dashboards/DashboardTeacher';
import Loading from '../UI/Loading';
import DashboardStudent from './individual Dashboards/DashboardStudent';
import { useFetchUser } from '../../controllers/getUserData';

const Dashboard = () => {
  const [cookies] = useCookies();
  const [componentToRender, setComponentToRender] = useState<React.JSX.Element | null>(null);

  const user = useFetchUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user);
        if (user?.userType === "Admin") {
          document.title = 'Admin Dashboard - Class Tracker';
          setComponentToRender(<DashboardAdmin />);

        } else if (user?.userType === "Teacher") {
          document.title = 'Teacher Dashboard - Class Tracker';
          setComponentToRender(<DashboardTeacher />);

        } else if (user?.userType === "Student") {
          document.title = 'Student Dashboard - Class Tracker';
          setComponentToRender(<DashboardStudent />);

        } else {
          console.warn("Unexpected user type:", user?.userType);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]); // Add user as a dependency

  if (!cookies.session) {
    return <Navigate to="/" />;
  }

  if (!componentToRender) {
    return <Loading />;
  }

  console.log("Component to Render:", componentToRender);
  return componentToRender;
};

export default Dashboard;
