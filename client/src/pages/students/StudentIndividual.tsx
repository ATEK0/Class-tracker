import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import httpClient from "../../httpClient"
import { Student } from "../../types"
import { apiLink } from "../../config"


const StudentIndividual = () => {
  const { studentID } = useParams();
  const [userData, setUserData] = useState<Student | any>();
  const [UserImage, setUserImage] = useState<string>()
  const [error, setError] = useState<string | null>();
  const maxRetries = 3;
  let retries = 0;

  const fetchData = async () => {
    try {
      const getUser = await httpClient.post(`${apiLink}/getStudentInfo`, { id: studentID });
      const userTyperesp = getUser.data;
      setUserData(userTyperesp);

      const date = new Date(userData.birthdate);
      const options : any = { year: 'numeric', month: 'numeric', day: 'numeric' };


      setUserData((prevUserData: any) => ({ ...prevUserData, birthdate: date.toLocaleDateString('en-US', options).replace(/\//g, '-') }));

      const changeProfile = await httpClient.get(`${apiLink}/getProfileImage/` + studentID, { responseType: 'blob' });
      setUserImage(URL.createObjectURL(new Blob([changeProfile.data])))

      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Retrying...");
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      while (retries < maxRetries && (!userData || error)) {
        await fetchData();
        retries++;
      }
    };

    loadUserData();
  }, [studentID, userData, error]);



  return (
    <div>
      <div className="container pt-[70px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8 h-[100vh] flex justify-center items-center">
        <div className="card bg-[#f5f5f5] w-full rounded-xl shadow-xl border-[#00000039] py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 text-center md:text-left">

            <div className="profile w-full flex flex-col items-center">
              <img src={UserImage} className="object-contain rounded-full max-w-xs w-52 md:w-full" alt={`Profile Picture of ${userData?.id}`} />
              <h1 className="text-3xl p-2">{userData?.name} {userData?.surname} </h1>
              <h1 className="text-xl">{userData?.userType}</h1>
              <h1 className="text-md p-2">{userData?.process}</h1>
            </div>

            <div className="information w-full">
              <h1 className="text-2xl p-2 font-bold text-center md:text-left text-[#04304D]">{userData?.userType} Information</h1>
              <div className="information-content grid grid-cols-2 text-center md:text-left">
                <div className="labels text-[#04304dbe] font-bold">
                  <div className="infoLabel">Name</div>
                  <div className="infoLabel">Surname</div>
                  <div className="infoLabel">Email</div>
                  <div className="infoLabel">Process Number</div>
                  <div className="infoLabel">Address</div>
                  <div className="infoLabel">Birthdate</div>
                </div>
                <div className="informations ">
                  <div className="infoLabel">{userData?.name}</div>
                  <div className="infoLabel">{userData?.surname}</div>
                  <div className="infoLabel">{userData?.email}</div>
                  <div className="infoLabel">{userData?.process}</div>
                  <div className="infoLabel">{userData?.address}</div>
                  <div className="infoLabel">{userData?.birthdate}</div>
                </div>
              </div>
            </div>

            <div className="information w-full">
              <h1 className="text-2xl p-2 font-bold text-center md:text-left text-[#04304D]">Parent Information</h1>
              <div className="information-content grid grid-cols-2 text-center md:text-left">
                <div className="labels text-[#04304dbe] font-bold">
                  <div className="infoLabel">Parent Name</div>
                  <div className="infoLabel">Parent Phone</div>
                  <div className="infoLabel">Parent Email</div>
                  <div className="infoLabel">Parent Address</div>
                </div>
                <div className="informations">
                  <div className="infoLabel">{userData?.parentName}</div>
                  <div className="infoLabel">{userData?.parentPhone}</div>
                  <div className="infoLabel">{userData?.parentEmail}</div>
                  <div className="infoLabel">{userData?.parentAddress}</div>
                </div>
              </div>

              <h1 className="text-2xl p-2 font-bold text-center md:text-left text-[#04304D]">Class Information</h1>
              <div className="information-content grid grid-cols-2 text-center md:text-left">
                <div className="labels text-[#04304dbe] font-bold">
                  <div className="infoLabel">Class</div>
                  <div className="infoLabel">Head Teacher</div>
                </div>
                <div className="informations">
                  <div className="infoLabel linkLabel"><Link to={`/admin/classes/${userData?.class_id}/${userData?.class}`}>{userData?.class}</Link></div>
                  <div className="infoLabel">{userData?.class_director}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default StudentIndividual
