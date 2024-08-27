import { LoginPage, SignUpPage } from "../pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignUpPage />} path="/register" />
      </Routes>
    </BrowserRouter>
  );
};
