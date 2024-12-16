import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import useCustomForm from "../../../Hooks/useCustomForm.jsx";
import { getUnnauthenticatedHeaders, POST } from "../../../fetching/http.fetching.js";
import { useState } from "react";

const RegisterForm = () => {
  const form_fields = {
    name: "",
    email: "",
    password: "",
  };

  const { form_values_state, handleChangeInputValue } = useCustomForm(form_fields);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_API_URL;

  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmitRegisterForm = async (e) => {
    e.preventDefault();
    try {
      const body = await POST(`${backendUrl}/api/auth/register`, {
        headers: getUnnauthenticatedHeaders(),
        "Access-Control-Allow-Origin": "*",
        body: JSON.stringify(form_values_state),
      });

      if (body.ok) {
        console.log("Registro Exitoso, anda a revisar tu casilla de mail!!");
        
        setModalVisible(true);
        
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        console.error("Error en el registro:", body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="register-form">
      <h1>Registrate en nuestra web</h1>
      <form onSubmit={handleSubmitRegisterForm}>
        <div>
          <label htmlFor="name">Ingrese su nombre:</label>
          <input
            name="name"
            id="name"
            placeholder="Pepe Suarez"
            onChange={handleChangeInputValue}
          />
        </div>
        <div>
          <label htmlFor="email">Ingrese su email:</label>
          <input
            name="email"
            id="email"
            placeholder="Pepe@gmail.com"
            onChange={handleChangeInputValue}
          />
        </div>
        <div>
          <label htmlFor="password">Ingrese su contraseña:</label>
          <input
            name="password"
            id="password"
            placeholder="***"
            onChange={handleChangeInputValue}
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      <span>
        Si ya tienes cuenta puedes ir a <Link to="/login">Login</Link>
      </span>

      {modalVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>¡Tu registro fue exitoso!</h2>
            <p>Anda a chequear tu mail que tenes que verificarlo antes de loguearte!!</p>
            <button className="success-button" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
