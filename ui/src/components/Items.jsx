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

  async function handleDelete(id) {
    const user_id = localStorage.getItem("currentUserID");

    try {
      const res = await fetch(`http://localhost:5000/items/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      });

      const data = await res.json();
      if (data) {
        getItems();
      } else {
        console.log(`Not allowed to delete.`);
        alert(`Not allowed to delete this item.`);
      }
    } catch (err) {
      console.log(`Failed to delete item.`, err);
    }
  }

  return (
    <>
      <h2>Item Inventory</h2>
      <div style={{ marginBottom: "30px" }}>
        <button style={{ marginRight: "20px" }}>Add Item</button>
        <button>My Inventory</button>
      </div>
      <div className="items-container">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}
