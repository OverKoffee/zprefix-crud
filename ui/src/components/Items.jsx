import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";

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
      {items.map((item) => (
        <ItemCard item={item} />
      ))}
    </div>
  );
}
