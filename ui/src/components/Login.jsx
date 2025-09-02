import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1>Hi there!</h1>
      </div>
      <div>
        <button className="mb-10" onClick={() => navigate("/users")}>
          Users
        </button>
        <button onClick={() => navigate("/items")}>Items</button>
      </div>
    </>
  );
}
