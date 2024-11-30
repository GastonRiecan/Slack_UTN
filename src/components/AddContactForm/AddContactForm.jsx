import { useState } from "react";
import { POST } from "../../../fetching/http.fetching";

const AddContact = ({ workspaceId, refreshContacts }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await POST("/api/contacts", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, workspaceId }),
      });

      if (response.ok) {
        refreshContacts();  // Llama la función para refrescar la lista
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error al agregar contacto:", error);
    }
  };

  return (
    <div>
      <h2>Agregar Contacto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddContact;
