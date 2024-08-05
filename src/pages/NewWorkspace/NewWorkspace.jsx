import React from "react";
import { Link } from "react-router-dom";
import "./styles.css"

const NewWorkspace = () => {
  return (
    <div className="new-workspace-container">
      <h1>Crea un entorno de trabajo</h1>
      <form>
        <label htmlFor="workspaceName">workspaceName</label>
        <input type="text" name="workspaceName" />
        <label htmlFor="channelName">channelName</label>
        <input type="text" name="channelName" />
      </form>
      <section className="create-section">
        <Link className="create-link" to="/workspace/1/1">
          <h2 className="h2-create-section">Crear Entorno</h2>
        </Link>
        <Link className="create-link" to="/">
          <h2 className="h2-create-section">Cancelar</h2>
        </Link>
      </section>
    </div>
  );
};

export default NewWorkspace;
