import { useIsMobile } from "../../../Hooks/useIsMobile.js";
import { useParams } from "react-router-dom";
import ChannelHeader from "../../components/ChannelHeader/ChannelHeader.jsx";
import ChannelList from "../../components/ChannelList/ChannelList.jsx";
import Message from "../../components/Message/Message.jsx";
import "./styles.css";
import { useWorkspacesContext } from "../../../Hooks/useWorkspaceContext.js"
import MessageCreationForm from "../../components/MessageCreationForm/MessageCreationForm.jsx";
import { useState, useEffect } from "react";

const WorkspacePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { workSpaces, createMessage, updateMessage, deleteMessage } = useWorkspacesContext(); 
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
  }, [workSpaces, id_workspace, id_channel, setMessages]);

  const currentWorkSpace = workSpaces.find(
    (workSpace) => workSpace._id == id_workspace
  );

  const handleCreateMessage = async (newMessageContent) => {
    try {
      const newMessage = await createMessage(newMessageContent, id_workspace, id_channel);
  
      if (newMessage) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    } catch (error) {
      console.error("Error al crear el mensaje", error);
    }
  };

  const handleEditMessage = async (messageId, newContent) => {
    try {
      const updatedMessage = await updateMessage(messageId, newContent, id_workspace, id_channel);
  
      if (updatedMessage) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === messageId ? { ...msg, content: updatedMessage.content } : msg
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar el mensaje", error);
    }
  };
  
  const handleDeleteMessage = async (messageId) => {
    try {
      const deletedMessageId = await deleteMessage(messageId, id_workspace, id_channel);
  
      if (deletedMessageId) {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== deletedMessageId)
        );
      }
    } catch (error) {
      console.error("Error al eliminar el mensaje", error);
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
                  key={message._id}
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
