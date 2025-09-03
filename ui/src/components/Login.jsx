import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLoginClick() {
    try {
      const res = await fetch(`http://localhost:5000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data) {
        navigate("/items");
      } else {
        alert(`Invalid login.`);
      }
    } catch (err) {
      console.log(`Error with Login.`, err);
    }
  }

  return (
    <>
      <div>
        <h1>Login!</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button
          onClick={() => {
            handleLoginClick();
          }}
        >
          Login
        </button>
      </div>

      <br />
      <div>
        <p>Test buttons</p>
        <button onClick={() => navigate("/users")}>Users</button>
        <button onClick={() => navigate("/items")}>Items</button>
      </div>
    </>
  );
}
