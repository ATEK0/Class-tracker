import React, { useEffect, useState } from 'react';
import Loading from '../UI/Loading';
import Admin from './Admin';
import Teacher from './Teacher';
import Student from './Student';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useFetchUser } from '../../controllers/getUserData';
import { User } from '../../types';

const Profile = () => {
  const [cookies] = useCookies();
  const [componentToRender, setComponentToRender] = useState<React.JSX.Element | null>(null);
  const [loading, setLoading] = useState(true);
  const user: User | null = useFetchUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.userType) {

          if (user.userType === "Admin") {
            document.title = 'Admin Profile - Class Tracker';
            setComponentToRender(<Admin user={user} />);
          } else if (user.userType === "Teacher") {
            document.title = 'Teacher Profile - Class Tracker';
            setComponentToRender(<Teacher user={user} />);
          } else if (user.userType === "Student") {
            document.title = 'Student Profile - Class Tracker';
            setComponentToRender(<Student user={user} />);
          } else {
            console.warn("Unexpected user type:", user.userType);
          }
        } else {
          console.warn("User data is not available yet.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]); 

  if (!cookies.session) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return (
      <Loading />
    );
  }

  console.log("Component to Render:", componentToRender);
  return componentToRender;
};

export default Profile;
