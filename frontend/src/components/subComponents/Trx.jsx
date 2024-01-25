import '../../css/main.css'
//import Container from "@cloudscape-design/components/container";
//import Header from "@cloudscape-design/components/header";
import { useNavigate,useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import  { useEffect } from "react";

export default function Trx() {
  const location = useLocation();
  const navigate = useNavigate();
  const user_name = location.state.user_name;

  useEffect(() => {
    const timer = setTimeout(() => navigate('/TrxComplete',{state:{user_name:user_name}}), 3000);
  }, []);

  return (

    <div>
      <div class="mobile_bg">
        <div style={{top:'300px'}} class = "alert_box"> </div>  
         <span  style={{top:'330px'}} class="alert-subject">
            <Spinner  animation="border" role="status"
            
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner> 
            &nbsp;
            Transaction Submit 

          </span>
        </div>
    </div>
  );
}
