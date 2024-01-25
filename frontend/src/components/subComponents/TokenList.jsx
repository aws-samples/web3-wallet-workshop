import '../../css/main.css'
//import Container from "@cloudscape-design/components/container";
//import Header from "@cloudscape-design/components/header";
import { useNavigate, useLocation } from 'react-router-dom';
//import trxlist from '../jsonsample/satoshitrxlist.json';
import { useState, useEffect } from "react";
import axios from "axios";
//import Web3 from 'web3'

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
  //const crypto_symbol = crypto_name ==='BITCOIN' ? 'BTC' : 'ETH';



  console.log("preToken=="+preToken);

  console.log("nextToken=="+nextToken);

  //const API_ADDR = process.env.REACT_APP_API_ADDR+'/step1/'+crypto_name+'_MAINNET/'+address+"?nextToken="+ nextToken;
  const API_ADDR = process.env.REACT_APP_API_ADDR+'/step4/'+address+"?nextToken="+ nextToken;


  useEffect(() => {
  //  if(nextToken === undefined){
  //    setAddress(location.state.address);
  //}else{
  //    setAddress(location.state.address+"?nextToken="+nextToken)
  //}

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


  if( posts["tokenBalances"] === undefined){
    console.log("undefined");
  
   }else{
      console.log("defined");
      console.log(posts["tokenBalances"] )

   }

  return (
    <div>
      <div class="mobile_bg">
        <div class="space"></div>
        <div class={"top_user_"+user_name+"_picture"}></div>
        <span class="top_user_name">{user_name}</span>
        <div class="space"></div>

        <span style={{top:'112px'}} class="list-subject">Tokens</span>
        <div style={{top:'135px'}} class="token-list-area">
        {(() => {
            
            <>
            <span style="hidden"></span>
            </>

            let top = 0;
            if(posts["tokenBalances"] === undefined){
                return null;
            }else{
                return posts["tokenBalances"].map((cryptObj,index) => <>
                      
                      <div style={{top: top+6+'px'}}  class="crypto_box" ></div>
                      <span style={{top:top+15+'px'}} class="token_val">ContractAddress : {cryptObj["tokenIdentifier"]["contractAddress"]}</span>
                      <span style={{top:top+40+'px'}} class="token_val">Token Id : {cryptObj["tokenIdentifier"]["tokenId"]}</span>
                      <span style={{top:top+78+'px'}} class="token_val">Balance : {cryptObj["tokenIdentifier"]["tokenId"]==="eth" ? cryptObj["balance"]: cryptObj["balance"]}</span>
                      <div style={{top: top+23+'px'}} class={cryptObj["tokenIdentifier"]["tokenId"]==="eth"?"ETHEREUM":cryptObj["tokenIdentifier"]["tokenId"]==null?"ERC20":"NFT"}></div>

                      <span style={{visibility:'hidden'}}>{top = top + 110}</span>
         
            </>)
            }
        })()}
        </div>
      </div>

          <div class="Button_position">
            <span class="Button" onClick={() => navigate('/TransactionStatus',{state:{crypto:crypto_name, value :crypto_value, user_name:user_name,address:address}})} >Back</span>

           
          </div>

          <div class="Button_pretoken_position">
            <span class="Button" onClick={() => (preToken==="" && nextToken==="" )? alert('First Page !!') : navigate('/TokenList',{state:{crypto:crypto_name, value :crypto_value,user_name:user_name,address:address,nextToken:preToken}})} >Previous</span>
          </div>

          <div class="Button_nexttoken_position">
          <span class="Button" onClick={() => (posts["nextToken"]=== undefined)? alert('Last Page !!') : navigate('/TokenList',{state:{crypto:crypto_name, value :crypto_value,user_name:user_name,address:address,preToken:nextToken,nextToken:posts["nextToken"]}})} >Next</span>
          </div>

        </div>    
    
  );
}
