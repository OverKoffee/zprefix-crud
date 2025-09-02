import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login.jsx";
import Users from "./components/Users.jsx";
import Items from "./components/Items.jsx";

import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/items" element={<Items />} />
        </Routes>
      </div>
    </>
  );
}
