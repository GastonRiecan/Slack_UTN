import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useIsMobile } from "../../../Hooks/useIsMobile";
import ChannelHeader from "../ChannelHeader/ChannelHeader";
import ChannelCreationForm from "../ChannelCreationForm/ChannelCreationForm";
import { useWorkspacesContext } from "../../../Hooks/useWorkspaceContext";
import "./styles.css";
import PropTypes from "prop-types";

export const ChannelList = ({ workSpace, toggleMenuOpen, isMenuOpen }) => {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const { id_channel } = useParams();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { createChannel } = useWorkspacesContext();

  const handleClick = (channel_id) => {
    navigate(`/workspace/${workSpace._id}/${channel_id}`);
    if (isMenuOpen) toggleMenuOpen();
  };

  const handleCreateChannel = async (channelName) => {
    const newChannel = await createChannel(workSpace._id, channelName);

    if (newChannel) {
      const updatedChannels = [...workSpace.channels, newChannel];  
      workSpace.channels = updatedChannels; 
      
      navigate(`/workspace/${workSpace._id}/${newChannel.id}`);
    }
  };

  return (
    <div className={`channel-list-container ${isMobile ? "mobile" : "max-width"}`}>
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
            className={`channel-link ${id_channel == channel.id ? "current-channel" : ""}`}
            key={channel.id}
          >
            #{channel.name}
          </p>
        ))}
      </section>
      {isFormOpen ? (
        <ChannelCreationForm
          handleCancel={() => setIsFormOpen(false)}
          handleCreateChannel={handleCreateChannel}
        />
      ) : (
        <button onClick={() => setIsFormOpen(!isFormOpen)}>Crear Canal</button>
      )}
    </div>
  );
};

ChannelList.propTypes = {
  workSpace: PropTypes.shape({
    _id: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired,
    channels: PropTypes.array.isRequired,
  }).isRequired,
  toggleMenuOpen: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.func.isRequired
};

export default ChannelList;
