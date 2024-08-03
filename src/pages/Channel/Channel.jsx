import React, { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useParams } from "react-router-dom";
import ChannelHeader from "../../components/ChannelHeader/ChannelHeader";
import ChannelList from "../../components/ChannelList/ChannelList";
import Message from "../../components/Message/Message";
import { workSpaces, users } from "../../data/data.js";

const Channel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { id_channel, id_workspace } = useParams();
  const currentWorkSpace = workSpaces.find(
    (workSpace) => workSpace.id === Number(id_workspace)
  );
  const currentChannel = currentWorkSpace.channels.find(
    (channel) => channel.id === Number(id_channel)
  );

  return (
    <>
      <ChannelHeader
        workSpace={currentWorkSpace}
        isMobile={isMobile}
        isMenuOpen={isMenuOpen}
        toggleMenuOpen={() => setIsMenuOpen(!isMenuOpen)}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        {!isMobile && <ChannelList workSpace={currentWorkSpace} />}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid black",
              borderRadius: "10px",
              padding: "2px",
              overflowY: "scroll",
            }}
          >
            {currentChannel.messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
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
