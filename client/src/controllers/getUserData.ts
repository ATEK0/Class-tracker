
import { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { User } from "../types";
import { apiLink } from "../config";

export const useFetchUser = (): User => {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    surname: "",
    email: "",
    state: "",
    userType: "",
    address: "",
    birthdate: ""
  });

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
  
  return user;
};