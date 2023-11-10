import { useEffect } from "react";
import { useFetchUser } from "./getUserData";


const mandatoryLoginCheck = () => {
    useEffect(() => {
        
        const user = useFetchUser();

        if (!user) { //user has session cookie, wich means that he has an active session
            window.location.href="/login"
        }

      }, []);

      return ""
}

export default mandatoryLoginCheck