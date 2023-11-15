import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Calendar from '../../UI/Calendar';
import Table from '../../UI/Table';

const ClassDetails = () => {
    const { classId } = useParams();
    const { classLabel } = useParams();

    const [ClassInfo, setClassInfo] = useState([])
    
    useEffect(() => {
      
      async function getClassInfo() {

      }

      getClassInfo()

    }, [])
    


  return (
    <div className='pt-[64px] pb-5 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>

        <h1 className='font-bold text-3xl text-[#04304D] pt-8 mb-5 text-center'>Class {classLabel}</h1>

        <h1 className='font-bold text-2xl text-[#04304D] mb-5'>Schedule </h1>

        <Calendar id={"class-" + classId} />

        <h1 className='font-bold text-2xl text-[#04304D] py-5 mb-5'>Student List </h1>

        <Table endpoint={""} namesList={["abc", "cba"]}/>

    </div>
  )
}

export default ClassDetails