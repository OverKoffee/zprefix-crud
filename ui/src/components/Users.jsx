import { useState, useEffect } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log(`getUsers failed.`, err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            User: {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
