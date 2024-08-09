import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import ChannelHeader from "../ChannelHeader/ChannelHeader";
import ChannelCreationForm from "../ChannelCreationForm/ChannelCreationForm";
import { useWorkspacesContext } from "../../contexts/WorkspacesContext";

import "./styles.css";

export const ChannelList = ({ workSpace, toggleMenuOpen, isMenuOpen }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { id_channel } = useParams();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { createChannel } = useWorkspacesContext();

  const handleClick = (channel_id) => {
    navigate(`/workspace/${workSpace.id}/${channel_id}`);
    if (isMenuOpen) toggleMenuOpen();
  };

  return (
    <div className={`channel-list-container ${isMobile ? "mobile" : ""}`}>
      {isMobile && (
        <ChannelHeader
          workSpace={workSpace}
          isMenuOpen={isMenuOpen}
          toggleMenuOpen={toggleMenuOpen}
        />
      )}
      <span>Canales</span>
      <section className="channel-section">
        {workSpace.channels.map((channel) => (
          <p
            onClick={() => handleClick(channel.id)}
            className={`channel-link ${
              id_channel == channel.id ? "current-channel" : ""
            }`}
            key={channel.id}
          >
            #{channel.name}
          </p>
        ))}
      </section>
      {isFormOpen ? (
        <ChannelCreationForm
          handleCancel={() => setIsFormOpen(false)}
          handleCreateChannel={(channelName) => createChannel(workSpace.id, channelName)}
        />
      ) : (
        <button onClick={() => setIsFormOpen(!isFormOpen)}>Crear Canal</button>
      )}
    </div>
  );
};

export default ChannelList;
