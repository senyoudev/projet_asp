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

const authUrl = getUrl('Auth')



export const AuthContextProvider = ({ children }) => {
    
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [userInfo,setUserInfo] = useState({})
    
    
    const login = async(username,password) => {
        setLoading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(
                `${authUrl}/login`,
                { username, password },
                config
            )
            localStorage.setItem('userInfo',JSON.stringify(data))
            return data
        } catch (error) {
            toast.error("An error Occured")
            console.log(error)
        }
    }



    return (
        <authContext.Provider
            value={{
               loading,
               setLoading,
               login
            }}
        >
            {children}
        </authContext.Provider>
    );
};