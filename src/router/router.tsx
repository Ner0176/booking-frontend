import {
  AuthForm,
  CalendarDashboard,
  HomeDashboard,
  UsersDashboard,
} from "../components";
import { InvalidRoute, ProtectedRoute } from "./router.content";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthForm type="Login" />} path="/login" />
        <Route element={<AuthForm type="SignUp" />} path="/register" />
        <Route element={<ProtectedRoute />}>
          <Route element={<HomeDashboard />} path="/" />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/calendar" element={<CalendarDashboard />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/users" element={<UsersDashboard />} />
        </Route>
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </BrowserRouter>
  );
};
