import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getUrl } from '../API'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("Auth Provider is missing");
    return context;
};





export const AuthContextProvider = ({ children }) => {

    const navigate = useNavigate()

    



    return (
        <authContext.Provider
            value={{
               
            }}
        >
            {children}
        </authContext.Provider>
    );
};