import { useNavigate } from "react-router-dom";

export default function NavHeader() {
  const navigate = useNavigate();
  const currentUserID = localStorage.getItem("currentUserID");

  return (
    <div>
      <button className="home-button" onClick={() => navigate("/")}>
        Login Home
      </button>
      <h1>Welcome {currentUserID}!</h1>
    </div>
  );
}
