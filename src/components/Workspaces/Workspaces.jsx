import { useWorkspacesContext } from "../../contexts/WorkspacesContext";
import { Link } from "react-router-dom";
import "./styles.css";

const Workspaces = () => {
  const { workSpaces } = useWorkspacesContext();

  return (
    <>
      <div className="section-wrapper">
        {workSpaces.map((workSpace) => (
          <section className="workspaces" key={workSpace.id}>
            <img src={`images/workspaces/${workSpace.thumbnail}`} />
            <span>{workSpace.name}</span>
            <Link
              className="entrar-link"
              to={`/workspace/${workSpace.id}/${workSpace.channels[0].id}`}
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
