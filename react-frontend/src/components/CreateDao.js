import React from "react";

export default function CreateDao({ daoData }) {
  return (
    <div className="border-gray">
      <h4>Create Dao</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
        
          const timeLockAddress = formData.get("timeLockAddress");
          const tokenAddress = formData.get("tokenAddress");
          const guardianAddress = formData.get("guardianAddress");
          
          console.log("Within the createDAO file:",timeLockAddress,tokenAddress,guardianAddress);
          if (timeLockAddress && tokenAddress && guardianAddress) {
            daoData(timeLockAddress,tokenAddress,guardianAddress);
          }
        }}
      >
        <div className="form-group">
          <label>TimeLock Address</label>
          <input
            className="form-control"
            type="text"
            step="1"
            name="timeLockAddress"
            placeholder="Please provide your DAO's Timelock address"
            
          />
        </div>
        <div className="form-group">
          <label>Token Address</label>
          <input 
            className="form-control" 
            type="text" 
            step="2"
            name="tokenAddress" 
            placeholder="Provide the address of the token to be used in the DAO"
             
          />
        </div>
        <div className="form-group">
          <label>Guardian Address</label>
          <input
            className="form-control"
            type="text"
            step="3"
            name="guardianAddress"
            placeholder="Please provide a trustworthy security address"
            
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
