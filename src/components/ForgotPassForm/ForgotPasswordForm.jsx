import { useState } from "react";
import { Link } from "react-router-dom";
import extractFormData from "../../../utils/extractFormData.js";
import "./styles.css";
import { getUnnauthenticatedHeaders, POST } from "../../../fetching/http.fetching.js";

const ForgotPasswordForm = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmitLoginForm = async (e) => {
    try {
      e.preventDefault();
      const form_HTML = e.target;
      const form_Values = new FormData(form_HTML);
      const form_fields = {
        email: "",
      };
      const form_values_object = extractFormData(form_fields, form_Values);

      const body = await POST("https://back-drab-three.vercel.app/api/auth/forgot-password", {
        headers: getUnnauthenticatedHeaders(),
        body: JSON.stringify(form_values_object),
      });

      console.log("Respuesta del backend:", body);

      if (body.response.ok) {
        setSuccess("¡Anda a chequear tu mail y restablece la contraseña!");
        setError(null);
      } else {
        setError("Hubo un problema al enviar el correo. Intenta nuevamente.");
        setSuccess(null);
      }
      console.log({ body });
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Ocurrió un error inesperado. Por favor, intenta nuevamente.");
      setSuccess(null);
    }
  };

  return (
    <div>
      {
      success && (
        <div className="modal success-modal">
          <div className="modal-content">
            <h4>Éxito</h4>
            <p>{success}</p>
            <button onClick={() => setSuccess(null)}>Cerrar</button>
          </div>
        </div>
      )}

      {error && (
        <div className="modal error-modal">
          <div className="modal-content">
            <h4>Error</h4>
            <p>{error}</p>
            <button onClick={() => setError(null)}>Cerrar</button>
          </div>
        </div>
      )}

      <form className="forgot-form" onSubmit={handleSubmitLoginForm}>
        <h1>Recupera tu contraseña</h1>
        <p>
          Enviaremos los pasos para que restablezcas tu contraseña al email que ingreses aquí ⬇️.
        </p>
        <div>
          <label htmlFor="email">Ingrese su email:</label>
          <input name="email" id="email" placeholder="pepe@gmail.com" />
        </div>
        <button type="submit">Enviar mail</button>
        <span>
          Si tienes cuenta puedes <Link to="/login">iniciar sesión</Link>
        </span>
        <span>
          Si aún no tienes cuenta puedes <Link to="/register">Registrarte</Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
