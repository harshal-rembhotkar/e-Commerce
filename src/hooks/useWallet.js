
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

const useWallet = () => {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if MetaMask is available
  const isMetaMaskAvailable = useCallback(() => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  }, []);

  // Get network name from chain ID
  const getNetworkName = useCallback((chainId) => {
    const networks = {
      1: 'Ethereum Mainnet',
      5: 'Goerli Testnet',
      11155111: 'Sepolia Testnet',
      137: 'Polygon Mainnet',
      80001: 'Mumbai Testnet',
      56: 'BSC Mainnet',
      97: 'BSC Testnet'
    };
    return networks[chainId] || `Chain ID: ${chainId}`;
  }, []);

  // Connect to MetaMask
  const connectWallet = useCallback(async () => {
    if (!isMetaMaskAvailable()) {
      setError('MetaMask not found');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        
        setAccount(accounts[0]);
        setNetwork(getNetworkName(network.chainId));
        setIsConnected(true);
        setError(null);
      }
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
      setError('Failed to connect to MetaMask');
    } finally {
      setIsLoading(false);
    }
  }, [isMetaMaskAvailable, getNetworkName]);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setNetwork(null);
    setIsConnected(false);
    setError(null);
  }, []);

  // Handle account changes
  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
    }
  }, [disconnectWallet]);

  // Handle network changes
  const handleChainChanged = useCallback(async (chainId) => {
    const networkName = getNetworkName(parseInt(chainId, 16));
    setNetwork(networkName);
  }, [getNetworkName]);

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskAvailable()) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          });

          if (accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();
            
            setAccount(accounts[0]);
            setNetwork(getNetworkName(network.chainId));
            setIsConnected(true);
          }
        } catch (err) {
          console.error('Error checking connection:', err);
        }
      }
    };

    checkConnection();
  }, [isMetaMaskAvailable, getNetworkName]);

  // Set up event listeners
  useEffect(() => {
    if (isMetaMaskAvailable()) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [handleAccountsChanged, handleChainChanged, isMetaMaskAvailable]);

  return {
    account,
    network,
    isConnected,
    isLoading,
    error,
    isMetaMaskAvailable: isMetaMaskAvailable(),
    connectWallet,
    disconnectWallet
  };
};

export default useWallet;
