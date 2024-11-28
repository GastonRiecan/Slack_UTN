//Guardar globalmente un estado que dice si estamos o no autentificados.
//Decinoms autentificado a cualquier usuario que tenga un acces-token cargado en el local/sessionStorage.

import { useState, useEffect, createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const access_token = sessionStorage.getItem("access_token");
  //Estado booleano
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(
    Boolean(access_token)
  );

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");
    if (access_token) {
      setIsAuthenticatedUser(true);
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("access_token");
    setIsAuthenticatedUser(false);
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        isAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
    return useContext(AuthContext) // Devuelve un objeto con { logout, isAuthenticatedUser }
}
