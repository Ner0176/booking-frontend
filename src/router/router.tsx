import {
  AuthForm,
  ClassesManagementDashboard,
  PoliciesDashboard,
  ProfileDashboard,
  SettingsDashboard,
  UserBookingsDashboard,
  UsersDashboard,
} from "../components";
import {
  ConditionalHome,
  InvalidRoute,
  ProtectedRoute,
  SidebarLayout,
} from "./router.content";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthForm type="Login" />} path="/login" />
        <Route element={<AuthForm type="SignUp" />} path="/register" />
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<ConditionalHome />} />
          <Route path="/profile" element={<ProfileDashboard />} />
          <Route path="/policies" element={<PoliciesDashboard />} />

          <Route element={<ProtectedRoute allowViewTo="admin" />}>
            <Route path="/users" element={<UsersDashboard />} />
            <Route
              path="/management"
              element={<ClassesManagementDashboard />}
            />
            <Route path="/settings" element={<SettingsDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowViewTo="user" />}>
            <Route path="/bookings" element={<UserBookingsDashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </BrowserRouter>
  );
};
