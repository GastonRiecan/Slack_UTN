import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import useCustomForm from "../../../Hooks/useCustomForm.jsx";
import { getUnnauthenticatedHeaders, POST,  } from "../../../fetching/http.fetching.js";

const RegisterForm = () => {
  const form_fields = {
    name: "",
    email: "",
    password: "",
  };

  const { form_values_state, handleChangeInputValue } = useCustomForm(form_fields);
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_API_URL;

  console.log("BACKEND URL",backendUrl);
  
  
  const handleSubmitRegisterForm = async (e) => {
    try {
    e.preventDefault();

    const body = await POST(`${backendUrl}/api/auth/register`,
      {
        headers: getUnnauthenticatedHeaders(),
        mode: "no-cors",
        body: JSON.stringify(form_values_state)
      }
    )
    

    if (body.ok) {
            
      sessionStorage.setItem('access_token', body.payload.accessToken);
      
      alert("Registro Exitoso, anda a revisar tu casilla de mail!!");
      navigate('/login');
    } else {
      console.error("Error en el registro:", body.message);
    }
  } catch (error) {
    console.error(error);
  }
};

      
  return (
    <div className="register-form">
      <h1>Registrate en nuestra web</h1>
      <form onSubmit={handleSubmitRegisterForm}>
        <div>
          <label htmlFor="name">Ingrese su nombre:</label>
          <input
            name="name"
            id="name"
            placeholder="Pepe Suarez"
            onChange={handleChangeInputValue}
          />
        </div>
        <div>
          <label htmlFor="email">Ingrese su email:</label>
          <input
            name="email"
            id="email"
            placeholder="Pepe@gmail.com"
            onChange={handleChangeInputValue}
          />
        </div>
        <div>
          <label htmlFor="password">Ingrese su contraseña:</label>
          <input
            name="password"
            id="password"
            placeholder="***"
            onChange={handleChangeInputValue}
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      <span>
        Si ya tienes cuenta puedes ir a <Link to="/login">Login</Link>
      </span>
    </div>
  );
};

export default RegisterForm;
