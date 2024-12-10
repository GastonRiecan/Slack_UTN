import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import extractFormData from "../../../utils/extractFormData.js";
import { PUT, getUnnauthenticatedHeaders } from "../../../fetching/http.fetching.js";
import "./styles.css";

const ResetPasswordForm = () => {
  const { reset_token } = useParams();
  const backendUrl = import.meta.env.VITE_API_URL;
  const [error, setError] = useState(null);  
  const [success, setSuccess] = useState(null);  
  const [isSubmitting, setIsSubmitting] = useState(false);  

  const handleSubmitResetForm = (e) => {
    e.preventDefault();
    const form_HTML = e.target;
    const form_Values = new FormData(form_HTML);
    const form_fields = {
      password: "",
    };
    const form_values_object = extractFormData(form_fields, form_Values);

    setIsSubmitting(true); 

    PUT(`${backendUrl}/api/auth/reset-password/${reset_token}`, {
      headers: getUnnauthenticatedHeaders(),  
      body: JSON.stringify(form_values_object),  
    })
      .then((response) => {
        console.log({ response });

        if (response.ok) {
          setSuccess('Contraseña restablecida correctamente');
          setError(null);  
        } else {
          setError(response.detail);
          setSuccess(null);  
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Ocurrió un error inesperado. Intenta nuevamente.");
        setSuccess(null);  
      })
      .finally(() => setIsSubmitting(false));  
  };

  return (
    <div>
      {error && (
        <div className="modal error-modal">
          <div className="modal-content">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={() => setError(null)}>Cerrar</button>
          </div>
        </div>
      )}

      {success && (
        <div className="modal success-modal">
          <div className="modal-content">
            <h2>Éxito</h2>
            <p>{success}</p>
            <button onClick={() => setSuccess(null)}>Cerrar</button>
          </div>
        </div>
      )}

      <form className="reset-form" onSubmit={handleSubmitResetForm}>
        <h1>Restablecer contraseña</h1>
        <p>Completa el formulario con la nueva contraseña para restablecer:</p>
        <div>
          <label htmlFor="password">Ingrese su nueva contraseña:</label>
          <input name="password" id="password" placeholder="***" type="password" required />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Restableciendo..." : "Restablecer contraseña"}
        </button>
        <span>
          Si recuerdas tu contraseña puedes{" "}
          <Link to="/login">iniciar sesión</Link>
        </span>
        <span>
          Si aún no tienes cuenta puedes <Link to="/register">Registrarte</Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
