import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getUrl } from "../API";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const carContext = createContext();

export const useCar = () => {
  const context = useContext(carContext);
  if (!context) throw new Error("Car Provider is missing");
  return context;
};

const carUrl = getUrl("Cars");



export const CarContextProvider = ({ children }) => {
<<<<<<< HEAD
    
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)

      const getCarsCount = async() => {
        setLoading(true)
            try {
                const { data } = await axios.get(`${carUrl}/GetVoituresCount/count`);
                setLoading(false)
                return data  
            } catch (error) {
                toast.error("Something went wrong")
                console.log(error)
                setLoading(false)
            }
         }
    
      const getOwnerCarsNumber = async(id) => {
        setLoading(true)
            try {
                const { data } = await axios.get(`${carUrl}/countByUser`,{id});
                setLoading(false)
                return data  
            } catch (error) {
                toast.error("Something went wrong")
                console.log(error.response)
                setLoading(false)
            }
=======
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getOwnerCars = async () => {
    try {
      const { data } = await axios.get(`${carUrl}/GetVoituresByUser/ByUser?userId=1`);
      setLoading(false);
      return data
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
      setLoading(false);
    }
  };
  const getOwnerCarsNumber = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${carUrl}/countByUser`, { id });
      setLoading(false);
      return data;
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error.response);
      setLoading(false);
>>>>>>> origin/main
    }
    
   


    return (
        <carContext.Provider
            value={{
                loading,
              getCarsCount,
              getOwnerCarsNumber
            }}
        >
            {children}
        </carContext.Provider>
    );
};
