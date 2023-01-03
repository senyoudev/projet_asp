import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { getUrl } from '../API';
import { toast } from 'react-toastify';

const reservationContext = createContext();

export const useReservation = () => {
  const context = useContext(reservationContext);
  if (!context) throw new Error('Reservation Provider is missing');
  return context;
};

const reservationUrl = getUrl('Reservations');
const paymentUrl = getUrl('payment');

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export const ReservationContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const getOwnerReservations = async id => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${reservationUrl}/getOwnerReservations?idUser=${id}`,
        config,
      );
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };
  const getUserReservations = async id => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${reservationUrl}/getUserReservation/${id}`,
        config,
      );
      console.log(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  const getReservations = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${reservationUrl}/GetReservations`,
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
  const getReservationsCount = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${reservationUrl}/getReservationsCount`,
        config,
      );
      setLoading(false);
      console.log(data);
      return data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error.response);
      setLoading(false);
    }
  };

  const postReservation = async (
    userId,
    voitureId,
    dateDebut,
    dateFin,
    prix,
  ) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const res = await axios.post(
        `${reservationUrl}/AddReservation`,
        {
          userId: userId,
          voitureId: voitureId,
          datePriseEnCharge: dateDebut,
          dateRemise: dateFin,
          prix: prix,
        },
        config,
      );

      setLoading(false);

      return res.data;
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };

  const deleteReservation = async id => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(
        `${reservationUrl}/DeleteReservation/${id}`,
        config,
      );
      setLoading(false);
      return data;
    } catch (error) {
      toast.error('An error Occured');
      console.log(error);
    }
  };

  const addPayment = async (reservationId, libelle) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${paymentUrl}/Create/`,
        {
          "id": 0,
          "libelle": libelle,
          "reservationId": reservationId,
        },
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
    <reservationContext.Provider
      value={{
        loading,
        getOwnerReservations,
        getReservationsCount,
        getReservations,
        postReservation,
        loading,
        setLoading,
        deleteReservation,
        getUserReservations,
        addPayment
      }}
    >
      {children}
    </reservationContext.Provider>
  );
};
