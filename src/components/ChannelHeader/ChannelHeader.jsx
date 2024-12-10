import { Link } from "react-router-dom";
import "./styles.css";
import { useIsMobile } from "../../../Hooks/useIsMobile";

const ChannelHeader = ({ workSpace, toggleMenuOpen, isMenuOpen }) => {
  const isMobile = useIsMobile();
  const icon = isMenuOpen ? (
    <i className="bi bi-x-circle"></i>
  ) : (
    <i className="bi bi-list"></i>
  );

  return (
    <header>
     {/*  <h2>{workSpace.name}</h2> */}
      <Link className="salir-link" to="/">
        <h2>Salir</h2>
      </Link>

      {isMobile ? (
        <button className="toggle-btn" onClick={toggleMenuOpen}>
          {icon}
        </button>
      ) : null}
    </header>
  );
};

export default ChannelHeader;
