import { createContext, useContext, useState } from "react";
import { workSpaces } from "../data/data";

export const WorkspacesContext = createContext();

export const WorkspacesContextProvider = ({ children }) => {
  const [workSpacesData, setWorkSpacesData] = useState(workSpaces);

  const createWorkspace = (workspaceName, channelName) => {
    const newWorkspace = {
      id: crypto.randomUUID(),
      name: workspaceName,
      thumbnail: "defaultWorkSpaceImage.png",
      channels: [
        {
          id: crypto.randomUUID(),
          name: channelName,
          messages: [],
        },
      ],
    };
    setWorkSpacesData([...workSpacesData, newWorkspace]);
  };

  return (
    <WorkspacesContext.Provider value={{ workSpaces: workSpacesData, createWorkspace }}>
      {children}
    </WorkspacesContext.Provider>
  );
};

export const useWorkspacesContext = () => {
  return useContext(WorkspacesContext);
};
