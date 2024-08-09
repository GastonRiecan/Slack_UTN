import React, { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile.js";
import { useParams } from "react-router-dom";
import ChannelHeader from "../../components/ChannelHeader/ChannelHeader.jsx";
import ChannelList from "../../components/ChannelList/ChannelList.jsx";
import Message from "../../components/Message/Message.jsx";
import "./styles.css";
import { useWorkspacesContext } from "../../contexts/WorkspacesContext";

const WorkspacePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const isMobile = useIsMobile();
  const { workSpaces } = useWorkspacesContext();
  const { id_workspace, id_channel } = useParams();
  const currentWorkSpace = workSpaces.find(
    (workSpace) => workSpace.id == id_workspace
  );
  const currentChannel = currentWorkSpace.channels.find(
    (channel) => channel.id == id_channel
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
            <input
              className="message-text"
              type="text"
              placeholder="Escribe el mensaje"
              required
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="send-button" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default WorkspacePage;
