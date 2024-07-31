import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NewWorkspace from "./pages/NewWorkspace/NewWorkspace";
import Channel from "./pages/Channel/Channel";

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workspace/new" element={<NewWorkspace />} />
        <Route path="/workspace/:id_workspace/:id_channel" element={<Channel />} />
      </Routes>
    </main>
  );
};

export default App;
