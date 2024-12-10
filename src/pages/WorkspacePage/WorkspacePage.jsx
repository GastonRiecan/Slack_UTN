import { useIsMobile } from "../../../Hooks/useIsMobile.js";
import { useParams } from "react-router-dom";
import ChannelHeader from "../../components/ChannelHeader/ChannelHeader.jsx";
import ChannelList from "../../components/ChannelList/ChannelList.jsx";
import Message from "../../components/Message/Message.jsx";
import "./styles.css";
import { useWorkspacesContext } from "../../contexts/WorkspacesContext";
import MessageCreationForm from "../../components/MessageCreationForm/MessageCreationForm.jsx";
import { useState, useEffect } from "react";
import { PUT, DELETE, getAuthenticatedHeaders } from "../../../fetching/http.fetching.js";

const WorkspacePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { workSpaces, createMessage } = useWorkspacesContext(); 
  const { id_workspace, id_channel } = useParams(); 
  const [currentChannel, setCurrentChannel] = useState(null);

  useEffect(() => {
    const currentWorkSpace = workSpaces.find(
      (workspace) => workspace._id === id_workspace
    );

    if (currentWorkSpace) {
      const channel = currentWorkSpace.channels.find(
        (channel) => channel.id === id_channel
      );
      setCurrentChannel(channel);
    }
  }, [workSpaces, id_workspace, id_channel]);

  const currentWorkSpace = workSpaces.find(
    (workSpace) => workSpace._id == id_workspace
  );

  const handleCreateMessage = async (newMessageContent) => {
    try {
      const newMessage = createMessage(newMessageContent, id_workspace, id_channel);

      if (newMessage) {
        setCurrentChannel((prevState) => ({
          ...prevState,
          messages: [...prevState.messages, newMessage],
        }));
      }
    } catch (error) {
      console.error("Error al crear el mensaje", error);
    }
  };
  
  const handleEditMessage = async (messageId, newContent) => {
    try {
      const response = await PUT(`VITE_API_URL/api/messages/${id_workspace}/${id_channel}/${messageId}`, {
        headers: getAuthenticatedHeaders(),
        body: JSON.stringify({ content: newContent }),
        workSpace: currentWorkSpace
      });

      if (response.ok) {
        const updatedMessages = currentChannel.messages.map((msg) =>
          msg.id === messageId ? { ...msg, content: newContent } : msg
        );
        setCurrentChannel((prevState) => ({
          ...prevState,
          messages: updatedMessages,
        }));
      } else {
        console.error("Error al actualizar el mensaje");
      }
    } catch (error) {
      console.error("Error al comunicar con el servidor", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await DELETE(`VITE_API_URL/api/messages//${id_workspace}/${id_channel}/${messageId}`, {
        headers: getAuthenticatedHeaders()
      });

      if (response.ok) {
        const updatedMessages = currentChannel.messages.filter((msg) => msg.id !== messageId);
        setCurrentChannel((prevState) => ({
          ...prevState,
          messages: updatedMessages,
        }));
      } else {
        console.error("Error al eliminar el mensaje");
      }
    } catch (error) {
      console.error("Error al comunicar con el servidor", error);
    }
  };

  if (!currentChannel) {
    return <p>No hay canales disponibles.</p>;
  }

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
            {currentChannel.messages.length === 0 ? (
              <p>No hay mensajes</p>
            ) : (
              currentChannel.messages.map((message) => (
                <Message

                  key={message.id}
                  message={message}
                  onEdit={handleEditMessage} 
                  onDelete={handleDeleteMessage} 
                />
              ))
            )}
          </div>
          <MessageCreationForm  handleCreateMessage={handleCreateMessage}/>
        </div>
      </div>
    </>
  );
};

export default WorkspacePage;
