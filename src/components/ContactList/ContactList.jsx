import { useEffect, useState } from "react";
import { GET, DELETE, getAuthenticatedHeaders } from "../../../fetching/http.fetching";
import { useNavigate } from "react-router-dom";
import AddContactForm from "../AddContactForm/AddContactForm"; 

const ContactList = ({ workspaceId }) => {
  const [contacts, setContacts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await GET(`http://localhost:3000/api/contacts/get/${workspaceId}`, {
          headers: getAuthenticatedHeaders(),
        });
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
        const response = await DELETE(`/api/contacts/${contactId}`, {
          headers: { "Content-Type": "application/json" },
        });

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

      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? "Cancelar" : "Crear Nuevo Contacto"}
      </button>

      {showCreateForm && <AddContactForm workspaceId={workspaceId} refreshContacts={() => setContacts([])} />}

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
