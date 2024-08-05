import { useState } from "react";
import "./styles.css";

const ChannelCreationForm = ({ handleCancel }) => {
  const [channelName, setChannelName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(channelName);
    handleCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del canal"
        required
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button className="create-channel-btn" type="submit">
        Confirmar
      </button>
      <button
        className="create-channel-btn"
        type="reset"
        onClick={handleCancel}
      >
        Cancelar
      </button>
    </form>
  );
};

export default ChannelCreationForm;
