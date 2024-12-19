import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PUT, getUnnauthenticatedHeaders } from "../../../fetching/http.fetching.js";
import "./styles.css";

const ResetPasswordForm = () => {
  const { reset_token } = useParams();
  const backendUrl = import.meta.env.VITE_API_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmitResetForm = (e) => {
    e.preventDefault();
    const form_HTML = e.target;
    const form_Values = new FormData(form_HTML);
    const form_values_object = {
      password: form_Values.get("password"),
    };

    setIsSubmitting(true);

    PUT(`${backendUrl}/api/auth/reset-password/${reset_token}`, {
      headers: getUnnauthenticatedHeaders(),
      body: JSON.stringify(form_values_object),
    })
      .then((response) => {
        if (response.ok) {
          setShowSuccessModal(true);
          setShowErrorModal(false);
        } else {
          setShowSuccessModal(false);
          setShowErrorModal(true);
        }
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowSuccessModal(false);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="reset-password-container">
      {/* Modal de error */}
      {showErrorModal && (
        <div className="modal error-modal">
          <div className="modal-content">
            <h2>Error</h2>
            <p>Ocurrió un error inesperado. Intenta nuevamente.</p>
            <button onClick={() => setShowErrorModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="modal success-modal">
          <div className="modal-content">
            <h2>Éxito</h2>
            <p>Contraseña restablecida correctamente. Ahora puedes iniciar sesión.</p>
            <Link to="/login">
              <button>Ir a iniciar sesión</button>
            </Link>
            <button onClick={() => setShowSuccessModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Formulario para restablecer la contraseña */}
      <form className="reset-password-form" onSubmit={handleSubmitResetForm}>
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
