import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Users from "./components/Users.jsx";
import Items from "./components/Items.jsx";

import "./App.css";

export default function App() {
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
