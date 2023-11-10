import React from 'react'
import httpClient from '../../httpClient'

const Logout: React.FC = () => {
    async function logoutUser() {
        const resp = await httpClient.post("//localhost:1222/logout")
        window.location.href="/"
    }

    logoutUser()
  return (
    <div></div>
  )
}

export default Logout