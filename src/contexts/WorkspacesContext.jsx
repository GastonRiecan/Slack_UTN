import { createContext, useContext, useEffect, useState } from "react";
import { getData, setData } from "../helpers/localStorage";

export const WorkspacesContext = createContext();

const workSpaces = getData()

export const WorkspacesContextProvider = ({ children }) => {
  const [workSpacesData, setWorkSpacesData] = useState(workSpaces);

  useEffect(() => {
    setData(workSpacesData)
  }, [workSpacesData])
  
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

  const createMessage = (message, idWorkspace, idChannel) => {
    const newMessage = {
      id: crypto.randomUUID(),
      userID: "1",
      timeStamp: new Date().toLocaleString().slice(0, -3),
      content: message,
    };

    const currentWorkSpace = workSpacesData.find(
      (workSpace) => workSpace.id == idWorkspace
    );

    const currentChannel = currentWorkSpace.channels.find(
      (channel) => channel.id == idChannel
    );

    const updatedCurrentChannel = {
      ...currentChannel,
      messages: [...currentChannel.messages, newMessage],
    };

    const chIndex = currentWorkSpace.channels.findIndex(
      (ch) => ch.id == updatedCurrentChannel.id
    );

    const updatedChannels = [...currentWorkSpace.channels];
    updatedChannels[chIndex] = updatedCurrentChannel;

    const updatedCurrentWorkSpace = {
      ...currentWorkSpace,
      channels: updatedChannels,
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
      value={{
        workSpaces: workSpacesData,
        createWorkspace,
        createChannel,
        createMessage,
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
};

export const useWorkspacesContext = () => {
  return useContext(WorkspacesContext);
};
