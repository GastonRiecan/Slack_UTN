import React, { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { workSpaces, users } from "../../data/data.js";
import ChannelHeader from "../../components/ChannelHeader/ChannelHeader";

const Channel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const currentWorkSpace = workSpaces[0];
  return (
    <>
      <ChannelHeader
        workSpace={currentWorkSpace}
        isMobile={isMobile}
        isMenuOpen={isMenuOpen}
        toggleMenuOpen={() => setIsMenuOpen(!isMenuOpen)}
      />
      <div style={{ display: "flex", gap: "10px"}}>
        {!isMobile && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid black",
              borderRadius: "10px",
              padding: "2px",
              width: "30%"
            }}
          >
            <h2>ChannelList</h2>
            <section style={{ display: "flex", flexDirection: "column" }}>
              <span>#General</span>
              <span>#Talks</span>
              <span>#Human Resources</span>
            </section>
            <button
              style={{ border: "1px dashed black", borderRadius: "10px" }}
            >
              Crear Canal
            </button>
          </div>
        )}
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid black",
              borderRadius: "10px",
              padding: "2px",
            }}
          >
            {/* scrolable */}
            <section>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2px",
                }}
              >
                <img
                  src="/images/profile-pictures/Pepe.jpg"
                />
                <h3>USERNAME</h3>
                <span>hour-minutes</span>
              </div>
              <p>Aca va el message del user</p>
              <hr />
            </section>
          </div>
          <form>
            <input type="text" placeholder="Escribe el mensaje" />
            <button>Enviar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Channel;
