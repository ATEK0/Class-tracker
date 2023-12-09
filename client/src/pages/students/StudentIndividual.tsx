import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import httpClient from "../../httpClient"
import { Student } from "../../types"


const StudentIndividual = () => {
  const { studentID } = useParams();
  const [userData, setUserData] = useState<Student | null>();
  const [error, setError] = useState<string | null>();
  const maxRetries = 3;
  let retries = 0;

  const fetchData = async () => {
    try {
      const getUser = await httpClient.post("//localhost:1222/getStudentInfo", { id: studentID });
      const userTyperesp = getUser.data;
      setUserData(userTyperesp);
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
        <div className="card bg-[#f5f5f5] w-full border rounded-xl shadow-xl border-[#00000039] py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 text-center md:text-left">

            <div className="profile w-full flex flex-col items-center">
              <img src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="object-contain max-w-xs w-52 md:w-full" alt={`Profile Picture of ${userData?.id}`}/>
              <h1 className="text-4xl p-2">{userData?.name} {userData?.surname} </h1>
              <h1 className="text-2xl">{ userData?.type }</h1>
              <h1 className="text-md p-2">{ userData?.process }</h1>
            </div>

            <div className="information w-full">
              <h1 className="text-4xl p-2 font-bold text-center md:text-left">{ userData?.type } Information</h1>
              <div className="information-content grid grid-cols-2 text-center md:text-left">
                <div className="labels font-bold">
                  <div className="infoLabel">Name</div>
                  <div className="infoLabel">Surname</div>
                  <div className="infoLabel">Email</div>
                  <div className="infoLabel">Class</div>
                  <div className="infoLabel">Class Director</div>
                  <div className="infoLabel">Process Number</div>
                  <div className="infoLabel">Address</div>
                  <div className="infoLabel">Birthdate</div>
                </div>
                <div className="informations">
                  <div className="infoLabel">{userData?.name}</div>
                  <div className="infoLabel">{userData?.surname}</div>
                  <div className="infoLabel">{userData?.email}</div>
                  <div className="infoLabel linkLabel"><Link to={`/admin/classes/${userData?.class_id}/${userData?.class}`}>{userData?.class}</Link></div>
                  <div className="infoLabel">{userData?.class_director}</div>
                  <div className="infoLabel">{userData?.process}</div>
                  <div className="infoLabel">{userData?.address ? userData?.address : "No information"}</div>
                  <div className="infoLabel">{userData?.birthdate ? userData?.birthdate : "No information"}</div>
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
