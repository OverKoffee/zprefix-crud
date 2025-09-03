import { useNavigate } from "react-router-dom";

export default function NavHeader() {
  const navigate = useNavigate();
  return (
    <div>
      <button className="home-button" onClick={() => navigate("/")}>
        Login Home
      </button>
    </div>
  );
}
