import React, { useEffect } from 'react';
import httpClient from '../httpClient';
import { useFetchUser } from '../controllers/getUserData';

import Typed from "react-typed"

import classImage from "../assets/students-knowing-right-answer.webp"

const HomePage: React.FC = () => {
  const user = useFetchUser();

  const logoutUser = async () => {
    const resp = await httpClient.post("//localhost:1222/logout")
    window.location.reload()
  }



  return (
    <div>
      <div className='pt-[64px] pl-[24px] w-full sm:pl-6 lg:pl-8 pr-0 bg-[#04304d] h-[85vh]'> 
        <div className='grid grid-cols-2 h-full w-full'>
          <div className='text-white flex flex-col justify-center pr-5'>
            <h1 className='text-6xl font-bold mb-4'>Want to keep your school in rails?</h1>
            <h1 className='text-4xl'>Class Tracker is here for you!</h1>
            <div className=''>
              <button className='mt-5 w-fit bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white mx-3 py-2 px-4 border border-white hover:border-transparent rounded transition-all duration-200'>Know More</button>
              <button className='mt-5 w-fit bg-blue-500 text-white font-semibold hover:text-white border-blue-500 py-2 px-4 border hover:border-white rounded transition-all duration-200'>Start Now</button>
            </div>
            
          </div>
          <div className='h-full'>
            <img src={classImage} className='h-full w-full object-cover opacity-40 rounded-ss-3xl' alt='Class Image' />
          </div>

        </div>
      </div>
      <div className='bg-white h-52 pt-[64px] pl-[24px] w-full sm:pl-6 lg:pl-8 pr-0 '>
        <h1>With Class Tracker you can</h1>
        <Typed className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2' 
          strings={["BTB", "BTC", "SAAS"]} 
          typeSpeed={120} 
          backSpeed={140} 
          loop
        />
      </div>
    </div>
  )
}

export default HomePage;
