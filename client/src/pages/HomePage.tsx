import React from 'react';

import Typed from "react-typed"

import classImage from "../assets/students-knowing-right-answer.webp"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faUserGraduate, faUserTie } from "@fortawesome/free-solid-svg-icons";

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
      <div className='pt-[64px] w-full p-5 text-center'>
        <div className='w-full text-center'>
          <h1 className='text-5xl font-bold text-[#04304d] pb-3'>Your all in one school platform</h1>
          With class tracker you can get advanced controll hover your learning environment with just a few clicks.
          Class-tracker allow you to

        </div>

        <div className="grid grid-cols-3 lg:grid-cols-3 gap-15 mt-5 -mx-5 bg-[#04304d] ">

          <div className="teachers rounded-xl shadow-lg m-5 p-20 h-full text-white flex justify-start flex-col text-left">
            <FontAwesomeIcon icon={faUserTie} className='w-16 h-16'/>
            <h1 className='text-xl py-3'>Administration</h1>
            <p>teste</p>
          </div>
          <div className="teachers rounded-xl shadow-lg m-5 p-20 h-full text-white flex justify-start flex-col text-left">
            <FontAwesomeIcon icon={faUserGraduate} className='w-16 h-16'/>
            <h1 className='text-xl py-3'>Students</h1>
            <p>teste</p>
          </div>
          <div className="teachers rounded-xl shadow-lg m-5 p-20 h-full text-white flex justify-start flex-col text-left">
            <FontAwesomeIcon icon={faChalkboard} className='w-16 h-16'/>
            <h1 className='text-xl py-3'>Teachers</h1>
            <p>teste</p>
          </div>
          
        </div>
        <div className="contactButton w-1/4 font-bold text-[#04304d] uppercase p-3 rounded-lg mt-10 bg-white border-4 border-[#04304d] mx-auto hover:bg-[#04304d] hover:text-white duration-300 transition-all cursor-pointer">
          contact us
        </div>
      </div>
      {/* end features */}

      {/* gallery */}
      <div className="gallery pt-[64px] w-full p-5">
        <h1 className='text-5xl font-bold text-[#04304d] pb-3 text-center'>Check some of our features!</h1>
        <p className='text-center'>Wour UX/UI make us the most inovative and practical software in the market!</p>
      </div>

    </div>
  )
}

export default HomePage;
