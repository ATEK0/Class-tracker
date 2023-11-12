import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom'; 
import { User } from '../../types';

import CalendarUI from "../UI/Calendar"

import Stats from "../UI/Stats"

import { useCookies } from 'react-cookie';
import { useFetchUser } from '../../controllers/getUserData';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import httpClient from '../../httpClient';


const Dashboard: React.FC = () => {

  const [cookies, setCookie] = useCookies();



  // const [subjectCount, setSubjectCount] = useState(); 
  // const [studentCount, setStudentCount] = useState(); 
  // const [teacherCount, setTeacherCount] = useState();


  const user = useFetchUser();

  if (!cookies.session) {
    return <Navigate to="/" />;
  }
  
  

  return (
    <div className='pt-[64px] pl-[24px] mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
        <h1 className="font-bold text-3xl text-[#04304D] pt-8">Olá {user?.name},</h1><small className='text-sm text-[#04304D] pb-3'>{user?.type}</small><br />
        <div>

          <Stats />


          <Link to="/new/classroom"><button type='button' className='bg-[#04304d] p-3 px-5 text-white rounded-lg font-bold'><FontAwesomeIcon icon={faPlus} className='mr-2'/>Summary</button></Link>
          <CalendarUI />

        </div>

    </div>
  );
};

export default Dashboard;
