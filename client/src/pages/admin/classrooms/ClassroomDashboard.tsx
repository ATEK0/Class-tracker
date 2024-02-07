import { Link } from 'react-router-dom'


import { HiOutlineAcademicCap } from "react-icons/hi2"
import Table from '../../UI/TableClasses';

const ClassroomDashboard: React.FC = () => {


  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
      <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5 ">Classrooms</h1>

      <Link to={"/admin/classrooms/new"}><button type="button" className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full md:w-1/5 mb-3 ' >Create Class</button></Link>


      <Table endpoint={"getClasses"} namesList={["grade", "label"]} />

    </div>
  )
}

export default ClassroomDashboard 