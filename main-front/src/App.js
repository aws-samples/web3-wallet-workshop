import './App.css';
import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');


  const onChange = (e) => {
    setText(e.target.value);
    //alert(e.target.value);
  };

  const onPopup =() =>{
    const width = 600;
    const height = 900;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    if(text===""){
      alert("please input wallet url")
    }else{
      alert(text);

      const popup = window.open(text, "web3 wallet", `width=${width},height=${height},left=${left},top=${top}`);
    }
    

  }

  return (
    <div>
      <header className="App-header-white">
          <font color = "black"> Web3 Wallet Workshop </font>
        <p>
          <span style={{top:'400px'}} >
          <input style ={{width:'400px'}}
              type="text"
              placeholder="Input wallet url"
              onChange={onChange} value={text} 
          />
        </span>
        </p>
        <div class="Button_position">
            <span class="Button"
            onClick={onPopup}
            >  Click
            </span>
        </div>
      </header>
    </div>
  );
}

export default App;
