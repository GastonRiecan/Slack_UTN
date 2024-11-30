import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DELETE } from "../../../fetching/http.fetching";
import { getAuthenticatedHeaders } from "../../../fetching/http.fetching";

const DeleteContact = ({ contactId }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleDelete = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await DELETE(`/api/contacts/${contactId}`, {
        headers: getAuthenticatedHeaders(),
      });

      if (response.ok) {
        setSuccess("Contacto eliminado correctamente.");
        setTimeout(() => {
          navigate("/contacts");
        }, 2000);
      } else {
        setError("Hubo un problema al eliminar el contacto.");
      }
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
      setError("Ocurrió un error inesperado. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <button onClick={handleDelete} disabled={isSubmitting}>
        {isSubmitting ? "Eliminando..." : "Eliminar Contacto"}
      </button>
    </div>
  );
};

export default DeleteContact;
