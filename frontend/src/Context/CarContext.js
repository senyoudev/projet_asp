import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { getUrl } from '../API';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const carContext = createContext();

export const useCar = () => {
  const context = useContext(carContext);
  if (!context) throw new Error('Car Provider is missing');
  return context;
};

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const carUrl = getUrl('Cars');

export const CarContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getOwnerCars = async id => {
    try {
      const { data } = await axios.get(
        `${carUrl}/GetVoituresByUser/ByUser?userId=${id}`,
      );
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };
  const getOwnerCarsNumber = async id => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${carUrl}/GetVoituresByUserCount/countByUser?userId=${id}`,
      );
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error.response);
      setLoading(false);
    }
  };
  const getCar = async id => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${carUrl}/GetVoiture?id=${id}`);
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error.response);
      setLoading(false);
    }
  };
  const addCar = async car => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`${carUrl}/AddVoiture`, car, config);
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error.response);
      setLoading(false);
    }
  };
  const getCarsCount = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${carUrl}/GetVoituresCount/count`);
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };

  const getCars = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${carUrl}/GetVoitures`);
      console.log(data);
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };

  const approveCar = async id => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${carUrl}/AprovedVoiture/approve?id=${id}`,
        config,
      );
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
    <carContext.Provider
      value={{
        getOwnerCarsNumber,
        getCar,
        loading,
        setLoading,
        getCarsCount,
        getOwnerCars,
        getCars,
        addCar,
        approveCar
      }}
    >
      {children}
    </carContext.Provider>
  );
};
