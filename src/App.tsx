import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Button } from 'decentraland-ui';
import { ethers } from "ethers";
import { store } from "./store/configureStore";

function App() {

  const test = () => {
    alert('Hello World');
  }

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Button onClick={test}>Connect</Button>
        </header>
      </div>
    </Provider>
  );
}

export default App;
