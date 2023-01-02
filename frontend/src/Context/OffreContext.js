import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getUrl } from "../API";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const offreContext = createContext();

export const useOffre = () => {
  const context = useContext(offreContext);
  if (!context) throw new Error("Offre Provider is missing");
  return context;
};

const offreUrl = getUrl("Offres");



export const OffreContextProvider = ({ children }) => {

    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)

    const getOffres = async() => {
         setLoading(true);
                    try {
                    const { data } = await axios.get(`${offreUrl}/GetOffres`)
                    setLoading(false);
                    return data;
                    } catch (error) {
                    toast.error("Something went wrong");
                    console.log(error.response);
                    setLoading(false);
                    }
    }
    

  return (
    <offreContext.Provider
      value={{
        getOffres
      }}
    >
      {children}
    </offreContext.Provider>
  );

};
  
