import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import TasksPage from "./pages/TasksPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { getAccessToken, login, logout } from "./services/auth";
import AddForm from "./components/AddForm";

function App() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(getAccessToken());

  const handleLogin = async (username, password) => {
    try {
      const response = await login(username, password);
      console.log(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      setAccessToken(response.data.accessToken);
      navigate("/tasks");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
    }
  };

  const handleLogout = () => {
    logout();
    setAccessToken(null);
    navigate("/login");
  };

  return (
    <>
      <NavBar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/new" element={<AddForm />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logIn" element={<LogInPage onLogin={handleLogin} />} />
      </Routes>
    </>
  );
}

export default App;
