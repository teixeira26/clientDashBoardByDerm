import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserRole } from '../Services/Users/getUserRole';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [role, setRole] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUser(storedUser);
          const userRole = await getUserRole(storedUser.uid);
          setRole(userRole);
          setIsLoading(false)
        }
        else{
            setUser(false)
            setIsLoading(false)
        }
      };
  
      fetchUserRole();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, role, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};