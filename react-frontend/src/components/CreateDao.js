import React from "react";

export function CreateDao({ transferTokens }) {
  return (
    <div>
      <h4>Create Dao</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const daoName = formData.get("daoName");
          const daoSymbol = formData.get("daoSymbol");

          if (daoName && daoSymbol) {
            transferTokens(daoName, daoSymbol);
          }
        }}
      >
        <div className="form-group">
          <label>Dao Symbol</label>
          <input
            className="form-control"
            type="text"
            step="1"
            name="daoSymbol"
            placeholder="Give your Dao a symbol"
            minLength={3}
            maxLength={4}
            required
          />
        </div>
        <div className="form-group">
          <label>Name of Dao</label>
          <input 
            className="form-control" 
            type="text" 
            name="daoName" 
            placeholder="Give your new Dao a name"
            minLength={3}
            maxLength={10}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            className="btn btn-primary" 
            type="submit" 
            value="Create Dao" 
          />
        </div>
      </form>
    </div>
  );
}
