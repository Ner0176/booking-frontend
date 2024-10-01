import { LoginPage, SignUpPage } from "../pages";
import { Dashboard } from "../components/dashboard";
import { InvalidRoute, ProtectedRoute } from "./router.content";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignUpPage />} path="/register" />
        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard />} path="/" />
        </Route>
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </BrowserRouter>
  );
};
