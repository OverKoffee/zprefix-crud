import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [buttonToggle, setButtonToggle] = useState(false);
  const navigate = useNavigate();

  function resetLoginPageData() {
    setButtonToggle(false);
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
        localStorage.setItem("currentUserID", data.id);
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
        alert(`Account ${username} was created successfully.`);
      } else {
        alert(`Couldn't create account.`);
      }

      resetLoginPageData();
    } catch (err) {
      console.log(`Failed creating account.`, err);
      alert(`Failed to create account.`);
    }
  }

  function handleNewUserClick() {
    setButtonToggle(true);
  }

  return (
    <div>
      <h1>{buttonToggle ? "Create New Account" : "Login"}</h1>

      {buttonToggle && (
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
      />

      <br />
      <br />

      {!buttonToggle && (
        <button onClick={() => handleLoginClick()}>Login</button>
      )}
      {buttonToggle && (
        <button onClick={() => handleCreateAccountClick()}>
          Create Account
        </button>
      )}

      <br />
      <br />

      {!buttonToggle && (
        <button onClick={() => handleNewUserClick()}>New User</button>
      )}
    </div>
  );
}
