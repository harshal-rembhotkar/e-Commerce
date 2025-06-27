
import React from 'react';
import useTransactions from '../hooks/useTransactions';

const TransactionStatus = () => {
  const {
    isTransacting,
    transactionHash,
    transactionStatus,
    transactionError,
    resetTransaction,
    getTransactionUrl
  } = useTransactions();

  if (!isTransacting && !transactionHash && !transactionError) {
    return null;
  }

  const getStatusIcon = () => {
    switch (transactionStatus) {
      case 'pending':
        return <i className="fas fa-spinner fa-spin text-warning"></i>;
      case 'confirmed':
        return <i className="fas fa-check-circle text-success"></i>;
      case 'failed':
        return <i className="fas fa-times-circle text-danger"></i>;
      default:
        return <i className="fas fa-clock text-muted"></i>;
    }
  };

  const getStatusMessage = () => {
    if (transactionError) return transactionError;
    
    switch (transactionStatus) {
      case 'pending':
        return 'Transaction pending...';
      case 'confirmed':
        return 'Transaction confirmed!';
      case 'failed':
        return 'Transaction failed';
      default:
        return 'Processing transaction...';
    }
  };

  return (
    <div className="transaction-status-container mt-3">
      <div className={`alert ${
        transactionError ? 'alert-danger' : 
        transactionStatus === 'confirmed' ? 'alert-success' : 
        transactionStatus === 'failed' ? 'alert-danger' : 
        'alert-info'
      }`}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {getStatusIcon()}
            <span className="ms-2">{getStatusMessage()}</span>
          </div>
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={resetTransaction}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        {transactionHash && (
          <div className="mt-2">
            <small className="text-muted">
              Transaction Hash: 
              <a 
                href={getTransactionUrl(transactionHash)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ms-1"
              >
                {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
                <i className="fas fa-external-link-alt ms-1"></i>
              </a>
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionStatus;
