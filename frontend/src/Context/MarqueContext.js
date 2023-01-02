import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { getUrl } from '../API';
import { toast } from 'react-toastify';

const brandContext = createContext();

export const useBrand = () => {
  const context = useContext(brandContext);
  if (!context) throw new Error('Brand Provider is missing');
  return context;
};

const brandUrl = getUrl('brand');

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export const BrandContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const getBrands = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(`${brandUrl}/GetMarques`, config);
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error.response);
      setLoading(false);
    }
  };
  const addBrand = async brand => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`${brandUrl}/Create`, brand, config);
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('An error Occured');
      console.log(error);
    }
  };
  const editBrand = async (id, brand) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${brandUrl}/Update/${id}`,
        brand,
        config,
      );
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('An error Occured');
      console.log(error);
    }
  };
  const deleteBrand = async (id) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(
        `${brandUrl}/Delete/${id}`,
        config,
      );
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('An error Occured');
      console.log(error);
    }
  };

  return (
    <brandContext.Provider
      value={{
        getBrands,
        addBrand,
        editBrand,
        deleteBrand
      }}
    >
      {children}
    </brandContext.Provider>
  );
};
