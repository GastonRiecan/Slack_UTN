import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element="home" />
        <Route path="/workspace/new" element="New workspace" />
        <Route path="/workspace/:id_workspace/:id_canal" element="Channel" />
      </Routes>
    </main>
  );
};

export default App;
