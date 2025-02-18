import {
  AuthForm,
  CalendarDashboard,
  ClassesDashboard,
  PoliciesDashboard,
  ProfileDashboard,
  Sidebar,
  UsersDashboard,
} from "../components";
import { SettingsDashboard } from "../components/settings";
import { InvalidRoute, ProtectedRoute } from "./router.content";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthForm type="Login" />} path="/login" />
        <Route element={<AuthForm type="SignUp" />} path="/register" />
        <Route
          element={
            <Sidebar>
              <Outlet />
            </Sidebar>
          }
        >
          <Route path="/" element={<CalendarDashboard />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/users" element={<UsersDashboard />} />
            <Route path="/classes" element={<ClassesDashboard />} />
            <Route path="/settings" element={<SettingsDashboard />} />
          </Route>
          <Route path="/profile" element={<ProfileDashboard />} />
          <Route path="/policies" element={<PoliciesDashboard />} />
        </Route>
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </BrowserRouter>
  );
};
