import React from "react";

export default function CreateToken({ tokenData }) {
  return (
    <div>
      <h4>Create ERC20</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the createTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const userAddress = formData.get("userAddress");
          const tokenName = formData.get("tokenName");
          const tokenSymbol = formData.get("tokenSymbol");
          if (tokenName && tokenSymbol && userAddress) {
            tokenData(tokenName,tokenSymbol,userAddress);
          }
        }}
      >
        <div className="form-group">
          <label>Name of the Token</label>
          <input
            className="form-control"
            type="text"
            step="1"
            name="tokenName"
            placeholder="Please provide token name"
            required
          />
        </div>
        <div className="form-group">
          <label>Symbol used for Token</label>
          <input
            className="form-control"
            type="text"
            step="2"
            name="tokenSymbol"
            placeholder="Please provide token symbol"
            required
          />
        </div>
        <div className="form-group">
          <label>Token Creators Address'</label>
          <input
            className="form-control"
            type="text"
            step="3"
            name="userAddress"
            placeholder="Please provide token creators address"
            required
          />
        </div>
        <div className="form-group">
          <input 
            className="btn btn-primary" 
            id="createTokenButton"
            type="submit" 
            value="Create Token" 
          />
        </div>
      </form>
    </div>
  );
}
