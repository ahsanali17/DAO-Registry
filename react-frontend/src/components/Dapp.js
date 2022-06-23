import React from "react";

import { ethers, providers } from "ethers";
import { NoWalletDetected } from "./NoWalletDetected";
import { ConnectWallet } from "./ConnectWallet";
import CreateDao from "./CreateDao";

//======================================================================
// import TokenArtifact from "../contracts/Token.json";
// import contractAddress from "../contracts/contract-address.json";

// We will retrieve our deployed Proxy Contract ABI and address:
// import contractJSON from './utils/proxyFactoryContract';
// const proxyFactoryAddress = '';
//======================================================================

// This is the Hardhat Network id, you might change it in the hardhat.config.js.
// If you are using MetaMask, be sure to change the Network id to 1337.
// Here's a list of network ids https://docs.metamask.io/guide/ethereum-provider.html#properties
// to use when deploying to other networks.
const HARDHAT_NETWORK_ID = '31337';

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
      // The info of the token (i.e. It's Name and symbol)
      tokenData: undefined,
      // The info of the dao
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
        <h1>Build your own DAO!</h1>
        <hr />
        <div className="row">
          <div className="col-12">
           {(
            <CreateDao
              daoData={(daoName, daoSymbol) => 
                this._getFormData(daoName, daoSymbol)
              }
            />
           )}
          </div>
        </div>
      </div>
    );
  }
  
//======================================================================
// Additional Async Methods Below
//======================================================================
  componentWillUnmount() {
    // We poll the user's balance, so we have to stop doing that when Dapp
    // gets unmounted
    this._stopPollingData();
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
      this._stopPollingData();
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
      this._stopPollingData();
      this._resetState();
    });
  }
  
  //======================================================================
  // Important Async Tasks for Created Contract Copies 
  //======================================================================
  async _getFormData(daoName, daoSymbol) {
    // Setting the initial state of daoData to the form data when have retrieved
    this.setState({daoData: {daoName, daoSymbol}});
    
    // We can use a async function that will deploy the proxy copy 
    /*
      I'm thinking that as soon as we have the ABI code for the deployed proxy factory
      contract, we can add it below and 
    */
   
    // let signer = await providers.getSigner();
    // let contractInstance = new ethers.Contract(contractAddress, contractJSON.abi, signer);
    // await contractInstance.createDaoFactory(params_here);
    console.log(daoName, daoSymbol);
  }

  //======================================================================
  _initialize(userAddress) {
    // This method initializes the dapp

    // We first store the user's address in the component's state
    this.setState({
      selectedAddress: userAddress,
    });

    // Then, we initialize ethers, fetch the token's data, and start polling
    // for the user's balance.

    // Fetching the token data and the user's balance are specific to this
    // sample project, but you can reuse the same initialization pattern.
    // this._initializeEthers();
    // this._getTokenData();
    // this._startPollingData();
  }

  // Keep this below and above where it is called
  // async _initializeEthers() {
  //   // We first initialize ethers by creating a provider using window.ethereum
  //   this._provider = new ethers.providers.Web3Provider(window.ethereum);

  //   // Then, we initialize the contract using that provider and the token's
  //   // artifact. You can do this same thing with your contracts.
  //   this._token = new ethers.Contract(
  //     contractAddress.Token,
  //     TokenArtifact.abi,
  //     this._provider.getSigner(0)
  //   );
  // }

  // The next two methods are needed to start and stop polling data. While
  // the data being polled here is specific to this example, you can use this
  // pattern to read any data from your contracts.
  //
  // Note that if you don't need it to update in near real time, you probably
  // don't need to poll it. If that's the case, you can just fetch it when you
  // initialize the app, as we do with the token data.


  _stopPollingData() {
    clearInterval(this._pollDataInterval);
    this._pollDataInterval = undefined;
  }

  // The next two methods just read from the contract and store the results
  // in the component state.
  // async _getTokenData() {
  //   const name = await this._token.name();
  //   const symbol = await this._token.symbol();

  //   this.setState({ tokenData: { name, symbol } });
  // }

  // async _updateBalance() {
  //   const balance = await this._token.balanceOf(this.state.selectedAddress);
  //   this.setState({ balance });
  // }

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
      networkError: 'Please connect Metamask to Localhost:8545'
    });

    return false;
  }
}
