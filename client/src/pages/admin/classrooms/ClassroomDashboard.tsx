import React from 'react'
import { Link } from 'react-router-dom'

import { HiOutlineAcademicCap } from "react-icons/hi2"

const ClassroomDashboard = () => {
  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
      <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Classrooms</h1>


      <div className="gap-3 grid grid-cols-3 md:grid-cols-6 sm:pb-16 pb-8">
            
            
            <Link to="/admin/classrooms/new" className="w-full bg-red text-[#04304D] p-10 border rounded-2xl shadow-sm font-bold text-center flex flex-col items-center hover:scale-105 transition-all duration-300 shadow-[#04304d4f]">
              <HiOutlineAcademicCap className="w-14 h-14 mb-3"/>
              Create Classroom
            </Link>

            


          </div>


    </div>
  )
}

export default ClassroomDashboard 