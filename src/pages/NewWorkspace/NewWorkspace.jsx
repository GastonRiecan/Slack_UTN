import React from "react";
import { Link } from "react-router-dom";

const NewWorkspace = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <h1>Crea un entorno de trabajo</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          border: "1px solid black",
          borderRadius: "10px",
          padding: "2px",
        }}
      >
        <label htmlFor="workspaceName">workspaceName</label>
        <input type="text" name="workspaceName" />
        <label htmlFor="channelName">channelName</label>
        <input type="text" name="channelName" />
      </form>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px dashed black",
          borderRadius: "10px",
          padding: "2px",
        }}
      >
        <Link to="/workspace/1/1">
          <h2>Crear Entorno</h2>
        </Link>
        <Link to="/">
          <h2>Cancelar</h2>
        </Link>
      </section>
    </div>
  );
};

export default NewWorkspace;
