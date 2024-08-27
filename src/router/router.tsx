import { SignUpPage } from "../pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignUpPage />} path="/login" />
      </Routes>
    </BrowserRouter>
  );
};
