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
  const [newMessage, setNewMessage] = useState("");
  const isMobile = useIsMobile();
  const { id_workspace, id_channel } = useParams();
  const currentWorkSpace = workSpaces.find(
    (workSpace) => workSpace.id === Number(id_workspace)
  );
  const currentChannel = currentWorkSpace.channels.find(
    (channel) => channel.id === Number(id_channel)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newMessage);
    setNewMessage("");
  };

  return (
    <>
      <ChannelHeader
        workSpace={currentWorkSpace}
        isMenuOpen={isMenuOpen}
        toggleMenuOpen={() => setIsMenuOpen(!isMenuOpen)}
      />
      <div className="channel-container">
        {isMobile ? (
          isMenuOpen && (
            <ChannelList
              workSpace={currentWorkSpace}
              isMenuOpen={isMenuOpen}
              toggleMenuOpen={() => setIsMenuOpen(!isMenuOpen)}
            />
          )
        ) : (
          <ChannelList workSpace={currentWorkSpace} />
        )}
        <div className="message-content">
          <div className="scrollable">
            {currentChannel.messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
          <form className="message-form" onSubmit={handleSubmit}>
            <input className="message-text"
              type="text"
              placeholder="Escribe el mensaje"
              required
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="send-button" type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Channel;
