import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import extractFormData from "../../../utils/extractFormData.js";
import "./styles.css";
import {
  POST,
  getAuthenticatedHeaders,
} from "../../../fetching/http.fetching.js";
import { useAuthContext } from "../../contexts/AuthContext.jsx";

const LoginForm = () => {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_API_URL;
  const {setIsAuthenticatedUser} = useAuthContext();
  
  const handleSubmitLoginForm = async (e) => {
    try {      
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);
      
      const form_HTML = e.target;
      const form_Values = new FormData(form_HTML);
      const form_fields = {
        email: "",
        password: "",
      };
      const form_values_object = extractFormData(form_fields, form_Values);
      
      const response = await POST(`${backendUrl}/api/auth/login`, {
        headers: getAuthenticatedHeaders(),
        body: JSON.stringify(form_values_object),
      });
      console.log('respuesta del back al loguearse',response);

      if (response) {
          sessionStorage.setItem("access_token", response.payload.token);
          sessionStorage.setItem("user_info", JSON.stringify(response.payload.user));

          setIsAuthenticatedUser(true);
      
          navigate(`/home/${response.payload.user.id}`);
          
        } else {
          setError("La respuesta no contiene el token o la información del usuario.");
        }
        
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Ocurrió un error inesperado, por favor intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-form">
      <h1>Inicia sesión</h1>

      {error && (
        <div className="error-modal">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Cerrar</button>
        </div>
      )}

      <form onSubmit={handleSubmitLoginForm}>
        <div>
          <label htmlFor="email">Ingrese su email:</label>
          <input
            name="email"
            id="email"
            placeholder="Pepe@gmail.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Ingrese su contraseña:</label>
          <input
            name="password"
            id="password"
            placeholder="***"
            type="password"
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>

      <span>
        Si aún no tienes cuenta puedes ir a{" "}
        <Link to="/register">Registrarte</Link>
      </span>
      <br />
      <span>
        Si has olvidado tu contraseña puedes ir a{" "}
        <Link to="/forgot-password">Restablecer</Link>
      </span>
    </div>
  );
};

export default LoginForm;
