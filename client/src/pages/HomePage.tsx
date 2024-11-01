import React from 'react';
import Typed from "react-typed"

import classImage from "../assets/students-knowing-right-answer.webp"
import modernSchedule from "../assets/positive-schoolgirl-pointing-clock.jpg"
import designedToAllAges from "../assets/students-knowing-right-answer.webp"
import onTimeWithStyle from "../assets/positive-hipster-wears-round-spectacles-enjoys-listening-audio-track-stereo-headphones-chuckles-from-joy-has-messy-hairstyle-sticks-out-head-from-paper-wall-with-colorful-sticky-notes.jpg"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faUserGraduate, faUserTie } from "@fortawesome/free-solid-svg-icons";
import Footer from './NavBar/Footer';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className='pt-[64px] w-full lg:pl-8 pr-0 bg-[#04304d] h-[85vh]'>
        <div className='grid lg:grid-cols-2 h-full w-full'>
          <div className='text-white flex flex-col justify-center pr-5 pl-[24px]'>
            <h1 className='text-6xl font-bold mb-4'>Want to keep your school in rails?</h1>
            <div className='text-4xl'>Class Tracker is here to be
              <Typed className='text-4xl pl-2'
                strings={["interactive", "helpful", "simple", "adaptative"]}
                typeSpeed={70}
                backSpeed={30}
                loop />
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
      <div className='pt-[80px] w-full p-5 text-center'>
        <div className='w-full text-center mb-10'>
          <h1 className='text-5xl font-bold text-[#04304d] pb-3'>Your all in one school platform</h1>
          With class tracker you can get advanced controll hover your learning environment with just a few clicks.
          Class-tracker allow you to
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-15 mt-5 -mx-5 bg-[#04304d] ">

          <div className="teachers m-5 p-8 h-full text-white flex justify-start flex-col text-left">
            <FontAwesomeIcon icon={faUserTie} className='w-16 h-16' />
            <h1 className='text-xl py-3 font-bold'>Administration</h1>
            <p className='break-words'>Be able to manage all your infrastructure data and access all the data that you need in every device at any time</p>
          </div>
          <div className="teachers m-5 p-8 h-full text-white flex justify-start flex-col text-left">
            <FontAwesomeIcon icon={faUserGraduate} className='w-16 h-16' />
            <h1 className='text-xl py-3 font-bold'>Students</h1>
            <p className='break-words'>Have all the informations about his school, shedule, classes and much more in his pockets at the distance of a click</p>
          </div>
          <div className="teachers m-5 p-8 h-full text-white flex justify-start flex-col text-left">
            <FontAwesomeIcon icon={faChalkboard} className='w-16 h-16' />
            <h1 className='text-xl py-3 font-bold'>Teachers</h1>
            <p className='break-words'>Manage classes, contact administration, get information on his students in the most simple way ever in every device in hand.</p>
          </div>

        </div>
      </div>
      {/* end features */}



      {/* Pricing */}

      <div className="gallery pt-[64px] w-full p-5">
        <h1 className='text-5xl font-bold text-[#04304d] pb-3 text-center'>Perfect for your business</h1>
        <p className='text-center'>Check our offers below</p>
      </div>

      <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
        <li className="relative flex flex-col sm:flex-row xl:flex-col items-start">
          <div className="order-1 sm:ml-6 xl:ml-0 w-full p-10 rounded-md bg-white border-gray-400 border translate-y-2 text-center shadow-lg">
            <h1 className='text-2xl text-[#04304d] font-bold'>Middle School</h1>
            
            <button type="button" className='bg-[#04304d] p-3 rounded-lg text-white font-bold mt-3'>Contact our team</button>

          </div>
        </li>
        <li className="relative flex flex-col sm:flex-row xl:flex-col items-start">
          <span className='bg-[#04304d] absolute z-10 ml-2 p-2 text-white rounded-full -translate-y-6 text-sm shadow-2xl shadow-[#04304d] font-bold'>Best Offer</span>

          <div className="order-1 sm:ml-6 xl:ml-0 w-full p-10 rounded-md bg-white border-[#04304d] border-2 -translate-y-4 text-center shadow-lg">
            <h1 className='text-2xl text-[#04304d] font-bold'>College</h1>

            <button type="button" className='bg-[#04304d] p-3 rounded-lg text-white font-bold mt-3'>Contact our team</button>

          </div>
        </li>
        <li className="relative flex flex-col sm:flex-row xl:flex-col items-start">
          <div className="order-1 sm:ml-6 xl:ml-0 w-full p-10 rounded-md bg-white border-gray-400 border translate-y-2 text-center shadow-lg">
            <h1 className='text-2xl text-[#04304d] font-bold'>High School</h1>

            <button type="button" className='bg-[#04304d] p-3 rounded-lg text-white font-bold mt-3'>Contact our team</button>

          </div>
        </li>
      </ul>

      {/* Pricing */}



      {/* gallery */}
      <div className="gallery pt-[64px] w-full p-5">
        <h1 className='text-5xl font-bold text-[#04304d] pb-3 text-center'>Check some of our features!</h1>
        <p className='text-center'>Wour UX/UI make us the most inovative and practical software in the market!</p>
      </div>


      <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
        <li className="relative flex flex-col sm:flex-row xl:flex-col items-start">
          <div className="order-1 sm:ml-6 xl:ml-0">
            <h3 className="mb-1 text-slate-900 font-semibold dark:text-slate-200">
              <span className="mb-1 block text-sm leading-6 text-[#04304d]">Modern Schedules</span>
              Easy to read and consult
            </h3>
            <div className="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
              <p>Hour schedules tech allow an intuitive and simple consulting and reading way to see schedules</p>
            </div>
          
          </div>
          <img src={modernSchedule} alt="" className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" width="1216" height="640" />
        </li>
        <li className="relative flex flex-col sm:flex-row xl:flex-col items-start">
          <div className="order-1 sm:ml-6 xl:ml-0">
            <h3 className="mb-1 text-slate-900 font-semibold dark:text-slate-200">
              <span className="mb-1 block text-sm leading-6 text-[#04304d]">Simple & Intuitive Design</span>
              Designed to all ages
            </h3>
            <div className="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
              <p>Our design was created thinking about all ages, from the 10yr to the 80yr, so that our platform can be used by everyone inside a learning environment with no issues</p>
            </div>
          
          </div>
          <img src={designedToAllAges} alt="" className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" width="1216" height="640" />
        </li>
        <li className="relative flex flex-col sm:flex-row xl:flex-col items-start">
          <div className="order-1 sm:ml-6 xl:ml-0">
            <h3 className="mb-1 text-slate-900 font-semibold dark:text-slate-200">
              <span className="mb-1 block text-sm leading-6 text-[#04304d]">
                Fast and Reliable
              </span>
              Always on time with style
            </h3>
            <div className="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
              <p>You will never miss a beat, tested in a lot of cases with a perfect performance, never run into problems</p>
            </div>
          </div>
          <img src={onTimeWithStyle} alt="" className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" width="1216" height="640" />
        </li>
      </ul>


      {/* end gallery */}

      <Footer />

    </div>
  )
}

export default HomePage;
