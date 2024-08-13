import React, { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile.js";
import { useParams } from "react-router-dom";
import ChannelHeader from "../../components/ChannelHeader/ChannelHeader.jsx";
import ChannelList from "../../components/ChannelList/ChannelList.jsx";
import Message from "../../components/Message/Message.jsx";
import "./styles.css";
import { useWorkspacesContext } from "../../contexts/WorkspacesContext";
import MessageCreationForm from "../../components/MessageCreationForm/MessageCreationForm.jsx";

const WorkspacePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { workSpaces } = useWorkspacesContext();
  const { id_workspace, id_channel } = useParams();

  const currentWorkSpace = workSpaces.find(
    (workSpace) => workSpace.id == id_workspace
  );

  const currentChannel = currentWorkSpace.channels.find(
    (channel) => channel.id == id_channel
  );

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
          <h3>#{currentChannel.name}</h3>
          <div className="scrollable">
            {currentChannel.messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
          <MessageCreationForm />
        </div>
      </div>
    </>
  );
};

export default WorkspacePage;
