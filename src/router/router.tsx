import {
  AuthForm,
  CalendarDashboard,
  HomeDashboard,
  ProfileDashboard,
  Sidebar,
  UsersDashboard,
} from "../components";
import { InvalidRoute } from "./router.content";
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
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/calendar" element={<CalendarDashboard />} />
          <Route path="/users" element={<UsersDashboard />} />
          <Route path="/profile" element={<ProfileDashboard />} />
        </Route>
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </BrowserRouter>
  );
};
