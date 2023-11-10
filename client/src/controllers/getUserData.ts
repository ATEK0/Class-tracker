// userApi.ts
import { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { User } from "../types";

export const useFetchUser = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await httpClient.get("//localhost:1222/@me");
        setUser(resp.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, []);

  return user;
};
