import React, { useState } from "react";
import { useWorkspacesContext } from "../../contexts/WorkspacesContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const WorkspaceCreationForm = () => {
  const navigate = useNavigate();
  const { createWorkspace, workSpaces } = useWorkspacesContext();
  const [workspaceName, setWorkspaceName] = useState("");
  const [channelName, setChannelName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWorkspace = createWorkspace(workspaceName, channelName);
    navigate(`/workspace/${newWorkspace.id}/${newWorkspace.channels[0].id}`);
  };

  return (
    <form className="workspaceCreationForm" onSubmit={handleSubmit}>
      <label htmlFor="workspaceName">Nombre del entorno de trabajo</label>
      <input
        className="workspace-create-input"
        type="text"
        name="workspaceName"
        required
        placeholder="Espacio 1"
        value={workspaceName}
        onChange={(e) => setWorkspaceName(e.target.value)}
      />
      <label htmlFor="channelName">Nombre del canal</label>
      <input
        className="workspace-create-input"
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
          className="cancel-link"
          type="button"
        >
          Cancelar
        </button>
        <button className="create-link" type="submit">
          Crear Entorno
        </button>
      </div>
    </form>
  );
};

export default WorkspaceCreationForm;
