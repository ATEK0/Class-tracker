import { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { Student } from "../types";
import { apiLink } from "../config";

export const getStudentData = () => {
  const [user, setUser] = useState<Student>();

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
