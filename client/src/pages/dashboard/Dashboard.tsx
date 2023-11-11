import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; 
import { User } from '../../types';

import CalendarUI from "../UI/Calendar"

import Stats from "../UI/Stats"

import { useCookies } from 'react-cookie';
import { useFetchUser } from '../../controllers/getUserData';


const Dashboard: React.FC = () => {

  const [cookies, setCookie] = useCookies();
  const user = useFetchUser();

  if (!cookies.session) {
    return <Navigate to="/" />;
  }

  return (
    <div className='pt-[64px] pl-[24px] mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
        <h1 className="font-bold text-3xl text-[#04304D] pt-8">Olá {user?.name},</h1><small className='text-sm text-[#04304D] pb-3'>{user?.type}</small><br />
        <div>

          <Stats />
          <CalendarUI />

        </div>

    </div>
  );
};

export default Dashboard;
