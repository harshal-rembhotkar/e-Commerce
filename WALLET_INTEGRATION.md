
# MetaMask Wallet Integration

This application includes MetaMask wallet integration using ethers.js library for seamless Web3 connectivity.

## Features

- **Connect/Disconnect**: Users can connect and disconnect their MetaMask wallet with a single click
- **Account Management**: Automatically detects and displays the connected wallet address
- **Network Detection**: Shows the current network name (Ethereum, Polygon, BSC, etc.)
- **Auto-Updates**: Automatically updates when users switch accounts or networks
- **Transaction Handling**: Complete transaction lifecycle management with status updates
- **Error Handling**: Provides clear feedback for connection issues and missing MetaMask

## Implementation

### Custom Hook - `useWallet.js`
The `useWallet` hook manages all wallet-related state and operations:

```javascript
const {
  account,        // Connected wallet address
  network,        // Current network name
  isConnected,    // Connection status
  isLoading,      // Loading state during connection
  error,          // Error messages
  isMetaMaskAvailable, // MetaMask availability
  connectWallet,  // Connect function
  disconnectWallet // Disconnect function
} = useWallet();
```

### Custom Hook - `useTransactions.js`
The `useTransactions` hook manages transaction lifecycle:

```javascript
const {
  isTransacting,      // Transaction in progress
  transactionHash,    // Current transaction hash
  transactionStatus,  // 'pending', 'confirmed', 'failed'
  transactionError,   // Error messages
  sendTransaction,    // Send transaction function
  resetTransaction,   // Reset transaction state
  getTransactionUrl   // Get blockchain explorer URL
} = useTransactions();
```

### Components
- **`WalletConnectButton.jsx`**: Connection interface with status display
- **`TransactionStatus.jsx`**: Real-time transaction status with blockchain explorer links

### Network Change Detection
The wallet integration automatically syncs UI with wallet state through:

1. **Event Listeners**: `accountsChanged` and `chainChanged` events from MetaMask
2. **State Synchronization**: Automatic UI updates when:
   - User switches accounts in MetaMask
   - User switches networks in MetaMask
   - Connection status changes
3. **Real-time Updates**: No page refresh required for wallet state changes

### Transaction Lifecycle
1. **Initiation**: User triggers transaction
2. **Pending**: Transaction submitted to blockchain
3. **Confirmation**: Transaction confirmed on blockchain
4. **Status Display**: Real-time updates with explorer links
5. **Error Handling**: User-friendly error messages for failed transactions

### Supported Networks
- Ethereum Mainnet
- Goerli Testnet
- Sepolia Testnet
- Polygon Mainnet
- Mumbai Testnet (Polygon)
- BSC Mainnet
- BSC Testnet

## Usage

1. **Access Wallet**: Navigate to `/wallet` route or click the "Wallet" link in the navbar
2. **Connect**: Click "Connect MetaMask" button
3. **Approve**: Approve the connection in MetaMask popup
4. **View Status**: See your wallet address and network information
5. **Auto-Updates**: The UI automatically updates when you switch accounts or networks in MetaMask
6. **Transactions**: Send transactions and monitor their status in real-time

## Error Handling

The integration handles various scenarios:
- MetaMask not installed: Shows installation prompt
- Connection rejected: Displays error message
- Network switches: Updates network information automatically
- Account changes: Updates connected account automatically
- Transaction failures: Shows specific error messages with retry options

## Technical Details

- **Library**: ethers.js v5
- **Provider**: Web3Provider from MetaMask
- **Event Listeners**: Handles `accountsChanged` and `chainChanged` events
- **State Management**: React hooks for local state management
- **Transaction Monitoring**: Real-time status updates with blockchain confirmation
- **Responsive**: Mobile-friendly design with Bootstrap classes

Access the wallet integration at `/wallet` route in your application.
