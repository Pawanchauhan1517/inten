import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              // remove token
    navigate("/login");    // redirect
  };

  return (
    <nav className="bg-indigo-600 p-4 flex justify-between items-center">
      <h1 className="text-white font-bold text-lg">
        Task Manager
      </h1>

      <button
        onClick={handleLogout}
        className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-gray-100"
      >
        Logout
      </button>
    </nav>
  );
}
