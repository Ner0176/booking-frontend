import { HomeDashboard } from "../components";
import { CalendarPage, LoginPage, SignUpPage } from "../pages";
import { InvalidRoute, ProtectedRoute } from "./router.content";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignUpPage />} path="/register" />
        <Route element={<ProtectedRoute />}>
          <Route element={<HomeDashboard />} path="/" />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/calendar" element={<CalendarPage />} />
        </Route>
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </BrowserRouter>
  );
};
