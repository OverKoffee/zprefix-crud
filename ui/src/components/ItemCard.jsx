import { useState } from "react";

export default function ItemCard({ item, onDelete, guestUser, onClick }) {
  const [itemName, setItemName] = useState(item.item_name || "");
  const [description, setDescription] = useState(item.description || "");
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [editMode, setEditMode] = useState(false);

  const currentUserID = localStorage.getItem("currentUserID");

  async function updateItem() {
    try {
      const res = await fetch(`http://localhost:5000/items/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUserID,
          item_name: itemName,
          description,
          quantity,
        }),
      });
      const data = await res.json();

      data ? setEditMode(false) : alert(`Not allowed. You are not the owner.`);
    } catch (err) {
      console.log(`Error updating item.`, err);
      alert(`Failed to update item.`);
    }
  }

  function handleEditClick() {
    editMode ? updateItem() : setEditMode(true);
  }

  function handleCancelClick() {
    setItemName(item.item_name || "");
    setDescription(item.description || "");
    setQuantity(item.quantity || 1);
    setEditMode(false);
  }

  return (
    <>
      <div className="item-card" onClick={onClick}>
        <div>
          {!guestUser && (
            <>
              <button
                className="item-button"
                style={{ marginRight: "15px" }}
                onClick={() => handleEditClick()}
              >
                {!editMode ? "Edit Item" : "Submit Update"}
              </button>

              {editMode && (
                <button
                  className="item-button"
                  style={{ marginRight: "15px" }}
                  onClick={() => handleCancelClick()}
                >
                  Cancel
                </button>
              )}

              <button
                className="item-button delete-button"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>

        <div>
          <strong>Item: </strong>
          {!editMode ? (
            itemName
          ) : (
            <input
              className="item-field"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          )}
        </div>

        <div>
          <strong>Added By: </strong> {item.first_name} {item.last_name}
        </div>

        <div>
          <strong>Quantity: </strong>
          {!editMode ? (
            quantity
          ) : (
            <input
              className="item-field"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          )}
        </div>

        <div>
          <strong>Description: </strong>
          <br />
          <textarea
            className={`item-textarea ${editMode ? "editable" : ""}`}
            value={
              !editMode && description.length > 100
                ? description.slice(0, 100).concat("...")
                : description
            }
            onChange={(e) => setDescription(e.target.value)}
            readOnly={!editMode}
          />
        </div>
      </div>
    </>
  );
}
