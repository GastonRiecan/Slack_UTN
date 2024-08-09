import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NewWorkspacePage from "./pages/NewWorkspacePage/NewWorkspacePage";
import WorkspacePage from "./pages/WorkspacePage/WorkspacePage";
import { WorkspacesContextProvider } from "./contexts/WorkspacesContext";

const App = () => {
  return (
    <main>
      <WorkspacesContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workspace/new" element={<NewWorkspacePage />} />
          <Route
            path="/workspace/:id_workspace/:id_channel"
            element={<WorkspacePage />}
          />
        </Routes>
      </WorkspacesContextProvider>
    </main>
  );
};

export default App;
