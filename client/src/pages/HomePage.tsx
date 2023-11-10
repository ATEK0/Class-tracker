import React, {useState, useEffect} from 'react'
import {User} from "../types"
import httpClient from '../httpClient';

const HomePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:1222/@me")

        setUser(resp.data)
        console.log(resp.data)
      } catch (error) {
        console.log("Not authenticated")
      }
      
    })();
  }, [])

  const logoutUser = async () => {
    const resp = await httpClient.post("//localhost:1222/logout")
    window.location.reload()
  }

  return (
    <div>
      <div className='pt-[64px] pl-[24px] mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'> 
        <h1>Bem vindo ao sistema de coisas e tales</h1>

        {user != null ? (
          <div>
            <h1>Estás logado</h1>
            <h3>ID: {user.id}</h3>
            <h3>Email: {user.email}</h3>

            <button onClick={logoutUser} className='bg-[gray] rounded-md p-2 m-2'>Logout</button>

          </div>
        ): (
          <div>
            <p>Não estás logado</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage