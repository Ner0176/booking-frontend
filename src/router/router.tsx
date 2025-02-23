import {
  AuthForm,
  CalendarDashboard,
  ClassesManagementDashboard,
  PoliciesDashboard,
  ProfileDashboard,
  SettingsDashboard,
  Sidebar,
  UserBookingsDashboard,
  UsersDashboard,
} from "../components";
import { useUser } from "../hooks";
import { InvalidRoute, ProtectedRoute } from "./router.content";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

export const AppRouter = () => {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthForm type="Login" />} path="/login" />
        <Route element={<AuthForm type="SignUp" />} path="/register" />
        <Route
          element={
            <Sidebar>{!user ? <Navigate to={"/login"} /> : <Outlet />}</Sidebar>
          }
        >
          <Route path="/" element={<CalendarDashboard />} />
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
