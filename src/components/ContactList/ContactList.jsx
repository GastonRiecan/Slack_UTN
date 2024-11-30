import { useEffect, useState } from "react";
import { GET, DELETE } from "../../../fetching/http.fetching";
import { useNavigate } from "react-router-dom";

const ContactList = ({ workspaceId }) => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await GET(`/api/contacts/${workspaceId}`);
        setContacts(response.contacts);
      } catch (error) {
        console.error("Error al obtener los contactos", error);
      }
    };

    fetchContacts();
  }, [workspaceId]);

  const handleEdit = (contactId) => {
    navigate(`/edit-contact/${contactId}`);
  };

  const handleDelete = async (contactId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este contacto?")) {
      try {
        const response = await DELETE(`/api/contacts/${contactId}`);

        if (response.ok) {
          setContacts(contacts.filter((contact) => contact._id !== contactId));
          alert("Contacto eliminado correctamente");
        } else {
          alert("Hubo un error al eliminar el contacto");
        }
      } catch (error) {
        console.error("Error al eliminar el contacto:", error);
        alert("Error al eliminar el contacto");
      }
    }
  };

  return (
    <div>
      <h2>Lista de Contactos</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name} - {contact.email}
            <button onClick={() => handleEdit(contact._id)}>Editar</button>
            <button onClick={() => handleDelete(contact._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
