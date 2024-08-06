import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NewWorkspacePage from "./pages/NewWorkspacePage/NewWorkspacePage";
import WorkspacePage from "./pages/WorkspacePage/WorkspacePage";

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workspace/new" element={<NewWorkspacePage />} />
        <Route path="/workspace/:id_workspace/:id_channel" element={<WorkspacePage />} />
      </Routes>
    </main>
  );
};

export default App;
