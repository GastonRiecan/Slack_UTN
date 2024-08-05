import React, { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useParams } from "react-router-dom";
import ChannelHeader from "../../components/ChannelHeader/ChannelHeader";
import ChannelList from "../../components/ChannelList/ChannelList";
import Message from "../../components/Message/Message";
import { workSpaces, users } from "../../data/data.js";
import "./styles.css";

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
      <div className="channel-container">
        {!isMobile && <ChannelList workSpace={currentWorkSpace} />}
        <div className="message-content">
          <div className="scrollable">
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
