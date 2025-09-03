import { useState } from "react";

export default function NewItemCard({ onAdd, onCancel }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const currentUserID = localStorage.getItem("currentUserID");

  async function addItem() {
    try {
      const res = await fetch(`http://localhost:5000/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUserID,
          item_name: itemName,
          description,
          quantity,
        }),
      });

      const data = await res.json();
      onAdd();
    } catch (err) {
      console.log(`Failed to create new item.`, err);
      alert(`Failed to create new item.`);
    }
  }

  return (
    <div className="item-card">
      <div>
        <button
          className="item-button"
          style={{ marginRight: "15px" }}
          onClick={addItem}
        >
          Save New Item
        </button>
        <button className="item-button" onClick={onCancel}>
          Cancel
        </button>
      </div>

      <div>
        <strong>Item: </strong>
        <input
          className="item-field"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>

      <div>
        <strong>Description: </strong>
        <br />
        <textarea
          className="item-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <strong>Quantity: </strong>
        <input
          type="number"
          className="item-field"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
    </div>
  );
}
