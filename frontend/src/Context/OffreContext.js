import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { getUrl } from '../API';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const offreContext = createContext();

export const useOffre = () => {
  const context = useContext(offreContext);
  if (!context) throw new Error('Offre Provider is missing');
  return context;
};

const offreUrl = getUrl('Offres');
const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export const OffreContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const getOffres = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${offreUrl}/GetOffres`);
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error.response);
      setLoading(false);
    }
  };
  const addOffer = async offer => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`${offreUrl}/Create`, offer, config);
      setLoading(false);
    } catch (error) {
      toast.error('An error Occured');
      console.log(error);
    }
  };
  const editOffer = async (id,offer) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`${offreUrl}/Update?id=${id}`, offer, config);
      setLoading(false);
    } catch (error) {
      toast.error('An error Occured');
      console.log(error);
    }
  };
  const deleteOffer = async (id) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(
        `${offreUrl}/Delete/${id}`,
        config,
      );
      setLoading(false);
    } catch (error) {
      toast.error('An error Occured');
      console.log(error);
    }
  };
  return (
    <offreContext.Provider
      value={{
        getOffres,
        addOffer,
        editOffer,
        deleteOffer
      }}
    >
      {children}
    </offreContext.Provider>
  );
};
