import '../../css/App.css';
import '@aws-amplify/ui-react/styles.css';

import "@aws-amplify/ui-react/styles.css";
import {
  GenAddress 
 } from '../../ui-components';
import { Navigate, useNavigate } from 'react-router-dom';


function GenAddressScreen() {
  const navigate = useNavigate();
  const goWalletMain = () => {
    alert('11');
    navigate('/WalletMain');
  };
  return (
    <GenAddress
      onSubmit={fields => { /* Handle form submission */}}
    />
  );
}



export default GenAddressScreen;
