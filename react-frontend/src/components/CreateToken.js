import React from "react";

export function CreateToken({ createTokens }) {
  return (
    <div>
      <h4>Create ERC20</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the createTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const tokenName = formData.get("tokenName");
          const tokenSymbol = formData.get("tokenSymbol");

          if (tokenName && tokenSymbol) {
            createTokens(tokenName, tokenSymbol);
          }
        }}
      >
        <div className="form-group">
          <label>Token Symbol</label>
          <input
            className="form-control"
            type="text"
            step="1"
            name="tokenSymbol"
            placeholder="Give your token a symbol"
            minLength={3}
            maxLength={4}
            required
          />
        </div>
        <div className="form-group">
          <label>Name of ERC20 Token</label>
          <input 
            className="form-control" 
            type="text" 
            name="tokenName" 
            placeholder="Give your new token a name"
            minLength={3}
            maxLength={10}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            className="btn btn-primary" 
            type="submit" 
            value="Create Token" 
          />
        </div>
      </form>
    </div>
  );
}
