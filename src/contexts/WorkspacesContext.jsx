import { createContext, useEffect, useState } from "react";
import { getData } from "../helpers/localStorage";
import { getAuthenticatedHeaders, POST } from "../../fetching/http.fetching";
import PropTypes from "prop-types";

export const WorkspacesContext = createContext();

export const WorkspacesContextProvider = ({ children }) => {
  const [workSpacesData, setWorkSpacesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const data = await getData();
        setWorkSpacesData(data);
      } catch (error) {
        console.error("Error al obtener los workspaces:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

  const updateMessages = (workspaceId, channelId, newMessage = null, deleteMessageId = null) => {
    setWorkSpacesData((prevWorkSpaces) =>
      prevWorkSpaces.map((workspace) => {
        if (workspace._id === workspaceId) {
          return {
            ...workspace,
            channels: workspace.channels.map((channel) => {
              if (channel.id === channelId) {
                if (newMessage) {
                  return {
                    ...channel,
                    messages: [...channel.messages, newMessage],
                  };
                }
                if (deleteMessageId) {
                  return {
                    ...channel,
                    messages: channel.messages.filter((msg) => msg.id !== deleteMessageId),
                  };
                }
              }
              return channel;
            }),
          };
        }
        return workspace;
      })
    );
  };

  const createWorkspace = async (workspaceName, channelName) => {
    const newWorkspace = {
      name: workspaceName,
      thumbnail: "defaultWorkSpaceImage.png",
      channels: [
        {
          name: channelName,
          messages: [],
        },
      ],
    };

    try {
      const response = await POST(
        `${backendUrl}/api/workspaces/create`,
        {
          headers: getAuthenticatedHeaders(),
          body: JSON.stringify(newWorkspace),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear el workspace");
      }

      const savedWorkspace = await response.json();
      setWorkSpacesData([...workSpacesData, savedWorkspace]);
      return savedWorkspace;
    } catch (error) {
      console.error("Error al crear el workspace:", error);
    }
  };

  const createChannel = async (workspaceId, channelName) => {
    const newChannel = {
      name: channelName,
      messages: [],
    };
  
    try {
      const response = await POST(
        `${backendUrl}/api/workspaces/${workspaceId}/channels`,
        {
          headers: getAuthenticatedHeaders(),
          body: JSON.stringify(newChannel),
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al crear el canal");
      }
  
      const updatedWorkspace = await response.json();
  
      setWorkSpacesData((prevWorkSpaces) =>
        prevWorkSpaces.map((workspace) =>
          workspace._id === workspaceId
            ? { ...workspace, channels: updatedWorkspace.channels }  
            : workspace
        )
      );
  
      return updatedWorkspace.channels.find(
        (channel) => channel.name === channelName
      );
    } catch (error) {
      console.error("Error al crear el canal:", error);
      return null;
    }
  };
  

  const createMessage = async (message, workspaceId, channelId) => {
    const newMessage = {
      userID: "1",
      timeStamp: new Date().toISOString(),
      content: message,
      workspaceId,
      channelId,
    };

    try {
      const response = await POST(
        `${backendUrl}/api/messages/${workspaceId}/${channelId}/create`,
        {
          headers: getAuthenticatedHeaders(),
          body: JSON.stringify(newMessage),
        }
      );
      const updatedMessage = await response.json();

      console.log("Mensaje creado:", newMessage);
      

      setWorkSpacesData((prevWorkSpaces) =>
        prevWorkSpaces.map((workspace) => {
          if (workspace._id === workspaceId) {
            return {
              ...workspace,
              channels: workspace.channels.map((channel) => {
                if (channel.id === channelId) {
                  return {
                    ...channel,
                    messages: [...channel.messages, updatedMessage],
                  };
                }
                return channel;
              }),
            };
          }
          return workspace;
        })
      );

      return updatedMessage;
    } catch (error) {
      console.error("Error al crear el mensaje:", error);
      return null;
    }
  };

  return (
    <WorkspacesContext.Provider
      value={{
        workSpaces: workSpacesData,
        createWorkspace,
        createChannel,
        createMessage,
        updateMessages,
        isLoading,
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
};

WorkspacesContextProvider.propTypes = {
  children: PropTypes.func.isRequired,
};
