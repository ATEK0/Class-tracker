import React from 'react'
import httpClient from '../../httpClient'
import mandatoryLoginCheck from '../../controllers/mandatoryLoginCheck'
import { apiLink } from '../../config'

const Logout: React.FC = () => {

    mandatoryLoginCheck()

    async function logoutUser() {
        await httpClient.post(apiLink + "/logout")
        window.location.href="/"
    }
    
    logoutUser()
    
  return null
}

export default Logout