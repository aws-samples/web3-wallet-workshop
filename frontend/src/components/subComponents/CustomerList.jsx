import '../../css/main.css'
//import Container from "@cloudscape-design/components/container";
//import Header from "@cloudscape-design/components/header";
import { useNavigate } from 'react-router-dom';
//import { useState} from 'react';

export default function CustomerList() {
  const navigate = useNavigate();

  //const hasWindow = typeof window !== 'undefined';
  //const [widthsize, setWidthsize] = useState();
  //const [width, setWidth] = useState(hasWindow ? window.innerWidth : null);
  


  //setWidthsize(3000)

  return (
    <div>
      <div class="mobile_bg">


        <span style={{top:'172px'}} class="list-subject">Customer-List</span>
        <div style={{top:'202px'}}class="asset_line"></div>
        <div style={{top:'212px'}}  class="customer_box"
        onClick={() => navigate('/wallet',{state:{user_name:'Sean'}})}
        ></div>
        <span style={{top:'243px'}} class="customer_name"
        onClick={() => navigate('/wallet',{state:{user_name:'Sean'}})}
        >Sean</span>
        <div style={{top:'233px'}} class="Sean"
        onClick={() => navigate('/wallet',{state:{user_name:'Sean'}})}
        ></div>

        <div style={{top:'316px'}}class="asset_line"></div>
        <div style={{top:'326px'}}  class="customer_box"
        onClick={() => navigate('/wallet',{state:{user_name:'Victory'}})}
        ></div>
        <span style={{top:'357px'}} class="customer_name"
        onClick={() => navigate('/wallet',{state:{user_name:'Victory'}})}
        >Victory</span>
        <div style={{top:'347px'}} class="Victory"
        onClick={() => navigate('/wallet',{state:{user_name:'Victory'}})}
        ></div>  

        <div style={{top:'430px'}}class="asset_line"></div>
        <div style={{top:'440px'}}  class="customer_box"
        onClick={() => navigate('/wallet',{state:{user_name:'Peter'}})}
        ></div>
        <span style={{top:'471px'}} class="customer_name"
        onClick={() => navigate('/wallet',{state:{user_name:'Peter'}})}
        >Peter</span>
        <div style={{top:'461px'}} class="Peter"
        onClick={() => navigate('/wallet',{state:{user_name:'Peter'}})}
        ></div> 


        </div>    
    </div>
  );
}
