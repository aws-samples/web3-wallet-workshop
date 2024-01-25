import '../../css/main.css'
//import Container from "@cloudscape-design/components/container";
//import Header from "@cloudscape-design/components/header";
import React from 'react';
//import ReactDOM from 'react-dom/client';
import { useNavigate,useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
//import Web3 from 'web3'

const headers = {
  "Access-Control-Allow-Origin": process.env.REACT_APP_URL,
  "Access-Control-Allow-Credentials":"true"
}; 

function delay() {
  return new Promise(resolve => setTimeout(resolve, 600));
}

export default function TransactionStatusDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const crypto_name = location.state.crypto;
  const crypto_value = location.state.value;
  const user_name = location.state.user_name;
  const address = location.state.address;
  const trx_name = location.state.trx;
  const trx_date = location.state.trx_date;
  const API_ADDR = process.env.REACT_APP_API_ADDR+'/step3/'+crypto_name+'_MAINNET/'+trx_name;

  console.log(API_ADDR);

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const getPosts = async () => {
      const result = await axios.get(
         API_ADDR,{headers}
      );
      console.log("call");
      await delay();
  
      setPosts(result.data);
  
    };
    getPosts();
  }, [API_ADDR]);


  if( posts["transaction"] === undefined){
    console.log("undefined");
  
   }else{
      console.log("defined");
      console.log(posts["transaction"] )

   }


  const from_addr = address;

 

  return (
    <div>
      <div class="mobile_bg">
        <div class="space"></div>
        <div class={"top_user_"+user_name+"_picture"}></div>
        <span class="top_user_name">{user_name}</span>
        <div class="space"></div>
        


        {(() => {
            
            <>
            <span style="hidden"></span>
            </>

            let top = 0;
            if(posts["transaction"] === undefined){
                return null;
            }else{
                <>
   
                </>


                return  <>

                <span style={{top:'125px'}} class="crypto_trxdetail_header">Trx ID </span>
                <span style={{top:'155px'}} class="crypto_trxdetail_value1"> {trx_name}</span>


                <span style={{top:'205px'}} class="crypto_trxdetail_header">Date</span>
                <span style={{top:'235px'}} class="crypto_trxdetail_value1">{trx_date}</span>

                <div style={{top:'280px'}}class="asset_line"></div>

                <span style={{top:'300px'}} class="crypto_trxdetail_header">Address</span>

                <span style={{top:'330px'}} class="crypto_trxdetail_value1">{from_addr}</span>
                {/*

                
                <span style={{top:'360px'}} class="crypto_trxdetail_header">To Address</span>

                <span style={{top:'390px'}} class="crypto_trxdetail_value1">{posts["transaction"]["events"][0]["tokenId"]==='btc' ? posts["transaction"]["events"][0]["to"] : posts["transaction"]["to"]}</span>
               */}      
                <span style={{top:'360px'}} class="crypto_trxdetail_header">{crypto_name==='BITCOIN' ? 'Transaction' : 'Gas'} Fee</span>

                <span style={{top:'390px'}} class="crypto_trxdetail_value1">{crypto_name==='BITCOIN' ? posts["transaction"]["transactionFee"] : posts["transaction"]["effectiveGasPrice"]}</span>
                
                <div style={{top:'425px'}} class="event-list-area">
                { 
                   posts["transaction"]["events"].map((cryptObj,index) =>  <>

                  <div style={{top: top+6+'px'}}  class="crypto_box_event" ></div>
                  <span style={{top:top+10+'px'}} class="event_val" >Event :  {cryptObj["eventType"]}</span>
                  <span style={{top:top+30+'px'}} class="event_val">Amount :  {cryptObj["eventType"]==="ETH_TRANSFER" ? cryptObj["value"] : cryptObj["value"]}  </span>

                  <span style={{top:top+50+'px'}} class="event_val">{crypto_name==='BITCOIN' ? "" : 'From : '+cryptObj["from"]}  </span>

                  <span style={{top:top+70+'px'}} class="event_val">{crypto_name==='BITCOIN' ?  cryptObj["eventType"]==="BITCOIN_VIN"?'To :  '+cryptObj["from"]:"" : 'To :  '+cryptObj["to"]}  </span>
                  
                  
                  <span style={{top:top+90+'px'}} class="event_val">{crypto_name==='BITCOIN' ? "" : 'CA : '+cryptObj["contractAddress"]}  </span>
               
                  
                  
                  <span style={{visibility:'hidden'}}>{top = top + 110}</span>

                  </>
                  )}
                </div>
                </>
                


         
       
            }
        })()}
        
        <div class="Button_position">
            <span  class="Button" onClick={() => navigate('/TransactionStatus',{state:{crypto:crypto_name, value :crypto_value, user_name:user_name,address:address}})}>Back</span>
        </div>

      </div>    
    </div>
  );
}
