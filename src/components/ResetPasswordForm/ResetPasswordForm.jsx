import React from "react";
import extractFormData from "../../utils/extractFormData";
import { Link, useParams } from "react-router-dom";
import "./styles.css"



const ResetPasswordForm = () => {

	const { reset_token } = useParams()
	console.log(reset_token);
	
  const handleSubmitResetForm = (e) => {
    e.preventDefault();
    const form_HTML = e.target;
    const form_Values = new FormData(form_HTML);
    const form_fields = {
      password: "",
    };
    const form_values_object = extractFormData(form_fields, form_Values);
    fetch(`http://localhost:3000/api/auth/reset-password/${reset_token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", //Aca le indicamos al back que lo que enviamos es un JSON
      },
      body: JSON.stringify(form_values_object),
    })
      .then((response) => {
        console.log({ response });
        return response.json();
      })
      .then((body) => {
        console.log({ body });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form className="reset-form" onSubmit={handleSubmitResetForm}>
        <h1>Restablecer contraseña</h1>
        <p>Completa el formulario con la nueva contraseña para restablecer:</p>
        <div>
          <label htmlFor="password">Ingrese su nueva contraseña:</label>
          <input name="password" id="password" placeholder="***" />
        </div>
        <button type="submit">Restablecer contraseña</button>
        <span>
          Si recuerdas tu contraseña puedes{" "}
          <Link to="/login">iniciar sesion</Link>
        </span>
        <span>
          Si aun no tienes cuenta puedes <Link to="/register">Registrarte</Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
