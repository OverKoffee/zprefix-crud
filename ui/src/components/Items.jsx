import { useState, useEffect } from "react";

export default function Items() {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const res = await fetch(`http://localhost:5000/items`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.log(`getItems failed.`, err);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            Item: {item.item_name} Description: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
