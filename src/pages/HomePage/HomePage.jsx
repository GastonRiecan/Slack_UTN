import Workspaces from "../../components/Workspaces/Workspaces.jsx";
import "./styles.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a Slack</h1>
      <h2>Entornos de trabajo:</h2>
      <Workspaces />
    </div>
  );
};

export default HomePage;
