
import React from 'react';
import { WalletConnectButton, TransactionStatus } from './components';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">
                  <i className="fas fa-wallet me-2"></i>
                  MetaMask Wallet Connection
                </h4>
              </div>
              <div className="card-body">
                <WalletConnectButton />
                <TransactionStatus />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
