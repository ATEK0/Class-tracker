import React, { useEffect } from 'react'
import httpClient from '../../httpClient'
import mandatoryLoginCheck from '../../controllers/mandatoryLoginCheck'

const Logout: React.FC = () => {

    mandatoryLoginCheck()

    async function logoutUser() {
        const resp = await httpClient.post("//localhost:1222/logout")
        window.location.href="/"
    }
    
    logoutUser()
    
  return null
}

export default Logout