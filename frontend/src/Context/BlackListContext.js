import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { getUrl } from '../API';
import { toast } from 'react-toastify';

const blackContext = createContext();

export const useBlack = () => {
  const context = useContext(blackContext);
  if (!context) throw new Error('BlackList Provider is missing');
  return context;
};

const blackUrl = getUrl('black');

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export const BlackContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);


   const addUserToBlackList = async id => {
     setLoading(true);
     try {
       const config = {
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${userInfo.token}`,
         },
       };
       const { data } = await axios.post(
         `${blackUrl}/create`,
         { id: 0, userId: id },
         config,
       );
       toast.success('Added successfully');
       console.log(data);
       setLoading(false);
     } catch (error) {
       toast.error('Something went wrong');
       console.log(error);
       setLoading(false);
     }
   };


   const removeUserFromBlackList = async id => {
     setLoading(true);
     try {
       const config = {
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${userInfo.token}`,
         },
       };
       const { data } = await axios.delete(
         `${blackUrl}/Delete/${id}`,
         config,
       );
       console.log(data);
       setLoading(false);
     } catch (error) {
       toast.error('Something went wrong');
       console.log(error);
       setLoading(false);
     }
   };



  return (
    <blackContext.Provider
      value={{
        loading,
        addUserToBlackList,
        removeUserFromBlackList
      }}
    >
      {children}
    </blackContext.Provider>
  );
};
