import "./styles.css";
import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const Message = ({ message, onEdit, onDelete }) => {
  const messageRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.content);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [message]);

  const handleEditClick = () => {
    setIsEditing(true); 
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedMessage(message.content);
  };

  const handleSaveEdit = () => {
    onEdit(message.id, editedMessage);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(message.id);
  };

  return (
    <section className="full-message" ref={messageRef}>
      <div className="message-container">
        <div className="user-info">
          <img src="https://raw.githubusercontent.com/GastonRiecan/images-repository/refs/heads/main/images/profile-pictures/Gaston.jpg" alt="" width={50} height={50} />
          <h3>Gaston</h3>
        </div>
        <span>{message.timeStamp}</span>
      </div>

      {isEditing ? (
        <div className="edit-message">
          <textarea
            value={editedMessage}
            onChange={(e) => setEditedMessage(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Guardar</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      ) : (
        <p>{message.content}</p>
      )}

      {/* Botones de acción: Editar y Eliminar */}
      {!isEditing && (
        <div className="message-actions">
          <button onClick={handleEditClick}>Editar</button>
          <button onClick={handleDeleteClick}>Eliminar</button>
        </div>
      )}
    </section>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Message;
