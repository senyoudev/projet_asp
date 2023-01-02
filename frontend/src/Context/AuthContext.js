import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { getUrl } from '../API';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error('Auth Provider is missing');
  return context;
};

const authUrl = getUrl('Auth');
const userUrl = getUrl('User');

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${authUrl}/login`,
        { username, password },
        config,
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      if (data != null) return navigate('/');
    } catch (error) {
      toast.error('An error Occured');
      console.log(error);
      setLoading(false);
    }
  };

  const register = async (
    email,
    username,
    firstName,
    lastName,
    password,
    role,
  ) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${authUrl}/register`,
        { email, username, nom: firstName, prenom: lastName, password, role },
        config,
      );
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      if (data != null) return navigate('/');
    } catch (error) {
      toast.error('An error Occured');
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    return navigate('/login');
  };

  const getUserCount = async owner => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${userUrl}/GetUserCountByRole/count?role=${owner}`,
      );
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${userUrl}/GetUsers`);
      setLoading(false);
      console.log(data);
      return data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };

  const getUserById = async id => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${userUrl}/GetUserById/id?userId=${id}`,
        config,
      );
      console.log(data);
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error.response);
      setLoading(false);
    }
  };

  const deleteUserByAdmin = async id => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        `${userUrl}/DeleteUser/${id}`,
        config,
      );
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error.response);
      setLoading(false);
    }
  };
  const updateUserByAdmin = async (
    id,
    email,
    username,
    firstName,
    lastName,
    image,
    role,
  ) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${userUrl}/UpdateUser/admin?id=${id}`,
        {
          id,
          email,
          username,
          nom: lastName,
          prenom: firstName,
          photo: image,
          role,
        },
        config,
      );
      toast.success('Updated successfully');
      console.log(data);
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };

 

  return (
    <authContext.Provider
      value={{
        userInfo,
        loading,
        setLoading,
        login,
        logout,
        register,
        getUserCount,
        getUsers,
        getUserById,
        updateUserByAdmin,
        deleteUserByAdmin
      }}
    >
      {children}
    </authContext.Provider>
  );
};
