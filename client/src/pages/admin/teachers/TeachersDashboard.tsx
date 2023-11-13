import { Link } from 'react-router-dom'; 
import CalendarUI from "../../UI/Calendar"

import Stats from "../../UI/Stats"

import { useCookies } from 'react-cookie';
import { useFetchUser } from '../../../controllers/getUserData';



const TeachersDashboard: React.FC = () => {

  const [cookies, setCookie] = useCookies();

  const user = useFetchUser();


   

  return (
    <div className='pt-[64px] pl-[24px] mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
        <h1 className="font-bold text-3xl text-[#04304D] pt-8">Olá {user?.name},</h1><small className='text-sm text-[#04304D] pb-3'>{user?.type}</small><br />
        <div>

          <Stats type="Teacher"/>

          <CalendarUI />

        </div>

    </div>
  );
};

export default TeachersDashboard;
