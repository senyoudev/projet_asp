import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getUrl } from "../API";
import { toast } from "react-toastify";

const reservationContext = createContext();

export const useReservation = () => {
  const context = useContext(reservationContext);
  if (!context) throw new Error("Reservation Provider is missing");
  return context;
};

const reservationUrl = getUrl("Reservations");

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const ReservationContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const getOwnerReservations = async (id,token) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${reservationUrl}/getUserReservations/1`,{
            headers: {'Authorization': 'Bearer token:' + token},
          }
      );
      setLoading(false);
      return data;
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error.response);
      setLoading(false);
    }
  };

  return (
    <reservationContext.Provider value={{getOwnerReservations}}>
      {children}
    </reservationContext.Provider>
  );
};
