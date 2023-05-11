import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/Admin";
import HomePage from "./pages/Home";
import PortfolioPage from "./pages/Portfolio";
import ProfilePage from "./pages/Profile";
import RecordPage from "./pages/Record";
import ServicePage from "./pages/Service";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Page from "./templates/Page";

const RoutesManager = () => {
  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<HomePage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/photo" element={<PortfolioPage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
};

export default RoutesManager;
