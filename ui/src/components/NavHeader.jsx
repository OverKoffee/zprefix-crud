import { useNavigate } from "react-router-dom";

export default function NavHeader() {
  const navigate = useNavigate();
  const guestUser = localStorage.getItem("guest" === "true");
  const username = localStorage.getItem("currentUsername");

  return (
    <div>
      <button className="home-button" onClick={() => navigate("/")}>
        Login Home
      </button>
      <h1>Welcome {guestUser ? "guest" : username}!</h1>
    </div>
  );
}
