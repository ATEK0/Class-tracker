import React, { useState } from 'react'
import { Modal, Label, TextInput, Button, FileInput } from 'flowbite-react';
import httpClient from '../../httpClient';
import toast from 'react-hot-toast';

const Admin = (props: { user: { email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; surname: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined } }) => {

  const [openModalCP, setOpenModalCP] = useState(false);
  const [cPassword, setcPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmnewPassword, setconfirmnewPassword] = useState('');

  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [image, setImage] = useState<File>();


  function onCloseModal() {
    
    setOpenModalCP(false);
    setcPassword("");
    setnewPassword("");
    setconfirmnewPassword("");
    setOpenModalProfile(false);

  }


  async function changePassword() {

    if (newPassword == confirmnewPassword) {
      var changePassResponse = await httpClient.post('//localhost:1222/changeProfilePassword', { current_password: cPassword, new_password: newPassword });
      var response = changePassResponse.data

      if (response.error) {
        toast.error(response["error"])
      } else {
        toast.success("Password changed")
        setOpenModalCP(false)
      }

    } else {
      toast.error("Passwords dont match")
    }

  }

  async function changeProfilePicture() {
    console.log(image)
    var changeProfile = await httpClient.post('//localhost:1222/updateProfileImage', { image : image });
    var response = changeProfile.data
    console.log(response)
    onCloseModal()
  }

  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8 h-full flex justify-center items-center'>
      <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
        <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white" src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
        <div className="text-center mt-2 font-light text-sm">{props.user.email}</div>
        <div className="text-center mt-2 text-3xl font-bold text-[#04304d]">{props.user.name} {props.user.surname}</div>
        <div className="text-center mt-2 font-light text-sm">{props.user.id}</div>
        <div className="text-center font-normal text-lg">{props.user.type}</div>

        <hr className="mt-8" />

        <div className="flex p-4">
          <div className="w-1/3 text-center p-1">
            <button type="button" onClick={() => { setOpenModalCP(true) }} className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full' >Password</button>
          </div>

          <div className="w-1/3 text-center p-1">
            <button type="button" onClick={() => { setOpenModalProfile(true) }} className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full' >Imagem</button>
          </div>

          <div className="w-1/3 text-center p-1">
            <button type="button" className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full' >Ajuda</button>
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
              <Button className='bg-[#7d7d7d]' onClick={() => { setOpenModalCP(false) }}>Cancel</Button>
              <Button className='bg-[#04304d]' onClick={changePassword}>Change Password</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
      {/* final modal change password */}




      {/* modal change profile picture */}
      <Modal dismissible show={openModalProfile} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Upload Image</h3>
            

          <div className="flex w-full items-center justify-center">
            <label
              htmlFor="imageUpload"
              className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
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
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, or WEBP</p>
              </div>
              <input
                id="imageUpload"
                type="file"
                className="hidden"
                onChange={(event) => {

                  const selectedFile = event.target.files[0];
                  setImage(selectedFile);
                  
                }}
                accept=".jpg, .jpeg, .png, .webp"
              />
            </label>
          </div>



            <div className="w-full flex justify-between">
              <Button className='bg-[#7d7d7d]' onClick={() => { setOpenModalProfile(false) }}>Cancel</Button>
              <Button className='bg-[#04304d]' onClick={changeProfilePicture}>Change Image</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
      {/* final modal profile picture */}

    </div>
  )
}

export default Admin