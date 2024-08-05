import { Link } from "react-router-dom";
import "./styles.css";

const ChannelHeader = ({ workSpace, toggleMenuOpen, isMenuOpen, isMobile }) => {
  const icon = isMenuOpen ? "❌" : "⏹️";

  return (
    <header>
      <h2>{workSpace.name}</h2>

      <Link to="/">
        <h2>Salir</h2>
      </Link>

      {isMobile ? <button onClick={toggleMenuOpen}>{icon}</button> : null}
    </header>
  );
};

export default ChannelHeader;
