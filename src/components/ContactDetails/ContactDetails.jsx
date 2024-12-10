import { useEffect, useState } from "react";
import { GET } from "../../../fetching/http.fetching";
import { useParams } from "react-router-dom";

const ContactDetails = () => {
  const [contact, setContact] = useState(null);
  const { contactId } = useParams();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await GET(`/api/contacts/${contactId}`);
        setContact(response.contact);
      } catch (error) {
        console.error("Error al obtener el contacto", error);
      }
    };

    fetchContact();
  }, [contactId]);

  if (!contact) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Detalles del Contacto</h2>
      <p><strong>Nombre:</strong> {contact.name}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Teléfono:</strong> {contact.phone}</p>
    </div>
  );
};

export default ContactDetails;
