import { createContext, useEffect, useState } from "react";
import { DELETE, getAuthenticatedHeaders, POST, PUT } from "../../fetching/http.fetching";
import PropTypes from "prop-types";
import { getData } from "../helpers/localStorage";

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
  }, [setWorkSpacesData]);
 
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
    let newMessage = {
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

    if (!response.ok) {
      throw new Error(`Failed to create message. Status: ${response.status}`);
    }

    newMessage = response.payload.newMessage;  
    newMessage.id = response.payload.newMessage.id; 
      setWorkSpacesData((prevWorkSpaces) =>
        prevWorkSpaces.map((workspace) => {
          if (workspace._id === workspaceId) {
            return {
              ...workspace,
              channels: workspace.channels.map((channel) => {
                if (channel.id === channelId) {
                  return {
                    ...channel,
                    messages: [...channel.messages, newMessage],
                  };
                }
                return channel;
              }),
            };
          }
          return workspace;
        })
      );

      return newMessage;
    } catch (error) {
      console.error("Error al crear el mensaje:", error);
      return null;
    }
  };

  const updateMessage = async (messageId, newContent, workspaceId, channelId) => {
    const updatedMessage = {
      userID: "1",
      content: newContent,
      workspaceId,
      channelId,
      timeStamp: new Date().toISOString(),
    };
    
    try {
      const response = await PUT(
        `${backendUrl}/api/messages/${workspaceId}/${channelId}/${messageId}`,
        {
          headers: getAuthenticatedHeaders(),
          body: JSON.stringify(updatedMessage),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to update message. Status: ${response.status}`);
      }
      
      const updatedMessagecontent = response.payload.updatedMessage; 
  
      setWorkSpacesData((prevWorkSpaces) =>
        prevWorkSpaces.map((workspace) => {
          if (workspace._id === workspaceId) {
            return {
              ...workspace,
              channels: workspace.channels.map((channel) => {
                if (channel.id === channelId) {
                  return {
                    ...channel,
                    messages: channel.messages.map((msg) =>
                      msg.id === messageId ? { ...msg, content: updatedMessagecontent } : msg
                    ),
                  };
                }
                return channel;
              }),
            };
          }
          return workspace;
        })
      );
  
      return updatedMessagecontent;
    } catch (error) {
      console.error("Error al actualizar el mensaje:", error);
      return null;
    }
  };
  

  const deleteMessage = async (messageId, workspaceId, channelId) => {
    console.log("ID del mensaje que se va a eliminar:", messageId);
  
    try {
      const response = await DELETE(
        `${backendUrl}/api/messages/${workspaceId}/${channelId}/${messageId}`,
        { headers: getAuthenticatedHeaders() }
      );
  
      if (!response.ok) {
        throw new Error(`Fallo al eliminar el mensaje. Status: ${response.status}`);
      }
  
      console.log("Mensaje eliminado correctamente:", messageId);
  
      setWorkSpacesData((prevWorkSpaces) =>
        prevWorkSpaces.map((workspace) => {
          if (workspace._id === workspaceId) {
            return {
              ...workspace,
              channels: workspace.channels.map((channel) => {
                if (channel.id === channelId) {
                  return {
                    ...channel,
                    messages: channel.messages.filter((msg) => msg.id !== messageId),
                  };
                }
                return channel;
              }),
            };
          }
          return workspace;
        })
      );
  
      return messageId;
    } catch (error) {
      console.error("Error al eliminar el mensaje:", error);
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
        updateMessage,
        deleteMessage,
        setWorkSpacesData,
        isLoading
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
};

WorkspacesContextProvider.propTypes = {
  children: PropTypes.func.isRequired,
};
