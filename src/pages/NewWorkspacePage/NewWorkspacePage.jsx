import "./styles.css";
import WorkspaceCreationForm from "../../components/WorkspaceCreationForm/WorkspaceCreationForm";

const NewWorkspacePage = () => {
  return (
    <div className="new-workspace-container">
      <h1>Crea un entorno de trabajo</h1>
      <WorkspaceCreationForm />
    </div>
  );
};

export default NewWorkspacePage;
