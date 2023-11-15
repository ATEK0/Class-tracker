import { Link } from 'react-router-dom'; 
import CalendarUI from "../../UI/Calendar"

import Stats from "../../UI/Stats"

import { useCookies } from 'react-cookie';
import { useFetchUser } from '../../../controllers/getUserData';



const Dashboard: React.FC = () => {

  const [cookies, setCookie] = useCookies();

  const user = useFetchUser();


   

  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
        <h1 className="font-bold text-3xl text-[#04304D] pt-8">Olá {user?.name},</h1><small className='text-sm text-[#04304D] pb-3'>{user?.type}</small><br />
        <div>

          <Stats type="Admin"/>
          <h1 className='text-2xl mb-3 font-bold text-[#04304D]'>Administrator Panel</h1>
          <div className="gap-3 grid grid-cols-3 md:grid-cols-6 sm:pb-16 pb-8">
            <Link to="/admin/classrooms" className="w-full bg-red text-[#04304D] p-10 border rounded-2xl shadow-sm font-bold text-center flex flex-col items-center hover:scale-105 transition-all duration-300 shadow-[#04304d4f]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
              </svg>
              Classrooms
            </Link>

            <Link to="/admin/classes" className="w-full bg-red text-[#04304D] p-10 border rounded-2xl shadow-sm font-bold text-center flex flex-col items-center hover:scale-105 transition-all duration-300 shadow-[#04304d4f]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 mb-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>

              Classes
            </Link>

            <Link to="/admin/subjects" className="w-full bg-red text-[#04304D] p-10 border rounded-2xl shadow-sm font-bold text-center flex flex-col items-center hover:scale-105 transition-all duration-300 shadow-[#04304d4f]">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
              </svg>

              Subjects
            </Link>

            <Link to="/admin/students"  className="w-full bg-red text-[#04304D] p-10 border rounded-2xl shadow-sm font-bold text-center flex flex-col items-center hover:scale-105 transition-all duration-300 shadow-[#04304d4f]">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>

              Students
            </Link>

            <Link to="/admin/teachers" className="w-full bg-red text-[#04304D] p-10 border rounded-2xl shadow-sm font-bold text-center flex flex-col items-center hover:scale-105 transition-all duration-300 shadow-[#04304d4f]">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>

              Teachers
            </Link>

            <Link to="/admin/general" className="w-full bg-red text-[#04304D] p-10 border rounded-2xl shadow-sm font-bold text-center flex flex-col items-center hover:scale-105 transition-all duration-300 shadow-[#04304d4f]">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>

              Settings
            </Link>
            {/* <Link to="/new/classroom"><button type='button' className='bg-[#04304d] p-3 px-5 text-white rounded-lg font-bold'><FontAwesomeIcon icon={faPlus} className='mr-2'/>Class</button></Link>
            <Link to="/new/classroom"><button type='button' className='bg-[#04304d] p-3 px-5 text-white rounded-lg font-bold'><FontAwesomeIcon icon={faPlus} className='mr-2'/>Teacher</button></Link>
            <Link to="/new/classroom"><button type='button' className='bg-[#04304d] p-3 px-5 text-white rounded-lg font-bold'><FontAwesomeIcon icon={faPlus} className='mr-2'/>Student</button></Link>
            <Link to="/new/classroom"><button type='button' className='bg-[#04304d] p-3 px-5 text-white rounded-lg font-bold'><FontAwesomeIcon icon={faPlus} className='mr-2'/>Classroom</button></Link> */}
          </div>
          
          <CalendarUI id={NaN}/>

        </div>

    </div>
  );
};

export default Dashboard;
