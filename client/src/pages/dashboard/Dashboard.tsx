import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; // Import Redirect from react-router-dom
import httpClient from '../../httpClient';
import { User } from '../../types';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get('//localhost:1222/@me');
        setUser(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.log("Not authenticated");
        setIsAuthenticated(false);
      }
    })();
  }, []);

  // Check if the user is not authenticated and redirect if necessary
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {user != null ? (
        <div>
          <h1>Estás logado</h1>
          <h3>ID: {user.id}</h3>
          <h3>Email: {user.email}</h3>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
