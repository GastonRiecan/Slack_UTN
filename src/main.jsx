import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WorkspacesContextProvider } from './contexts/WorkspacesContext.jsx';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import App from "../App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WorkspacesContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </WorkspacesContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
