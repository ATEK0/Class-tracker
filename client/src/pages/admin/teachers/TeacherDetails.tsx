import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import httpClient from "../../../httpClient";

const TeacherDetails = () => {

    const { name } = useParams();
    const { teacherID } = useParams();   
    const [UserImage, setUserImage] = useState<string>()


    useEffect(() => {

      async function loadUserData() {
        const changeProfile = await httpClient.get('//localhost:1222/getProfileImage/' + teacherID, { responseType: 'blob' });
        setUserImage(URL.createObjectURL(new Blob([changeProfile.data])))
      }

      loadUserData()

    }, )
    
  return (
    <div className='pt-[64px] mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Teacher Details</h1>
        <img src={UserImage} className="object-contain w-40" alt={`Profile Picture of ${teacherID}`}/>
        <h1 className="font-bold text-xl text-[#04304D] pt-4">{name}</h1>
        <p className="text-sm text-[#04304D] font-bold">{teacherID}</p>

    </div>
  )
}

export default TeacherDetails