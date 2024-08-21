import React, { useState } from "react";
import { useWorkspacesContext } from "../../contexts/WorkspacesContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const initialState = { workspaceName: "", channelName: "" };

const initialStateErrors = {
  workspaceName: [],
  channelName: [],
};

const WorkspaceCreationForm = () => {
  const navigate = useNavigate();
  const { createWorkspace } = useWorkspacesContext();
  const [errors, setErrors] = useState(initialStateErrors);
  const [formData, setFormData] = useState(initialState);

  const handleChangeValue = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.workspaceName.length > 0 || errors.channelName.length > 0) {
      return;
    }
    const newWorkspace = createWorkspace(
      formData.workspaceName,
      formData.channelName
    );
    navigate(`/workspace/${newWorkspace.id}/${newWorkspace.channels[0].id}`);
  };

  const findError = (from, id_error) => {
    return errors[from].find((error) => error.id == id_error);
  };

  const validateLength = (value, length) => {
    return value <= length;
  };

  const validateNameLength = (value) => {
    return validateLength(value.length, 3);
  };

  const validateError = (from, errorToValidate) => {
    if (findError(from, errorToValidate.id)) {
      if (!errorToValidate.validate(formData[from])) {
        const newUsernameErrors = errors[from].filter(
          (error) => error.id != errorToValidate.id
        );
        setErrors({ ...errors, [from]: newUsernameErrors });
      }
    } else {
      if (errorToValidate.validate(formData[from])) {
        setErrors({
          ...errors,
          [from]: [...errors[from], errorToValidate],
        });
      }
    }
  };
  const handleAbortWokspaceInput = () => {
    validateError("workspaceName", ERRORS.WORKSPACENAME_LENGTH);
  };

  const handleAbortChannelInput = () => {
    validateError("channelName", ERRORS.CHANNEL_NAME_LENGTH);
  };

  const ERRORS = {
    WORKSPACENAME_LENGTH: {
      text: "El nombre de tu entorno de trabajo debe tener mas de 3 caracteres",
      id: 1,
      validate: validateNameLength,
    },
    CHANNEL_NAME_LENGTH: {
      text: "El nombre de tu canal debe tener mas de 3 caracteres",
      id: 2,
      validate: validateNameLength,
    },
  };

  return (
    <form className="workspaceCreationForm" onSubmit={handleSubmit}>
      <label htmlFor="workspaceName">Nombre del entorno de trabajo</label>
      <input
        className="workspace-create-input"
        type="text"
        name="workspaceName"
        required
        placeholder="Espacio 1"
        value={formData.workspaceName}
        onBlur={handleAbortWokspaceInput}
        onChange={handleChangeValue}
      />
      {errors.workspaceName.length > 0 &&
        errors.workspaceName.map((error, index) => (
          <div className="input-error" key={index}>
            <img
              className="error-img"
              src="https://media1.giphy.com/media/JT7Td5xRqkvHQvTdEu/200.gif?cid=0ee1e587vfpa3etcirniuqly96xmbk4df3jm6g5wdxz6g5md&ep=v1_gifs_search&rid=200.gif&ct=g"
              alt=""
            />
            <span key={index}>{error.text}</span>
            <button hidden className="create-link" type="submit">
              Crear Entorno
            </button>
          </div>
        ))}
      <label htmlFor="channelName">Nombre del canal</label>
      <input
        className="workspace-create-input"
        type="text"
        name="channelName"
        required
        placeholder="Saludos"
        value={formData.channelName}
        onBlur={handleAbortChannelInput}
        onChange={handleChangeValue}
      />
      {errors.channelName.length > 0 &&
        errors.channelName.map((error, index) => (
          <div className="input-error"  key={index}>
            <img
              className="error-img"
              src="https://media2.giphy.com/media/3oz8xLd9DJq2l2VFtu/200.gif?cid=0ee1e587vfpa3etcirniuqly96xmbk4df3jm6g5wdxz6g5md&ep=v1_gifs_search&rid=200.gif&ct=g"
              alt=""
            />
            <span>{error.text}</span>
          </div>
        ))}
      <div className="create-section">
        <button
          onClick={() => navigate("/")}
          className="cancel-link"
          type="button"
        >
          Cancelar
        </button>
        <button className="create-link" type="submit">
          Crear Entorno
        </button>
      </div>
    </form>
  );
};

export default WorkspaceCreationForm;
