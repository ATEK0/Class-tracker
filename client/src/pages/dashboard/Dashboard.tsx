import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; 
import { User } from '../../types';

import CalendarUI from "../UI/Calendar"

import Stats from "../UI/Stats"

import { useCookies } from 'react-cookie';


const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [cookies, setCookie] = useCookies();

  if (!cookies.session) {
    return <Navigate to="/" />;
  }

  return (
    <div className='pt-[64px] pl-[24px] mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>

        <div>

          <Stats />
          <CalendarUI />

        </div>

    </div>
  );
};

export default Dashboard;
