// useWorkspacesContext.js
import { useContext } from "react";
import { WorkspacesContext } from "../src/contexts/WorkspacesContext.jsx";

export const useWorkspacesContext = () => {
    return useContext(WorkspacesContext);
};
