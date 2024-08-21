import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useWorkspacesContext } from "../../contexts/WorkspacesContext";
import SearchGIF from "../SearchGIF/SearchGIF";
import "./styles.css";
const MessageCreationForm = () => {
  const { createMessage } = useWorkspacesContext();
  const { id_workspace, id_channel } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [toggleSearchGIF, setToggleSearchGIF] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateMessage(newMessage);
    setNewMessage("");
  };

  const handleCreateMessage = (message) => {
    createMessage(message, id_workspace, id_channel);
  };

  return (
    <form
      className={`message-form ${toggleSearchGIF && "expanded"}`}
      onSubmit={handleSubmit}
    >
      {toggleSearchGIF ? (
        <SearchGIF
          toggleSearchGIFVisibility={() => setToggleSearchGIF(!toggleSearchGIF)}
          handleCreateMessage={handleCreateMessage}
        />
      ) : (
        <>
          <div className="search-container">
            <input
              className="message-text"
              type="text"
              placeholder="Escribe el mensaje"
              required
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="gif-button"
              type="button"
              onClick={() => setToggleSearchGIF(!toggleSearchGIF)}
            ><i className="bi bi-search"></i>
              GIF
            </button>
          </div>
          <button className="send-button" type="submit">
            Enviar
          </button>
        </>
      )}
    </form>
  );
};

export default MessageCreationForm;
