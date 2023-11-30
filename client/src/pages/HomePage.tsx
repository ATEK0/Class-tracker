import React from 'react';

import Typed from "react-typed"

import classImage from "../assets/students-knowing-right-answer.webp"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faCircleCheck, faUserGraduate, faUserTie } from '@fortawesome/free-solid-svg-icons';

const HomePage: React.FC = () => {

  return (
    <div>
      <div className='pt-[64px] w-full lg:pl-8 pr-0 bg-[#04304d] h-[85vh]'>
        <div className='grid lg:grid-cols-2 h-full w-full'>
          <div className='text-white flex flex-col justify-center pr-5 pl-[24px]'>
            <h1 className='text-6xl font-bold mb-4'>Want to keep your school in rails?</h1>
            <div className='text-4xl'>Class Tracker is here to be
              <Typed className='text-4xl pl-2' 
                strings={["interactive","helpfull", "simple", "adaptative"]} 
                typeSpeed={70} 
                backSpeed={30} 
                loop/>
            </div>
            <div className=''>
              <button className='mt-5 w-fit bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white mx-3 py-2 px-4 border border-white hover:border-transparent rounded transition-all duration-200'>Know More</button>
              <button className='mt-5 w-fit bg-blue-500 text-white font-semibold hover:text-white border-blue-500 py-2 px-4 border hover:border-white rounded transition-all duration-200'>Start Now</button>
            </div>
          </div>
          <div className='h-full hidden lg:block'>
            <img src={classImage} className='h-full w-full object-cover opacity-40 lg:rounded-ss-3xl' alt='Class Image' />
          </div>

        </div>
      </div>


      {/* features */}
      <div className='pt-[64px] w-full p-5'>
        <div className='w-full text-center'>
          <h1 className='text-5xl font-bold text-[#04304d] pb-3'>Your all in one school platform</h1>
          With class tracker you can get advanced controll hover your learning environment with just a few clicks.
          Class-tracker allow you to

        </div>

        <div className="grid grid-rows-3 lg:grid-cols-3 gap-6 text-center m-20">
          <div className="administration bg-[whitesmoke] rounded-md shadow-lg shadow-[#04304d6e] m-5 p-5 h-full">
            <FontAwesomeIcon icon={faUserTie} className='w-10 h-10 text-[#04304d]'/>
            <h1 className='text-2xl text-[#04304d] p-3 font-bold'>Administration</h1>
            <ul>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2' />Full controll hover schedules</li>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2'/>Full controll hover teachers</li>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2'/>Full controll hover students</li>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2'/>Access to personal information</li>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2'/>Infrastructure management</li>
            </ul>
          </div>
          <div className="students bg-[whitesmoke] rounded-md shadow-lg shadow-[#04304d6e] m-5 p-5 h-full">
            <FontAwesomeIcon icon={faUserGraduate} className='w-10 h-10 text-[#04304d]'/>
            <h1 className='text-2xl text-[#04304d] p-3 font-bold'>Students</h1>
            <ul>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2' />Full controll hover schedules</li>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2'/>Full controll hover teachers</li>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2'/>Full controll hover students</li>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2'/>Access to personal information</li>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2'/>Infrastructure management</li>
            </ul>
          </div>
          <div className="teachers bg-[whitesmoke] rounded-md shadow-lg shadow-[#04304d6e] m-5 p-5 h-full">
            <FontAwesomeIcon icon={faChalkboard} className='w-10 h-10 text-[#04304d]'/>
            <h1 className='text-2xl text-[#04304d] p-3 font-bold'>Teachers</h1>
            <ul>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2' />Full controll hover schedules</li>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2'/>Full controll hover teachers</li>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2'/>Full controll hover students</li>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2'/>Access to personal information</li>
              <li className='p-1'><FontAwesomeIcon icon={faCircleCheck} className='text-[green] mr-2'/>Infrastructure management</li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  )
}

export default HomePage;
