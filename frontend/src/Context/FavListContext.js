import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { getUrl } from '../API';
import { toast } from 'react-toastify';

const favContext = createContext();

export const useFav = () => {
  const context = useContext(favContext);
  if (!context) throw new Error('FavoriteList Provider is missing');
  return context;
};

const favUrl = getUrl('fav');

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export const FavContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const addUserToFavoriteList = async(id) => {
    setLoading(true)
    try {
         const config = {
           headers: {
             'Content-Type': 'application/json',
             Authorization: `Bearer ${userInfo.token}`,
           },
         };
         const { data } = await axios.post(
           `${favUrl}/create`, {id:0,userId:id},
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
  }


  const removeUserFromFavoriteList = async id => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(`${favUrl}/Delete/${id}`, config);
      console.log(data);
      setLoading(false);
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };


  return (
    <favContext.Provider
      value={{
        loading,
        addUserToFavoriteList,
        removeUserFromFavoriteList,
      }}
    >
      {children}
    </favContext.Provider>
  );
};
