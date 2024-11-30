import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET, PUT } from "../../../fetching/http.fetching";
import { getAuthenticatedHeaders } from "../../../fetching/http.fetching";

const EditContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();


  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await GET(`/api/contacts/${contactId}`, {
          headers: getAuthenticatedHeaders(),
        });

        if (response.ok && response.contact) {
          setContact(response.contact); 
        } else {
          setError("Contacto no encontrado.");
        }
      } catch (error) {
        console.error("Error al obtener los detalles del contacto:", error);
        setError("Hubo un error al cargar los datos del contacto.");
      }
    };

    fetchContactDetails();
  }, [contactId]);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await PUT(`/api/contacts/${contactId}`, {
        headers: getAuthenticatedHeaders(),
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setSuccess("Contacto actualizado correctamente.");
        setError(null);
        setTimeout(() => {
          navigate("/contacts");
        }, 2000);
      } else {
        setError("Hubo un problema al actualizar el contacto.");
      }
    } catch (error) {
      console.error("Error al actualizar el contacto:", error);
      setError("Ocurrió un error inesperado. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-contact-form">
      <h1>Editar Contacto</h1>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Actualizando..." : "Actualizar Contacto"}
        </button>
      </form>

      <span>
        <button onClick={() => navigate("/contacts")}>Volver a la lista</button>
      </span>
    </div>
  );
};

export default EditContact;
