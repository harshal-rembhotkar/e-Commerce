
import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import useWallet from './useWallet';

const useTransactions = () => {
  const { account, isConnected } = useWallet();
  const [isTransacting, setIsTransacting] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null); // 'pending', 'confirmed', 'failed'
  const [transactionError, setTransactionError] = useState(null);

  const resetTransaction = useCallback(() => {
    setIsTransacting(false);
    setTransactionHash(null);
    setTransactionStatus(null);
    setTransactionError(null);
  }, []);

  const sendTransaction = useCallback(async (transactionConfig) => {
    if (!isConnected || !account) {
      setTransactionError('Wallet not connected');
      return null;
    }

    setIsTransacting(true);
    setTransactionError(null);
    setTransactionStatus(null);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Send transaction
      const transaction = await signer.sendTransaction(transactionConfig);
      setTransactionHash(transaction.hash);
      setTransactionStatus('pending');

      // Wait for confirmation
      const receipt = await transaction.wait();
      
      if (receipt.status === 1) {
        setTransactionStatus('confirmed');
      } else {
        setTransactionStatus('failed');
        setTransactionError('Transaction failed');
      }

      return receipt;
    } catch (error) {
      console.error('Transaction error:', error);
      setTransactionStatus('failed');
      
      if (error.code === 4001) {
        setTransactionError('Transaction rejected by user');
      } else if (error.code === -32603) {
        setTransactionError('Internal error occurred');
      } else {
        setTransactionError(error.message || 'Transaction failed');
      }
      
      return null;
    } finally {
      setIsTransacting(false);
    }
  }, [isConnected, account]);

  const getTransactionUrl = useCallback((hash, chainId = 1) => {
    const explorers = {
      1: 'https://etherscan.io',
      5: 'https://goerli.etherscan.io',
      11155111: 'https://sepolia.etherscan.io',
      137: 'https://polygonscan.com',
      80001: 'https://mumbai.polygonscan.com',
      56: 'https://bscscan.com',
      97: 'https://testnet.bscscan.com'
    };
    
    const baseUrl = explorers[chainId] || explorers[1];
    return `${baseUrl}/tx/${hash}`;
  }, []);

  return {
    isTransacting,
    transactionHash,
    transactionStatus,
    transactionError,
    sendTransaction,
    resetTransaction,
    getTransactionUrl
  };
};

export default useTransactions;
