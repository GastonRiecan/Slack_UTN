import { useState } from "react";
import { getAuthenticatedHeaders, POST } from "../../../fetching/http.fetching";
import { useParams } from "react-router-dom";

const AddContact = ({ workspaceId, refreshContacts }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null);
  const {user_id} = useParams()

  console.log(user_id);
  

  const validateForm = () => {


    if (!name || !email || !phone) {
      setError("Todos los campos son obligatorios.");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Por favor ingrese un correo electrónico válido.");
      return false;
    }

    setError(null); 
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    

    //if (!validateForm()) return;
    
    setLoading(true); 
    console.log(getAuthenticatedHeaders());
    console.log(sessionStorage.getItem('access_token'));
    

    try {
      const response = await POST(`http://localhost:3000/api/contacts/${user_id}`, {
        headers: getAuthenticatedHeaders(),
        body: JSON.stringify({ email }),
      });
      console.log(response);
      

      if (response.ok) {
        setSuccess("Contacto agregado exitosamente.");
        setName(""); 
        setEmail(""); 
        setPhone(""); 
        refreshContacts(); 
      } else {
        setError("Hubo un problema al agregar el contacto.");
      }
    } catch (error) {
      console.error("Error al agregar contacto:", error);
      setError("Error al agregar contacto. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Agregar Contacto</h2>

      {success && <p style={{ color: "green" }}>{success}</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
       {/*  <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <input
          type="text"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /> */}
        <button type="submit" disabled={loading}>
          {loading ? "Agregando..." : "Agregar"}
        </button>
      </form>
    </div>
  );
};

export default AddContact;
