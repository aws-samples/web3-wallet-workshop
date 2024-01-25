import 'bootstrap/dist/css/bootstrap.css';
import './css/App.css';
import { Routes, Route } from 'react-router-dom';
//import WalletRouter from './components/Router';
import NFT from './components/subComponents/NFT';
import Wallet from './components/subComponents/Wallet';
import CustomerList from './components/subComponents/CustomerList';
import TransactionStatus from './components/subComponents/TransactionStatus';
import TransactionStatusDetail from './components/subComponents/TransactionStatusDetail';
import TokenList from './components/subComponents/TokenList';
import Send from './components/subComponents/Send';
import Trx from './components/subComponents/Trx';
import TrxComplete from './components/subComponents/TrxComplete';

function App() {
  return (
    <div className="App">
      {/*
      <WalletRouter />
      */}


      <Routes>
      <Route path="/transactionStatusDetail" element = {<TransactionStatusDetail />} />  
      <Route path="/tokenList" element = {<TokenList />} />  
      <Route path="/transactionStatus" element = {<TransactionStatus />} />
      <Route path="/" element = {<CustomerList />} />
      <Route path="/wallet" element = {<Wallet />} />
      
      <Route path="/nft" element = {<NFT />} />
      <Route path="/send" element = {<Send />} />

      
      <Route path="/trx" element = {<Trx />} />
      <Route path="/trxcomplete" element = {<TrxComplete />} />
      </Routes>
     
    </div>
  );
}

export default App;
