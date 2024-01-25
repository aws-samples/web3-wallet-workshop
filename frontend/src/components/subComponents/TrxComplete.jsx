import '../../css/main.css'
//import Container from "@cloudscape-design/components/container";
//import Header from "@cloudscape-design/components/header";
import {  useNavigate,useLocation } from 'react-router-dom';
//import Spinner from 'react-bootstrap/Spinner';
//import react, { useEffect } from "react";

export default function Trx() {
  const location = useLocation();
  const navigate = useNavigate();
  const user_name = location.state.user_name;

  
  return (

    <div>
      <div class="mobile_bg">
      <div style={{top:'330px'}} class="complete_icon" ></div>
      <span  style={{top:'330px'}} class="alert-subject">

        Transaction Complete

      </span>
      <div class="Button_position">
        <span class="Button"
        onClick={() => navigate('/wallet',{state:{user_name:user_name}})}
        >Home</span>
      </div>
      
      </div>
    </div>
  );
}
