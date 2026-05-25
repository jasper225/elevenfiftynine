import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

import LandingPage    from "./pages/LandingPage";
import LoginPage      from "./pages/LoginPage";
import RegisterPage   from "./pages/RegisterPage";
import DashboardPage  from "./pages/DashboardPage";
import CoursePage      from "./pages/CoursePage";
import SemesterPage  from "./pages/SemesterPage";
import ProfilePage    from "./pages/ProfilePage";
import NotFoundPage   from "./pages/NotFoundPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  const { user } = useAuthStore();

  return (
    <Routes>
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard"              element={<DashboardPage />} />
        <Route path="/semester/:semesterId" element={<SemesterPage />} />
        <Route path="/course/:courseId"         element={<CoursePage />} />
        <Route path="/profile"               element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
