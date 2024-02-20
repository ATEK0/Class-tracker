import { useEffect, useState } from 'react'
import { apiLink } from '../../config';
import httpClient from '../../httpClient';
import { Link, useParams } from 'react-router-dom';

const ProfileUser = () => {

  const { userID } = useParams();
  const [profileImage, setProfileImage] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");

  const [user, setuser] = useState<any>()

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log(userID)
        const changeProfile = await httpClient.get(`${apiLink}/getProfileImage/${userID}`, { responseType: 'blob' });

        const userDataResp = await httpClient.post(`${apiLink}/getProfileInfo`, { "user_id": userID });


        setuser(userDataResp.data)

        const imageUrl = URL.createObjectURL(new Blob([changeProfile.data]));

        setProfileImage(imageUrl);
      } catch (error) {
        console.error('Error loading profile image:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8 h-full flex justify-center items-center'>
      <div className="bg-gray-100 rounded-md">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-10">
                <div className="flex flex-col items-center">
                  <img src={profileImage} className="w-40 h-40 bg-gray-300 rounded-full mb-4 shrink-0">

                  </img>

                  <h1 className="text-xl font-bold">{user?.name}</h1>
                  <p className="text-gray-700 text-xs">{user?.email}</p>
                  <p className="text-gray-700 text-xs">{user?.userType}</p>

                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Information</h2>
                <p className="text-gray-700">

                  <div className="flex justify-between flex-wrap gap-2 w-full py-2">
                    <span className="text-gray-700 font-bold">Birthdate</span>
                    <p>
                      <span className="text-gray-700 mr-2">{user?.birthdate}</span>
                    </p>
                  </div>


                  {user?.userType == "Student" ? (<>
                    <div className="flex justify-between flex-wrap gap-2 w-full py-2">
                      <span className="text-gray-700 font-bold">Class</span>
                      <p>
                        <span className="text-gray-700 mr-2"><Link to={`/admin/classes/${user?.class_id}/${user?.class}`}><u>{user?.class}</u></Link></span>
                      </p>
                    </div>

                    <div className="flex justify-between flex-wrap gap-2 w-full">
                      <span className="text-gray-700 font-bold">HeadTeacher</span>
                      <p>
                        <span className="text-gray-700 mr-2"><a href={`/profile/${user?.headteacher_id}`}><u>{user.headteacher}</u></a></span>
                      </p>
                    </div>


                  </>
                  ) : ""
                  }

                  {user?.userType == "Teacher" ? (
                    <div className="flex justify-between flex-wrap gap-2 w-full py-2">
                      
                    </div>
                  ) : ""
                  }

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileUser