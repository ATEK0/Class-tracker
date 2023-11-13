import { Link } from 'react-router-dom'; 
import CalendarUI from "../../UI/Calendar"

import Stats from "../../UI/Stats"

import { useCookies } from 'react-cookie';
import { useFetchUser } from '../../../controllers/getUserData';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Dashboard: React.FC = () => {

  const [cookies, setCookie] = useCookies();

  const user = useFetchUser();


   

  return (
    <div className='pt-[64px] pl-[24px] mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
        <h1 className="font-bold text-3xl text-[#04304D] pt-8">Olá {user?.name},</h1><small className='text-sm text-[#04304D] pb-3'>{user?.type}</small><br />
        <div>

          <Stats />
          <h1 className='text-2xl mb-3 font-bold text-[#04304D]'>Administrator Panel</h1>
          <div className="gap-3 flex sm:pb-16 pb-8">
            
            <Link to="/new/classroom"><button type='button' className='bg-[#04304d] p-3 px-5 text-white rounded-lg font-bold'><FontAwesomeIcon icon={faPlus} className='mr-2'/>Class</button></Link>
            <Link to="/new/classroom"><button type='button' className='bg-[#04304d] p-3 px-5 text-white rounded-lg font-bold'><FontAwesomeIcon icon={faPlus} className='mr-2'/>Teacher</button></Link>
            <Link to="/new/classroom"><button type='button' className='bg-[#04304d] p-3 px-5 text-white rounded-lg font-bold'><FontAwesomeIcon icon={faPlus} className='mr-2'/>Student</button></Link>
            <Link to="/new/classroom"><button type='button' className='bg-[#04304d] p-3 px-5 text-white rounded-lg font-bold'><FontAwesomeIcon icon={faPlus} className='mr-2'/>Classroom</button></Link>
          </div>
          
          <CalendarUI />

        </div>

    </div>
  );
};

export default Dashboard;
