import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import useCustomForm from "../../../Hooks/useCustomForm.jsx";
import { getUnnauthenticatedHeaders, POST } from "../../../fetching/http.fetching.js";

const RegisterForm = () => {
  const form_fields = {
    name: "",
    email: "",
    password: "",
  };

  const { form_values_state, handleChangeInputValue } = useCustomForm(form_fields);
  const navigate = useNavigate();
  const [error, setError] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitRegisterForm = async (e) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);

      const response = await POST("http://localhost:3000/api/auth/register", {
        headers: getUnnauthenticatedHeaders(),
        body: JSON.stringify(form_values_state),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || "Hubo un error al registrar el usuario.");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setError("Error desconocido. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-form">
      <h1>Registrate en nuestra web</h1>
      
      {error && (
        <div className="error-modal">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Cerrar</button>
        </div>
      )}
      
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

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registrando..." : "Registrar"}
        </button>
      </form>

      <span>
        Si ya tienes cuenta puedes ir a <Link to="/login">Login</Link>
      </span>
    </div>
  );
};

export default RegisterForm;
