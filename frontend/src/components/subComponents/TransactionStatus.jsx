import '../../css/main.css'
//import Container from "@cloudscape-design/components/container";
//import Header from "@cloudscape-design/components/header";
import { useNavigate, useLocation } from 'react-router-dom';
//import trxlist from '../jsonsample/satoshitrxlist.json';
import { useState, useEffect } from "react";
import axios from "axios";

const headers = {
  "Access-Control-Allow-Origin": process.env.REACT_APP_URL,
  "Access-Control-Allow-Credentials":"true"
}; 

function delay() {
  return new Promise(resolve => setTimeout(resolve, 300));
}


export default function TransactionStatus() {

  const [posts, setPosts] = useState([]);
  //const [address, setAddress] = useState([]);


  const navigate = useNavigate();
  const location = useLocation();
  const crypto_name = location.state.crypto;
  const crypto_value = location.state.value;
  const user_name = location.state.user_name;
  const address = location.state.address;
  const nextToken = location.state.nextToken === undefined ? "" : location.state.nextToken;
  const preToken = location.state.preToken === undefined ? "" : location.state.preToken;
  const crypto_symbol = crypto_name ==='BITCOIN' ? 'BTC' : 'ETH';

  console.log("preToken=="+preToken);

  console.log("nextToken=="+nextToken);

  const API_ADDR = process.env.REACT_APP_API_ADDR+'/step2/'+crypto_name+'_MAINNET/'+address+"?nextToken="+ nextToken;


  function tokenList(){

      navigate('/TokenList',{state:{crypto:crypto_name, value :crypto_value,user_name:user_name,address:address}})
    
  }



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


  if( posts["transactions"] === undefined){
    console.log("undefined");
  
   }else{
      console.log("defined");
      console.log(posts["transactions"] )

   }

  return (
    <div>
      <div class="mobile_bg">
        <div class="space"></div>
        <div class={"top_user_"+user_name+"_picture"}></div>
        <span class="top_user_name">{user_name}</span>
        <div class="space"></div>

        <div style={{top:'112px'}}  class="crypto_box" onClick={() => navigate('/TransactionStatus',{state:{crypto:crypto_name, value :crypto_value ,user_name:user_name}})}></div>
        <span style={{top:'133px'}} class="crypto_name">{crypto_name}</span>
        <span style={{top:'173px'}} class="crypto_val">{crypto_value}&nbsp;{crypto_symbol}</span>
        <div style={{top:'133px'}} class={crypto_name}></div>

        <div style={{top:'216px'}} class="asset_line"></div>
        <div style={{top:'220px'}} class="list-area">
        {(() => {
            
            <>
            <span style="hidden"></span>
            </>

            let top = 0;
            if(posts["transactions"] === undefined){
                return null;
            }else{
                return posts["transactions"].map((cryptObj,index) => <>
                      
                      <div style={{top: top+6+'px'}}  class="crypto_box_list" onClick={() => navigate('/TransactionStatusDetail',{state:{crypto:crypto_name, value :crypto_value,trx:cryptObj["transactionHash"], trx_date:cryptObj["transactionTimestamp"],user_name:user_name,address:address}})}></div>
                      <span style={{top:top+15+'px'}} class="crypto_trx" onClick={() => navigate('/TransactionStatusDetail',{state:{crypto:crypto_name, value :crypto_value,trx:cryptObj["transactionHash"], trx_date:cryptObj["transactionTimestamp"],user_name:user_name,address:address}})}>{cryptObj["transactionHash"]}</span>
                      {/*
                      <span style={{top:top+72+'px',color: trx_val_list[index]>=0 ? 'blue' : 'red' }} class="crypto_trxval">{trx_val_list[index]}&nbsp;{crypto_symbol} </span>
                      */}
                      <span style={{top:top+72+'px'}} class="crypto_trxdate" onClick={() => navigate('/TransactionStatusDetail',{state:{crypto:crypto_name, value :crypto_value,trx:cryptObj["transactionHash"], trx_date:cryptObj["transactionTimestamp"],user_name:user_name,address:address}})}>{cryptObj["transactionTimestamp"]}</span>

                      <span style={{visibility:'hidden'}}>{top = top + 110}</span>
         
            </>)
            }
        })()}

        </div>

          <div class="Button_position">
            <span class="Button" onClick={() => navigate('/wallet',{state:{user_name:user_name}})} >Back</span>
          </div>

          {(() => {
            //console.log(crypto_name);
          if(crypto_name==='ETHEREUM'){
            return(<>
            <div class="Button_position1">
              <span class="Button" onClick={() => tokenList()} >Tokens</span>
          </div>          
            </>);
          }
          
          })()}

        
          <div class="Button_pretoken_position">
            <span class="Button" onClick={() => (preToken==="" && nextToken==="" )? alert('First Page !!') : navigate('/TransactionStatus',{state:{crypto:crypto_name, value :crypto_value,user_name:user_name,address:address,nextToken:preToken}})} >Previous</span>
          </div>

          <div class="Button_nexttoken_position">
          <span class="Button" onClick={() => (posts["nextToken"]=== undefined)? alert('Last Page !!') : navigate('/TransactionStatus',{state:{crypto:crypto_name, value :crypto_value,user_name:user_name,address:address,preToken:nextToken,nextToken:posts["nextToken"]}})} >Next</span>
          </div>

        </div>    
    </div>
  );
}
