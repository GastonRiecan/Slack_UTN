import { Link } from "react-router-dom";

const ChannelHeader = ({ workSpace, toggleMenuOpen, isMenuOpen, isMobile }) => {
  const icon = isMenuOpen ? "❌" : "⏹️";
	
  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      <h2>{workSpace.name}</h2>
      <Link to="/">
        <h2>Salir</h2>
      </Link>

      {isMobile ? <button onClick={toggleMenuOpen}>{icon}</button> : null}
    </header>
  );
};

export default ChannelHeader;
