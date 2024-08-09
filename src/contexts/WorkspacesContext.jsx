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
    return newWorkspace;
  };

  const createChannel = (workspaceId, channelName) => {
    const newChannel = {
      id: crypto.randomUUID(),
      name: channelName,
      messages: [],
    };
    const currentWorkSpace = workSpacesData.find(
      (workSpace) => workSpace.id == workspaceId
    );

    const updatedCurrentWorkSpace = {
      ...currentWorkSpace,
      channels: [...currentWorkSpace.channels, newChannel],
    };

    const wsIndex = workSpacesData.findIndex(
      (w) => w.id == currentWorkSpace.id
    );
    const updatedWorkSpacesData = [...workSpacesData];
    updatedWorkSpacesData[wsIndex] = updatedCurrentWorkSpace;
    setWorkSpacesData(updatedWorkSpacesData);
  };

  return (
    <WorkspacesContext.Provider
      value={{ workSpaces: workSpacesData, createWorkspace, createChannel }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
};

export const useWorkspacesContext = () => {
  return useContext(WorkspacesContext);
};
