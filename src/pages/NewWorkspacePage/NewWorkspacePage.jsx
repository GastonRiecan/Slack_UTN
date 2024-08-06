import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const NewWorkspacePage = () => {
  const navigate = useNavigate();
  const [workspaceName, setWorkspaceName] = useState("");
  const [channelName, setChannelName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(workspaceName);
    console.log(channelName);
  };

  return (
    <div className="new-workspace-container">
      <h1>Crea un entorno de trabajo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="workspaceName">Nombre del entorno de trabajo</label>
        <input
          type="text"
          name="workspaceName"
          required
          placeholder="Espacio 1"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />
        <label htmlFor="channelName">Nombre del canal</label>
        <input
          type="text"
          name="channelName"
          required
          placeholder="Saludos"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <div className="create-section">
          <button
            onClick={() => navigate("/")}
            className="create-link"
            type="button"
          >
            Cancelar
          </button>
          <button className="create-link" type="submit">
            Crear Entorno
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewWorkspacePage;
/* 
crear entorno : 
tomar valores de los 2 imputs para poder mostrarlos por log

*/
