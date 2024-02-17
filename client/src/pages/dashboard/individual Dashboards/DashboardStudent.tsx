import CalendarStudents from '../../UI/CalendarStudents'
import { Student } from '../../../types';
import { getStudentData } from '../../../controllers/getStudentData';


const DashboardTeacher = () => {

  const user: Student | undefined = getStudentData();

  return (
    <div className='pt-[64px] pl-[24px] mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>

      <div className="mb-8">
        <h1 className="font-bold text-3xl text-[#04304D] pt-8">Hello {user?.name}</h1>
        <small className='text-sm text-[#04304D] '>{user?.userType}</small>
        <br />
      </div>

      <h1 className="font-bold text-xl text-[#04304D] mb-3">Your Schedule - {user?.className}</h1>
      <CalendarStudents />
    </div>
  )
}

export default DashboardTeacher