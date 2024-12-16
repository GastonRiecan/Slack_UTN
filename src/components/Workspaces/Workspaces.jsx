import { useWorkspacesContext } from "../../../Hooks/useWorkspaceContext.js";
import { Link } from "react-router-dom";
import "./styles.css";

const Workspaces = ({user_id}) => {
  const { workSpaces, isLoading } = useWorkspacesContext();

  console.log("Workspaces en componente Workspaces:", workSpaces);
  

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (workSpaces.length === 0) {
    return <p>No hay workspaces disponibles</p>;
  }

  return (
    <>
      <div className="section-wrapper">
        {workSpaces.map((workSpace) => (
          <section className="workspaces" key={workSpace._id}>
            <img src={workSpace.thumbnail} />
            <span>{workSpace.name}</span>
            <Link
              className="entrar-link"
              to={`/workspace/${workSpace._id}/${workSpace.channels[0].id}`}
            >
              <h2>Entrar</h2>
            </Link>
          </section>
        ))}
      </div>
      <section className="new-workspace">
        <Link className="crear-entorno-link" to="/workspace/new">
          <h2>Crear Entorno</h2>
        </Link>
      </section>
    </>
  );
};

export default Workspaces;
