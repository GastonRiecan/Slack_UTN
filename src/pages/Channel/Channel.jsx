import React from "react";
import { Link } from "react-router-dom";

const Channel = () => {
  return (
    <main>
          <header style={{display: "flex", justifyContent: "space-between" }}>
        <h2>WorkspaceName</h2>
        <Link to="/">
          <h2>Salir</h2>
        </Link>
        <button>⏹️</button>
      </header>
      <div>
        <section>
          <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2px",
        }}>
            <img src="/images/profile-pictures/Pepe.jpg" style={{width: "50px"}}/>
            <h3>USERNAME</h3>
            <span>hour-minutes</span>
          </div>
          <p>Aca va el message del user</p>
          <hr />
        </section>
        <input type="text" placeholder="Escribe el mensaje" /><button>Enviar</button>
      </div>
    </main>
  )
};

export default Channel;
