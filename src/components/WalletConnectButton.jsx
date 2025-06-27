
import React from 'react';
import useWallet from '../hooks/useWallet';

const WalletConnectButton = () => {
  const {
    account,
    network,
    isConnected,
    isLoading,
    error,
    isMetaMaskAvailable,
    connectWallet,
    disconnectWallet
  } = useWallet();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusMessage = () => {
    if (!isMetaMaskAvailable) return 'MetaMask not found';
    if (error) return error;
    if (isConnected && account) return `Connected to ${formatAddress(account)}`;
    return 'Disconnected';
  };

  const getNetworkMessage = () => {
    if (isConnected && network) return `Network: ${network}`;
    return '';
  };

  return (
    <div className="wallet-connect-container">
      <div className="wallet-status mb-3">
        <div className={`status-message ${isConnected ? 'text-success' : error ? 'text-danger' : 'text-muted'}`}>
          {getStatusMessage()}
        </div>
        {getNetworkMessage() && (
          <div className="network-message text-info small">
            {getNetworkMessage()}
          </div>
        )}
      </div>

      <div className="wallet-actions">
        {!isConnected ? (
          <button
            className="btn btn-primary"
            onClick={connectWallet}
            disabled={isLoading || !isMetaMaskAvailable}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Connecting...
              </>
            ) : (
              'Connect MetaMask'
            )}
          </button>
        ) : (
          <div className="connected-actions">
            <button
              className="btn btn-outline-secondary me-2"
              onClick={disconnectWallet}
            >
              Disconnect
            </button>
            <button
              className="btn btn-success"
              disabled
            >
              <i className="fas fa-check me-1"></i>
              Connected
            </button>
          </div>
        )}
      </div>

      {!isMetaMaskAvailable && (
        <div className="alert alert-warning mt-3" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Please install MetaMask to connect your wallet.
        </div>
      )}
    </div>
  );
};

export default WalletConnectButton;
