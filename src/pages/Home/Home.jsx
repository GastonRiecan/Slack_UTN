import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <h1>Bienvenido a Slack</h1>
      <h2>Entornos de trabajo:</h2>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid black",
          borderRadius: "10px",
          padding: "2px",
        }}
      >
        <img src="/images/workspaces/defaultWorkSpaceImage.png" width="50px" />
        <span>Workspace_name</span>
        <button>Entrar</button>
      </section>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px dashed black",
          borderRadius: "10px",
          padding: "2px",
        }}
      >
        <Link to="/workspace/new">
          <h2>Crear Entorno</h2>
        </Link>
      </section>
    </div>
  );
};

export default Home;
