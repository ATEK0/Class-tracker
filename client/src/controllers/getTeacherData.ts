import { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { Teacher } from "../types";
import { apiLink } from "../config";

export const getTeacherData = () => {
  const [user, setUser] = useState<Teacher>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await httpClient.get(apiLink + "/@me");
        setUser(resp.data);
        console.log(resp.data);  
        
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, []);
  
  return user;
};
