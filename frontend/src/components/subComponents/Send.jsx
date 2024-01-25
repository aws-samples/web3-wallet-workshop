import '../../css/main.css'
//import Container from "@cloudscape-design/components/container";
//import Header from "@cloudscape-design/components/header";
import { useNavigate, useLocation } from 'react-router-dom';
//import Spinner from 'react-bootstrap/Spinner';
import React, { useState } from 'react';


export default function CustomerList() {

  const location = useLocation();
  const crypto_symbol = location.state.symbol;
  const crypto_value = location.state.value;
  const user_name = location.state.user_name;
  const selectList = crypto_symbol;

  const to_list = ['Jessy','Peccy','FinPeccy'];

  for(let i=0;i<to_list.length;i++){

    if(to_list[i]===user_name){
      to_list.splice(i,1);
      i--;
    }
  }

  
  

  const navigate = useNavigate();
  const [Selected, setSelected] = useState("");
  const [ReceiverSelected, setReceiverSelected] = useState("");
  const [value, setNumber] = useState('');
  const [crypto_balance, setBalance] = useState(crypto_value[0]);
  const [to_user_area, setTouserarea] = useState(<>
    <div style={{top:'276px'}}  class="customer_box"></div>
    <span style={{top:'307px'}} class="customer_name">{to_list[0]}</span>
    <div style={{top:'297px'}} class={to_list[0]}></div>  
    </>)


  //const crypto_balance = crypto_value[0]; // 초기는 BTC가 default

  const crypto_fee = crypto_balance * 0.01 // 임의로 1%로 우선 정함

  const handleSelect = (e) => {
    setSelected(e.target.value);
    setBalance(crypto_balance=> e.target.value ==='BTC' ? crypto_value[0] : crypto_value[1]);
  };

  const handleReceiverSelect = (e) => {
    setReceiverSelected(e.target.value);
    //alert(e.target.value);
    //setBalance(crypto_balance=> e.target.value =='BTC' ? crypto_value[0] : crypto_value[1]);

    setTouserarea(<>
      <div style={{top:'276px'}}  class="customer_box"></div>
      <span style={{top:'307px'}} class="customer_name">{e.target.value}</span>
      <div style={{top:'297px'}} class={e.target.value}></div>  
      </>)

  };

  

  const handleChange = (e) => {
    let input = e.target.value

    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
      //if ( (crypto_balance-input) > 0 ){
        setNumber(input);
        setBalance(( Selected ==='BTC' ? crypto_value[0] : crypto_value[1])-input);

  };

  const submitSendTrx = () => {
    if(value===""){
      alert('Please input send amount') 
    }else if(crypto_balance >0){
      navigate('/Trx',{state:{user_name:user_name}})
    //alert('Transaction');
    }else{
      alert('Exceed Balance')
    }

    
  };


  return (
    <div>
      <div class="mobile_bg">


        <span style={{top:'32px'}} class="list-subject">Send Token</span>
        <span style={{top:'72px'}} class="list-subject">From</span>
        <div style={{top:'112px'}}  class="customer_box"></div>
        <span style={{top:'143px'}} class="customer_name">{user_name}</span>
        <div style={{top:'133px'}} class={user_name}></div>

        <span style={{top:'236px'}} class="list-subject">To &nbsp;
          <select  onChange={handleReceiverSelect} value={ReceiverSelected}>
              {to_list.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
        
        </span>
        {to_user_area}

        <span style={{top:'400px'}} class="list-subject">Amount &nbsp;
            <select  onChange={handleSelect} value={Selected}>
              {selectList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
        </span>

        <span style={{top:'440px'}} class="list-subject">
          <input style ={{width:'440px'}}
              type="text"
              placeholder="Your fav number"
              value={value}
              onChange={handleChange}
            />
           
        </span>

        <span style={{top:'490px'}} class="crypto_trxdetail_header">Balance :  </span>
        <span style={{top:'495px'}} class="crypto_trxdetail_value">{crypto_balance}</span>

        <span style={{top:'520px'}} class="crypto_trxdetail_header">fee(gas) :  </span>
        <span style={{top:'525px'}} class="crypto_trxdetail_value">{crypto_fee}</span>
        
        <div class="Button_position1">
            <span class="Button"
            onClick={() => submitSendTrx()}
            >Send</span>
        </div>


        <div class="Button_position">
            <span class="Button" onClick={() => navigate('/wallet',{state:{user_name:user_name}})} >Back</span>
        </div>

        {/* 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        */}
        </div>    
    </div>
  );
}
