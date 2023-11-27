import React, { useState } from 'react'
import { Modal, Label, TextInput, Button } from 'flowbite-react';

const Admin = (props: { user: { email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; surname: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined } }) => {

  const [openModal, setOpenModal] = useState(false);
  const [cPassword, setcPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmnewPassword, setconfirmnewPassword] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setcPassword("");
    setnewPassword("");
    setconfirmnewPassword("");
  }
  
  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8 h-full flex justify-center items-center'>
        <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
          <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white" src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
          <div className="text-center mt-2 font-light text-sm">{props.user.email}</div>
          <div className="text-center mt-2 text-3xl font-bold text-[#04304d]">{props.user.name} {props.user.surname}</div>
          <div className="text-center mt-2 font-light text-sm">{props.user.id}</div>
          <div className="text-center font-normal text-lg">{props.user.type}</div>
          {/* <div className="px-6 text-center mt-2 font-light text-sm">
          <p>
              Front end Developer, avid reader. Love to take a long walk, swim
          </p>
          </div> */}
          <hr className="mt-8" />
          <div className="flex p-4">
          <div className="w-1/3 text-center p-1">
            <button type="button" onClick={() => {setOpenModal(true)}} className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full' >Password</button>
          </div>
          <div className="w-0 border border-gray-300">
              
          </div>
          <div className="w-1/3 text-center p-1">
          <button type="button" className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full' >Imagem</button>
          </div>
          <div className="w-0 border border-gray-300">
              
          </div>
          <div className="w-1/3 text-center p-1">
              <button type="button" className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full' >Ajuda</button>
          </div>
          </div>
        </div>

        {/* modal change password */}
        <Modal dismissible show={openModal} size="md" onClose={onCloseModal} popup>
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
              <TextInput id="newPassword" value={newPassword} placeholder='Insert new password' type="password" required onChange={(event) => setnewPassword(event.target.value)}/>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="confirmnewPassword" value="Confirm new password" />
              </div>
              <TextInput id="confirmnewPassword" value={confirmnewPassword} placeholder='Confirm new password' type="password" required onChange={(event) => setconfirmnewPassword(event.target.value)}/>
            </div>
            
            <div className="w-full flex justify-between">
              <Button className='bg-[#7d7d7d]' onClick={() => {setOpenModal(false)}}>Cancel</Button>
              <Button className='bg-[#04304d]'>Change Password</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default Admin