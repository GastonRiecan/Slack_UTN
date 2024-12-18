import { useState, useEffect, createContext, useContext } from "react";
import { useWorkspacesContext } from "../../Hooks/useWorkspaceContext.js"
//import { getData } from "../helpers/localStorage";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { setWorkSpacesData } = useWorkspacesContext(); 
  const access_token = sessionStorage.getItem("access_token");
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(
    Boolean(access_token)
  );
  //const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");
    if (access_token) {
      setIsAuthenticatedUser(true);
    /*  const fetchWorkspaces = async () => {
        try {
          const data = await getData();
          setWorkSpacesData(data);          
        } catch (error) {
          console.error("Error al obtener los workspaces:", error);
        } finally {
          setIsLoading(false);
        }
      };
    
      fetchWorkspaces(); */
    }
  }, [access_token, setWorkSpacesData]);

  const logout = () => {
    sessionStorage.removeItem("access_token");
    setIsAuthenticatedUser(false);
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        isAuthenticatedUser,
        //isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export const useAuthContext = () => {
    return useContext(AuthContext) 
}
