import React, { useEffect, useState } from 'react';
import httpClient from '../../httpClient';
import Loading from '../UI/Loading';
import Admin from './Admin';
import Teacher from './Teacher';
import Student from './Student';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Profile = () => {
    const [cookies] = useCookies();
  const [componentToRender, setComponentToRender] = useState<React.JSX.Element | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUserType = await httpClient.get("//localhost:1222/@me");
        const userTyperesp = getUserType.data;

        if (userTyperesp.type === "Admin") {
          document.title = 'Admin Profile - Class Tracker';
          setComponentToRender(<Admin user={userTyperesp}/>);

        } else if (userTyperesp.type === "Teacher") {
          document.title = 'Teacher Profile - Class Tracker';
          setComponentToRender(<Teacher user={userTyperesp}/>);

        } else if (userTyperesp.type === "Student") {
          document.title = 'Student Profile - Class Tracker';
          setComponentToRender(<Student user={userTyperesp}/>);

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

export default Profile;
