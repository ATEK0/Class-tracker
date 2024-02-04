import { useEffect, useState } from 'react'
import { apiLink } from '../../config';
import httpClient from '../../httpClient';
import { Link, useParams } from 'react-router-dom';

const ProfileUser = () => {

  const { userID } = useParams();
  const [profileImage, setProfileImage] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");


  useEffect(() => {
    const loadData = async () => {
      try {
        console.log(userID)
        const changeProfile = await httpClient.get(`${apiLink}/getProfileImage/${userID}`, { responseType: 'blob' });

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
                  <h1 className="text-xl font-bold">name</h1>
                  <p className="text-gray-700 text-xs">email</p>
                  <p className="text-gray-700 text-xs">process</p>

                </div>
                <hr className="my-6 border-t border-gray-300" />
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Information</h2>
                <p className="text-gray-700">
                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold">Address</span>
                    <p>
                      <span className="text-gray-700 mr-2">addressss</span>
                    </p>
                  </div>

                  <div className="flex justify-between flex-wrap gap-2 w-full py-2">
                    <span className="text-gray-700 font-bold">Birthdate</span>
                    <p>
                      <span className="text-gray-700 mr-2">01-01-2000</span>
                    </p>
                  </div>

                  <div className="flex justify-between flex-wrap gap-2 w-full py-2">
                    <span className="text-gray-700 font-bold">Class</span>
                    <p>
                      <span className="text-gray-700 mr-2"><Link to={`/admin/classes/CLASSID/CLASSNAME`}><u>CLASSNAME</u></Link></span>
                    </p>
                  </div>

                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold">HeadTeacher</span>
                    <p>
                      <span className="text-gray-700 mr-2">HEADTEACHER</span>
                    </p>
                  </div>
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