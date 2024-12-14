import { useIsMobile } from "../../../Hooks/useIsMobile.js";
import { useParams } from "react-router-dom";
import ChannelHeader from "../../components/ChannelHeader/ChannelHeader.jsx";
import ChannelList from "../../components/ChannelList/ChannelList.jsx";
import Message from "../../components/Message/Message.jsx";
import "./styles.css";
import { useWorkspacesContext } from "../../../Hooks/useWorkspaceContext.js"
import MessageCreationForm from "../../components/MessageCreationForm/MessageCreationForm.jsx";
import { useState, useEffect } from "react";
import { PUT, DELETE, getAuthenticatedHeaders, GET } from "../../../fetching/http.fetching.js";



const WorkspacePage = () => {
  const backendUrl = import.meta.env.VITE_API_URL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { workSpaces, createMessage, updateMessages } = useWorkspacesContext(); 
  const { id_workspace, id_channel } = useParams(); 
  const [currentChannel, setCurrentChannel] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const currentWorkSpace = workSpaces.find(
      (workspace) => workspace._id === id_workspace
    );

    if (currentWorkSpace) {
      const channel = currentWorkSpace.channels.find(
        (channel) => channel.id === id_channel
      );
      setCurrentChannel(channel);
      setMessages(channel.messages);
    }
  }, [workSpaces, id_workspace, id_channel]);

  const currentWorkSpace = workSpaces.find(
    (workSpace) => workSpace._id == id_workspace
  );

  const handleCreateMessage = async (newMessageContent) => {
    try {
      const newMessage = await createMessage(newMessageContent, id_workspace, id_channel);
  
      if (newMessage) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        // Recargar los mensajes desde el backend para obtener los datos más recientes
        await reloadMessagesFromBackend();  // Aquí recargamos los mensajes después de enviar uno nuevo
      }
    } catch (error) {
      console.error("Error al crear el mensaje", error);
    }
  };
  
  const reloadMessagesFromBackend = async () => {
    try {
      const response = await GET(`${backendUrl}/api/workspaces/${id_workspace}/channels/${id_channel}/messages`, {
        headers: getAuthenticatedHeaders(),
      });
  
      if (response.ok) {
        const updatedMessages = await response.json();
        setMessages(updatedMessages);
      } else {
        console.error("Error al recuperar los mensajes");
      }
    } catch (error) {
      console.error("Error al comunicar con el servidor", error);
    }
  };
  
  const handleEditMessage = async (messageId, newContent) => {
    try {
      const response = await PUT(`${backendUrl}/api/messages/${id_workspace}/${id_channel}/${messageId}`, {
        headers: getAuthenticatedHeaders(),
        body: JSON.stringify({ content: newContent }),
        workSpace: currentWorkSpace
      });

      if (response.ok) {
        const updatedMessages = messages.map((msg) => 
          msg.id === messageId ? { ...msg, content: newContent } : msg
        );
        setMessages(updatedMessages);

        updateMessages(id_workspace, id_channel, { id: messageId, content: newContent });
      } else {
        console.error("Error al actualizar el mensaje");
      }
    } catch (error) {
      console.error("Error al comunicar con el servidor", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await DELETE(`${backendUrl}/api/messages/${id_workspace}/${id_channel}/${messageId}`, {
        headers: getAuthenticatedHeaders()
      });

      if (response.ok) {
        const updatedMessages = messages.filter((msg) => msg.id !== messageId);
        setMessages(updatedMessages);

        updateMessages(id_workspace, id_channel, null, messageId);
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
            {messages.length === 0 ? (
              <p>No hay mensajes</p>
            ) : (
              messages.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  onEdit={handleEditMessage}
                  onDelete={handleDeleteMessage}
                />
              ))
            )}
          </div>
          <MessageCreationForm handleCreateMessage={handleCreateMessage} />
        </div>
      </div>
    </>
  );
};

export default WorkspacePage;
