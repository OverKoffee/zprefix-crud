import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [creatingAccToggle, setCreatingAccToggle] = useState(false);
  const navigate = useNavigate();

  function resetLoginPage() {
    setCreatingAccToggle(false);
    setFirstname("");
    setLastname("");
    setUsername("");
    setPassword("");
  }

  async function handleLoginClick() {
    try {
      const res = await fetch(`http://localhost:5000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data) {
        localStorage.setItem("currentUserID", data);
        localStorage.setItem("currentUsername", username);
        localStorage.removeItem("guest");
        resetLoginPage();
        navigate("/items");
      } else {
        alert(`Invalid login.`);
      }
    } catch (err) {
      console.log(`Error with Login.`, err);
    }
  }

  async function handleCreateAccountClick() {
    try {
      const res = await fetch(`http://localhost:5000/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstname,
          last_name: lastname,
          username,
          password,
        }),
      });

      const data = await res.json();
      if (data) {
        alert(
          `Account ${username} was created successfully. You can log in now.`
        );
      } else {
        alert(`Couldn't create account.`);
      }

      resetLoginPage();
    } catch (err) {
      console.log(`Failed creating account.`, err);
      alert(`Failed creating account.`);
    }
  }

  function handleNewUserClick() {
    setCreatingAccToggle(true);
  }

  function handleGuestLoginClick() {
    localStorage.setItem("currentUserID", "guest");
    localStorage.setItem("currentUsername", "Guest (Matt/Jeff)");
    localStorage.setItem("guest", "true");
    navigate("/items");
  }

  return (
    <div>
      <h1>{creatingAccToggle ? "Create New Account" : "Login"}</h1>

      {creatingAccToggle && (
        <div>
          <input
            type="text"
            placeholder="First Name..."
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Last Name..."
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <br />
          <br />
        </div>
      )}

      <input
        type="text"
        placeholder="Username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleLoginClick();
        }}
      />

      <br />
      <br />

      {!creatingAccToggle && (
        <>
          <button
            onClick={() => handleLoginClick()}
            style={{ marginRight: "20px" }}
          >
            Login
          </button>
          <button onClick={() => handleGuestLoginClick()}>
            Login as Guest
          </button>
          <br />
          <br />
          <button onClick={() => handleNewUserClick()}>New User</button>
        </>
      )}

      {creatingAccToggle && (
        <button onClick={() => handleCreateAccountClick()}>
          Create Account
        </button>
      )}
    </div>
  );
}
