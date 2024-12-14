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
    // Crear un nuevo canal usando la función del contexto
    const newChannel = await createChannel(workSpace._id, channelName);

    // Después de crear el canal, asegúrate de que el componente se actualice con los nuevos canales
    if (newChannel) {
      // Aquí aseguramos que el canal se haya creado correctamente y sincronizamos el estado
      // Recargamos los canales para asegurarnos de que la UI se actualice sin necesidad de recargar la página
      const updatedChannels = [...workSpace.channels, newChannel];  // Agregar el nuevo canal al estado local
      workSpace.channels = updatedChannels;  // Actualiza el estado de los canales en el espacio de trabajo (si lo haces en un contexto)
      
      // Navegar al canal recién creado
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
