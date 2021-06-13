import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { store } from "./store/configureStore";
import ConnectWallet from "./components/connectWallet"


function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <ConnectWallet/>
        </header>
      </div>
    </Provider>
  );
}

export default App;
