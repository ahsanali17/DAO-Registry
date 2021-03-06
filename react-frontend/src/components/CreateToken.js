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

          if (userAddress) {
            tokenData(userAddress);
          }
        }}
      >
        <div className="form-group">
          <label>Token Creators Address'</label>
          <input
            className="form-control"
            type="text"
            step="1"
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
