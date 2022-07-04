import React from "react";
import { NoWalletDetected } from "./NoWalletDetected";
import { ConnectWallet } from "./ConnectWallet";
import CreateDao from "./CreateDao";
import CreateToken from "./CreateToken";
import CreateTimeLock from "./CreateTimelock";

import {createNewTimeLock,createNewToken,createNewDao} from '../util/minimalProxyInteractor';
//======================================================================
// This is the Hardhat Network id, you might change it in the hardhat.config.js.
// If you are using MetaMask, be sure to change the Network id to 1337.
// Here's a list of network ids https://docs.metamask.io/guide/ethereum-provider.html#properties
// to use when deploying to other networks.
const HARDHAT_NETWORK_ID = '4';
// const GANACHE_NETWORK_ID = '31337';
// This is an error code that indicates that the user canceled a transaction
// const ERROR_CODE_TX_REJECTED_BY_USER = 4001;
//======================================================================
// Application begins below here
//======================================================================
export class Dapp extends React.Component {
  constructor(props) {
    super(props);

    // We store multiple things in Dapp's state.
    // You don't need to follow this pattern, but it's an useful example.
    this.initialState = {
      // The stored tokenData from the form 
      tokenData: undefined,
      // The stored timeLockData from the form
      timeLockData: undefined,
      // The stored daoData from the form
      daoData: undefined,
      // The user's address and balance
      selectedAddress: undefined,
      balance: undefined,
      // The ID about transactions being sent, and any possible error with them
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
    };

    this.state = this.initialState;
  }

  render() {
    // Ethereum wallets inject the window.ethereum object. If it hasn't been
    // injected, we instruct the user to install MetaMask.
    if (window.ethereum === undefined) {
      return <NoWalletDetected />;
    }

    //======================================================================
    // Wallet Button Renders First
    //======================================================================
    if (!this.state.selectedAddress) {
      return (
        <ConnectWallet 
          connectWallet={() => this._connectWallet()} 
          networkError={this.state.networkError}
          dismiss={() => this._dismissNetworkError()}
        />
      );
    }
  
    //======================================================================
    // If everything is loaded, we render the Form.
    //======================================================================
    return (
      <div className="container p-4">
        <h1>Interface for the ProxyFactory</h1>
        <hr />
        <h2>Create a Token</h2>
        <hr />
        <div className="row">
          <div className="col-12">
            {(
              <CreateToken 
                tokenData={(tokenName,tokenSymbol,userAddress) => createNewToken({tokenName,tokenSymbol,userAddress})}
              />
            )}
          </div>
        </div>
        
        <h2>Create TimeLock</h2>
        <hr />
        <div className="row">
          <div className="col-12">
            {(
              <CreateTimeLock 
                timeLockData={(userAddress,delay) => createNewTimeLock({userAddress,delay})}
              />
            )}
          </div>
        </div>
        
        <h2>Build your own DAO!</h2>
        <hr />
        <div className="row">
          <div className="col-12">
           {(
            <CreateDao
              daoData={(timeLockAddress,tokenAddress,guardianAddress) => createNewDao({timeLockAddress,tokenAddress,guardianAddress})}
            />
           )}
          </div>
        </div>
      </div>
    );
  }
  
  //======================================================================
  // Wallet Connector
  //======================================================================
  async _connectWallet() {
    // This method is run when the user clicks the Connect. It connects the
    // dapp to the user's wallet, and initializes it.

    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Once we have the address, we can initialize the application.

    // First we check the network
    if (!this._checkNetwork()) {
      return;
    }

    this._initialize(selectedAddress);

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state 
      if (newAddress === undefined) {
        return this._resetState();
      }
      
      this._initialize(newAddress);
    });
    
    // We reset the dapp state if the network is changed
    window.ethereum.on("chainChanged", ([networkId]) => {
      this._resetState();
    });
  }
  
  //======================================================================
  // We initialize our provider, signer and create our contract instance below
  //======================================================================
  _initialize(userAddress) {
    // This method initializes the dapp

    // We first store the user's address in the component's state
    this.setState({
      selectedAddress: userAddress,
    });

    // Then, we initialize ethers,
    this._initEther();
  }
  // Keep this below and above where it is called
  _initEther(){
    // We first initialize ethers by creating a provider using window.ethereum
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner(0);
    // Then, we initialize the contract using that provider and the token's
    // artifact. You can do this same thing with your contracts.
    // this._minimalProxy = new ethers.Contract(
    //   proxyFactoryAddress,
    //   minimalProxyArtifact,
    //   signer
    // );
    // return this._minimalProxy;
  }

  // This method just clears part of the state.
  _dismissTransactionError() {
    this.setState({ transactionError: undefined });
  }

  // This method just clears part of the state.
  _dismissNetworkError() {
    this.setState({ networkError: undefined });
  }

  // This is an utility method that turns an RPC error into a human readable
  // message.
  _getRpcErrorMessage(error) {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  }

  // This method resets the state
  _resetState() {
    this.setState(this.initialState);
  }

  // This method checks if Metamask selected network is Localhost:8545 
  _checkNetwork() {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }

    this.setState({ 
      networkError: 'Please connect Metamask to Rinkeby'
    });

    return false;
  }
}
