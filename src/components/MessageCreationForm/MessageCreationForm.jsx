import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useWorkspacesContext } from "../../contexts/WorkspacesContext";
import "./styles.css";

const MessageCreationForm = () => {
  const { createMessage } = useWorkspacesContext();
  const { id_workspace, id_channel } = useParams();
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createMessage(newMessage, id_workspace, id_channel);
    setNewMessage("");
  };

  return (
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
  );
};

export default MessageCreationForm;
