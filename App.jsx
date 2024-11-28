import { Route, Routes } from "react-router-dom";
import HomePage from "./src/pages/HomePage/HomePage";
import NewWorkspacePage from "./src/pages/NewWorkspacePage/NewWorkspacePage";
import WorkspacePage from "./src/pages/WorkspacePage/WorkspacePage";
import { WorkspacesContextProvider } from "./src/contexts/WorkspacesContext";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import ForgotPassword from "./Screens/ForgotPassword/ForgotPassword";
import ResetPassword from "./Screens/ResetPassword/ResetPassword";
import CreateProductScreen from "./Screens/CreateProductScreen/CreateProductScreen";
import DetailProductScreen from "./Screens/DetailProductScreen/DetailProductScreen";
import { VerifyMail } from "./Screens/VerifyMail/VerifyMail";
import ProtectedRoute from "./src/components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <main>
      <WorkspacesContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:reset_token" element={<ResetPassword />}/>
          <Route path="/verify/:verificationToken" element={<VerifyMail />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/product/new" element={<CreateProductScreen />} />
            <Route
              path="/product/:product_id"
              element={<DetailProductScreen />}
            />
          </Route>
          <Route path="/workspace/new" element={<NewWorkspacePage />} />
          <Route path="/workspace/:id_workspace/:id_channel" element={<WorkspacePage />}/>
        </Routes>
      </WorkspacesContextProvider>
    </main>
  );
};

export default App;
