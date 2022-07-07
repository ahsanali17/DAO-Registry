import React from "react";

export default function createTimeLock({ timeLockData }) {
 return (
    <div>
      <h4>Create Timelock</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the createTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const userAddress = formData.get("userAddress");
          const delay = formData.get("delay");
          
          if (userAddress && delay) {
           timeLockData(userAddress,delay);
          }
        }}
      >
        <div className="form-group">
          <label>TimeLock Creators Address</label>
          <input
            className="form-control"
            type="text"
            step="1"
            name="userAddress"
            placeholder="Please provide timelock creators address"
            required
          />
        </div>
        <div className="form-group">
          <label>Delay Time</label>
          <input
            className="form-control"
            type="text"
            step="1"
            name="delay"
            placeholder="Delay must be above or equal to 2"
            required
          />
        </div>
        <div className="form-group">
          <input 
            className="btn btn-primary" 
            id="createTimeLockButton"
            type="submit" 
            value="Create TimeLock" 
          />
        </div>
      </form>
    </div>
  );
}
