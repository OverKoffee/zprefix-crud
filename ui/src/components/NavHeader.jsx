import { useNavigate } from "react-router-dom";

export default function NavHeader() {
  const navigate = useNavigate();

  const currentUsername = localStorage.getItem("currentUsername");

  return (
    <div>
      <button className="home-button" onClick={() => navigate("/")}>
        Login Home
      </button>
      <h1>Welcome {currentUsername}!</h1>
    </div>
  );
}
