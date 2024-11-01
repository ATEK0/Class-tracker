import { useEffect, useState } from 'react'
import { Modal, Label, TextInput, Button } from 'flowbite-react';
import httpClient from '../../httpClient';
import { Link } from 'react-router-dom';
import { apiLink } from '../../config';
import { changePassword } from '../../controllers/changePassword';
import { handleFormSubmit } from '../../controllers/uploadProfileImage';
import { Student } from '../../types';

const StudentProfile = (props: {
  user: Student;
}) => {

  const [openModalCP, setOpenModalCP] = useState(false);
  const [cPassword, setcPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmnewPassword, setconfirmnewPassword] = useState('');

  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [profileImage, setProfileImage] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");

  const [selectedFile, setSelectedFile] = useState<File | null>();


  function onCloseModal() {
    setOpenModalCP(false);
    setcPassword("");
    setnewPassword("");
    setconfirmnewPassword("");
    setOpenModalProfile(false);
    setSelectedFile(null);
  }


  useEffect(() => {
    const loadData = async () => {
      try {
        const changeProfile = await httpClient.get(`${apiLink}/getProfileImage/user`, { responseType: 'blob' });

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
                  <h1 className="text-xl font-bold">{props.user.name} {props.user.surname}</h1>
                  <p className="text-gray-700 text-xs">{props.user.email}</p>
                  <p className="text-gray-700 text-xs">{props.user.pNumber}</p>

                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Settings</span>
                  <button type="button" onClick={() => { setOpenModalCP(true) }} className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full mb-1 hover:bg-[#04304dc5]' >Password</button>
                  <button type="button" onClick={() => { setOpenModalProfile(true) }} className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full mb-1 hover:bg-[#04304dc5]'>Image</button>
                  <Link to="/support"><button type="button" className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full hover:bg-[#04304dc5]'>Help</button></Link>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Information</h2>
                <p className="text-gray-700">
                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold">Address</span>
                    <p>
                      <span className="text-gray-700 mr-2">{props.user.address}</span>
                    </p>
                  </div>

                  <div className="flex justify-between flex-wrap gap-2 w-full py-2">
                    <span className="text-gray-700 font-bold">Birthdate</span>
                    <p>
                      <span className="text-gray-700 mr-2">{props.user.birthdate}</span>
                    </p>
                  </div>

                  <div className="flex justify-between flex-wrap gap-2 w-full py-2">
                    <span className="text-gray-700 font-bold">Class</span>
                    <p>
                      <span className="text-gray-700 mr-2">{props.user.className}</span>
                    </p>
                  </div>

                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold">HeadTeacher</span>
                    <p>
                      <span className="text-gray-700 mr-2">{props.user.classHeadTeacher}</span>
                    </p>
                  </div>
                </p>

                <h2 className="text-xl font-bold mt-6 mb-4">Parent Information</h2>
                <div className="mb-6">
                  <div className="flex justify-between flex-wrap gap-2 w-full py-2">
                    <span className="text-gray-700 font-bold">Name</span>
                    <p>
                      <span className="text-gray-700 mr-2">{props.user.parentName}</span>
                    </p>
                  </div>

                  <div className="flex justify-between flex-wrap gap-2 w-full py-2">
                    <span className="text-gray-700 font-bold">Phone</span>
                    <p>
                      <span className="text-gray-700 mr-2">{props.user.parentPhone}</span>
                    </p>
                  </div>

                  <div className="flex justify-between flex-wrap gap-2 w-full py-2">
                    <span className="text-gray-700 font-bold">Email</span>
                    <p>
                      <span className="text-gray-700 mr-2">{props.user.parentEmail}</span>
                    </p>
                  </div>

                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold">Address</span>
                    <p>
                      <span className="text-gray-700 mr-2">{props.user.parentAddress}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal change password */}
      <Modal dismissible show={openModalCP} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Change Password</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="cPassword" value="Current Password" />
              </div>
              <TextInput
                id="cPassword"
                placeholder="Your current password"
                value={cPassword}
                type='password'
                onChange={(event) => setcPassword(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="newPassword" value="Your new password" />
              </div>
              <TextInput id="newPassword" value={newPassword} placeholder='Insert new password' type="password" required onChange={(event) => setnewPassword(event.target.value)} />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="confirmnewPassword" value="Confirm new password" />
              </div>
              <TextInput id="confirmnewPassword" value={confirmnewPassword} placeholder='Confirm new password' type="password" required onChange={(event) => setconfirmnewPassword(event.target.value)} />
            </div>

            <div className="w-full flex justify-between">
              <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
              <Button className='bg-[#04304d]' onClick={async () => { if (await changePassword(newPassword, confirmnewPassword, cPassword)) { onCloseModal() } }}>Change Password</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
      {/* final modal change password */}




      {/* modal change profile picture */}
      <Modal dismissible show={openModalProfile} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form encType='multipart/form-data' id="imageUpload" onSubmit={handleFormSubmit}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Upload Image</h3>


              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="imageInput"
                  className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >

                  {selectedFile ? (
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center flex-col">
                        <span className="font-semibold">Selected file</span><br />{selectedFile.name}
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="Selected image"
                          className="w-16 h-16 object-cover mt-5"
                        />
                      </p>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center pb-6 pt-5'>
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, or JPEG</p>
                    </div>
                  )}
                  <input
                    id="imageInput"
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      if (!event.target.files) return;

                      const newSelectedFile = event.target.files[0];
                      setSelectedFile(newSelectedFile);

                    }}
                    accept=".jpg, .jpeg, .png"
                  />
                </label>
              </div>



              <div className="w-full flex justify-between">
                <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
                <Button className='bg-[#04304d]' type='submit'>Change Image</Button>
              </div>

            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* final modal profile picture */}

    </div>
  )
}

export default StudentProfile