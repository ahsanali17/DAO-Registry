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
          const daoName = formData.get("daoName");
          const daoSymbol = formData.get("daoSymbol");

          if (daoName && daoSymbol) {
            daoData(daoName, daoSymbol);
          }
        }}
      >
        <div className="form-group">
          <label>Name of Dao</label>
          <input 
            className="form-control" 
            type="text" 
            name="daoName" 
            placeholder="Give your new Dao a name"
            minLength={4}
            maxLength={15}
            required 
          />
        </div>
        <div className="form-group">
          <label>Dao Symbol</label>
          <input
            className="form-control"
            type="text"
            step="1"
            name="daoSymbol"
            placeholder="Give your Dao a symbol"
            minLength={2}
            maxLength={4}
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
