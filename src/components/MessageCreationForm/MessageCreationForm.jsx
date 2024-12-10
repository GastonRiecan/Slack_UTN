import SearchGIF from "../SearchGIF/SearchGIF";
import "./styles.css";
import { useState } from "react";

const MessageCreationForm = ({ handleCreateMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const [toggleSearchGIF, setToggleSearchGIF] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleCreateMessage(newMessage); 
      setNewMessage(""); 
    } catch (error) {
      console.error("Error al crear el mensaje", error);
    }
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
            >
              <i className="bi bi-search"></i> GIF
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
