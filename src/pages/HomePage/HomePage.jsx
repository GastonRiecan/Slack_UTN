import { useParams } from "react-router-dom";
import Workspaces from "../../components/Workspaces/Workspaces.jsx";
import "./styles.css";

const HomePage = () => {

  const {user_id} = useParams()
  return (
    <div className="home-container">
      <h1>Bienvenido a Slack</h1>
      <h2>Entornos de trabajo:</h2>
      <Workspaces user_id = {user_id} />
    </div>
  );
};

export default HomePage;
