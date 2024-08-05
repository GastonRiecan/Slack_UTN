import { Link } from "react-router-dom";
import "./styles.css";
import { useParams } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import ChannelHeader from "../ChannelHeader/ChannelHeader";
import { useState } from "react";
import ChannelCreationForm from "../ChannelCreationForm/ChannelCreationForm";

export const ChannelList = ({ workSpace, toggleMenuOpen, isMenuOpen }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { id_channel } = useParams();
  const isMobile = useIsMobile();

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
          <Link
            className={`channel-link ${
              id_channel == channel.id ? "current-channel" : ""
            }`}
            to={`/workspace/${workSpace.id}/${channel.id}`}
            key={channel.id}
          >
            #{channel.name}
          </Link>
        ))}
      </section>
      {isFormOpen ? (
        <ChannelCreationForm handleCancel={() => setIsFormOpen(false)} />
      ) : (
        <button onClick={() => setIsFormOpen(!isFormOpen)}>Crear Canal</button>
      )}
    </div>
  );
};

export default ChannelList;
