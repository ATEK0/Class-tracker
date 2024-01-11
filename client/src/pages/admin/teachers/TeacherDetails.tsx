import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import httpClient from "../../../httpClient";
import { apiLink } from "../../../config";
import { Teacher } from "../../../types";
import Loading from "../../UI/Loading";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TeacherDetails = () => {

  const { name } = useParams();
  const { teacherID } = useParams();
  const [UserImage, setUserImage] = useState<string>()
  const [TeacherData, setTeacherData] = useState<Teacher>()
  const [Loaded, setLoaded] = useState<boolean>(false)

  function unassignClass() {
    
  }
  
  function unassignSubject() {
    
  }

  useEffect(() => {

    async function loadUserData() {
      const changeProfile = await httpClient.get(apiLink + '/getProfileImage/' + teacherID, { responseType: 'blob' });
      setUserImage(URL.createObjectURL(new Blob([changeProfile.data])))

      const loadTeacherData = await httpClient.post(apiLink + '/getTeacherInfo', { id: teacherID })
      console.log(loadTeacherData)
      setTeacherData(loadTeacherData.data)

      if (changeProfile && loadTeacherData) {
        setLoaded(true)
      }

    }

    loadUserData()
  }, [])


  if (Loaded) {
    return (
      <div className='pt-[64px] mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5 flex justify-center md:block">Teacher Details</h1>

        <div className="teacherInformations flex flex-col md:flex-row md:justify-start md:items-start justify-center items-center">
          <div className="teacherImage w-fit">
            <img src={UserImage} className="object-contain w-40" alt={`Profile Picture of ${teacherID}`} />
          </div>
          <div className="teacherData w-100 md:ml-10 flex justify-center items-center flex-col md:block">
            <h1 className="font-bold text-xl text-[#04304D] pt-4">{name}</h1>
            <p className="text-sm text-[#04304D] font-bold">{TeacherData?.id}</p>
            <p className="text-sm text-[#04304D] font-bold">{TeacherData?.email}</p>
            <p className="text-sm text-[#04304D] font-bold">{TeacherData?.state}</p>
            <p className="text-sm text-[#04304D] font-bold">{TeacherData?.address}</p>
            <p className="text-sm text-[#04304D] font-bold">{TeacherData?.birthdate}</p>
            <p className="text-sm text-[#04304D] font-bold">{TeacherData?.contact}</p>
          </div>
        </div>




        <div className="grid grid-rows-2 md:grid-cols-2 pt-5 gap-5">
          <div className="profClasses">
            <h1 className="text-2xl font-bold text-[#04304D] pb-3">Assigned Classes</h1>
            {
              !TeacherData?.classes ? (
                <p>This teacher does not give any subject</p>
              ) : (
                <div>
                  {TeacherData?.classes.map((item, index) => (
                    <p style={{ borderBottom: "1px solid #E5E7EB" }} className="w-100 hover:bg-[#eeeeee] hover:cursor-pointer transition-all duration-300 p-2 flex justify-between items-center" key={index}>{item} <button type="button" className="flex justify-between items-center" onClick={() => { unassignClass() }}><FontAwesomeIcon icon={faXmark} className="bg-[#04304d] text-white p-1 rounded-md hover:bg-[#04304dc0]" /></button></p>
                  ))}
                </div>
              )
            }
          </div>
          <div className="profSubjects">
            <h1 className="text-2xl font-bold text-[#04304D] pb-3">Assigned Subjects</h1>

            {
              !TeacherData?.subjects ? (
                <p>This teacher does not give any subject</p>
              ) : (
                <ul>
                  {TeacherData?.subjects.map((item, index) => (
                    <p style={{borderBottom:"1px solid #E5E7EB"}} className="w-100 hover:bg-[#eeeeee] hover:cursor-pointer transition-all duration-300 p-2 flex justify-between items-center" key={index}>{item} <button type="button" className="flex justify-between items-center" onClick={() => { unassignSubject() }}><FontAwesomeIcon icon={faXmark} className="bg-[#04304d] text-white p-1 rounded-md hover:bg-[#04304dc0]"/></button></p>
                  ))}
                </ul>
              )
            }
          </div>
        </div>






      </div>
    )
  }

  return (
    <Loading />
  )

}

export default TeacherDetails