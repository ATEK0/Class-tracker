// userApi.ts
import { useState, useEffect } from "react";
import httpClient from "../httpClient";

export const fetchTeachers = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await httpClient.get("//localhost:1222/getTeachers");
        setData(resp.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, []);

  return data;
};
