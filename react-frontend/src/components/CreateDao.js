import React from "react";

export default function CreateDao({ daoData }) {
  return (
    <div>
      <h4>Create Dao</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
        
          const tokenAddress = formData.get("tokenAddress");
          const timelockAddress = formData.get("timelockAddress");
          const guardianAddress = formData.get("guardianAddress");
          
          if (tokenAddress && timelockAddress && guardianAddress) {
            daoData(tokenAddress, timelockAddress, guardianAddress);
          }
        }}
      >
        <div className="form-group">
          <label>Token Address</label>
          <input 
            className="form-control" 
            type="text" 
            name="tokenAddress" 
            placeholder="Provide the address of the token to be used in the DAO"
            required 
          />
        </div>
        <div className="form-group">
          <label>TimeLock Address</label>
          <input
            className="form-control"
            type="text"
            step="1"
            name="timelockAddress"
            placeholder="Please provide your DAO's Timelock address"
            required
          />
        </div>
        <div className="form-group">
          <label>Guardian Address</label>
          <input
            className="form-control"
            type="text"
            step="1"
            name="guardianAddress"
            placeholder="Please provide a trustworthy security address"
            required
          />
        </div>
        <div className="form-group">
          <input 
            className="btn btn-primary" 
            id="createDaoButton"
            type="submit" 
            value="Create Dao" 
          />
        </div>
      </form>
    </div>
  );
}
