import { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { User } from "../types";
import { apiLink } from "../config";

export const useFetchUser = (): User => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await httpClient.get(apiLink + "/@me");
        setUser(resp.data); 
        
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, []);
  // console.log("user - ", user)
  return user;
};
