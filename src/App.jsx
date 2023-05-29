import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";
import SettingsPage from "./pages/SettingsPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import Root from "./routes/root";
import MessagesPage from "./pages/MessagesPage";
import MessangerLayout from "./routes/MessangerLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />
        <Route path="/user/:id" element={<ProfilePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/messages" element={<MessangerLayout />}>
        <Route index element={<MessagesPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
