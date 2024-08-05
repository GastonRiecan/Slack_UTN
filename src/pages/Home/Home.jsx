import React from "react";
import { Link } from "react-router-dom";
import { workSpaces } from "../../data/data.js";
import "./styles.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a Slack</h1>
      <h2>Entornos de trabajo:</h2>
      {workSpaces.map((workSpace) => (
        <section className="workspaces" key={workSpace.id}>
          <img src={`images/workspaces/${workSpace.thumbnail}`} width="50px" />
          <span>{workSpace.name}</span>
          <Link to={`/workspace/${workSpace.id}/${workSpace.channels[0].id}`}>
            <h2>Entrar</h2>
          </Link>
        </section>
      ))}
      <section className="new-workspace">
        <Link to="/workspace/new">
          <h2>Crear Entorno</h2>
        </Link>
      </section>
    </div>
  );
};

export default Home;
