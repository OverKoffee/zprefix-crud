import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import NewItemCard from "./NewItemCard";
import NavHeader from "./NavHeader";

export default function Items() {
  const [items, setItems] = useState([]);
  const [addingItem, setAddingItem] = useState(false);

  const currentUserID = localStorage.getItem("currentUserID");

  const getItems = async () => {
    try {
      const res = await fetch(`http://localhost:5000/items`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.log(`getItems failed.`, err);
    }
  };

  async function getAllItems() {
    try {
      const res = await fetch(`http://localhost:5000/items`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.log(`Get all items failed.`, err);
    }
  }

  async function getLoggedInUserItems() {
    try {
      const res = await fetch(
        `http://localhost:5000/users/${currentUserID}/items`
      );
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.log(`Get logged in user items failed.`, err);
    }
  }

  useEffect(() => {
    getAllItems();
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
        getAllItems();
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
      <NavHeader />
      <h2>Item Inventory</h2>
      <div style={{ marginBottom: "30px" }}>
        <button
          style={{ marginRight: "20px" }}
          onClick={() => setAddingItem(true)}
        >
          Add Item
        </button>
        <button
          onClick={() => getLoggedInUserItems()}
          style={{ marginRight: "20px" }}
        >
          My Inventory
        </button>
        <button onClick={() => getAllItems()}>All Inventory</button>
      </div>

      <div className="items-container">
        {addingItem && (
          <NewItemCard
            onAdd={() => {
              getAllItems();
              setAddingItem(false);
            }}
            onCancel={() => setAddingItem(false)}
          />
        )}

        {items.map((item) => (
          <ItemCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}
