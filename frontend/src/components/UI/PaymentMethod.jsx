

import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../assets/css/payment-method.css";
import  { useReservation  } from "../../Context/ReservationContext"
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const PaymentMethod = (car) => {
  const navigate = useNavigate('')
  const { postReservation, loading, setLoading } = useReservation('')
const user =JSON.parse(localStorage.getItem('userInfo'));
const data ={
  userId:user.id,
  voitureId:car.car['id'],
  dateRemise:localStorage.getItem('dateRemise'),
  prix:car.car['prix'],
}

 const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
 





  const [methode,setMethode]=useState(" ");
  let radios = document.getElementsByName('pay');
  const selectedValue=""
  
  const Reserver=()=>{
    localStorage.setItem('methode', methode);
    // const r=localStorage.getItem('methode');
    const fetchData = async () => {
      setLoading(true);
         const clients = await postReservation(data)
         setLoading(false);
         console.log("clenit")
         console.log(clients)
         
       }
    
     useEffect(()=> {
        
       if(userInfo != null) {
         fetchData()
         setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
       } else {
         return navigate('/login')
       }
     },[localStorage.getItem('userInfo')])
    
   
  }
  
  return (
    <>
      <div className="payment">
        
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" name="pay" value={"Direct Bank Transfer"}   onChange={e => setMethode(e.target.value)}/> Direct Bank Transfer
        </label>
      </div>

      <div className="payment mt-3">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio"  name="pay" value={"Cheque Payment"} onChange={e => setMethode(e.target.value)}/> Cheque Payment
        </label>
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio"  name="pay" value={"Master Card"} onChange={e => setMethode(e.target.value)}/> Master Card
        </label>

        <img src={masterCard} alt="" />
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" name="pay" value={"Paypal"}  onChange={e => setMethode(e.target.value)}/> Paypal
        </label>

        <img src={paypal} alt="" />
      </div>
      <div className="payment text-end mt-5">
        <button  onClick={()=>Reserver()}>Reserve Now</button>
        <button >Payer</button>
      </div>
    </>
  );
};

export default PaymentMethod;
