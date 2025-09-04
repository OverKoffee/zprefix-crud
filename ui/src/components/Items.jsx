import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import NavHeader from "./NavHeader";

export default function Items() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalTask, setModalTask] = useState(null);

  const currentUserID = localStorage.getItem("currentUserID");
  const guestUser = localStorage.getItem("guest") === "true";

  const [view, setView] = useState(guestUser ? "allInventory" : "myInventory");

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

  // stay on 'My Inventory' or 'All Inventory' when delete/edit
  function refreshViewTracker() {
    view === "myInventory" ? getLoggedInUserItems() : getAllItems();
  }

  useEffect(() => {
    refreshViewTracker();
  }, [view]);

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
        refreshViewTracker();
      } else {
        alert(`Not allowed to delete this item.`);
      }
    } catch (err) {
      console.log(`Failed to delete item.`, err);
    }
  }

  async function handleModalSaveClick() {
    try {
      if (modalTask === "add") {
        await fetch(`http://localhost:5000/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...selectedItem, user_id: currentUserID }),
        });
      } else if (modalTask === "edit") {
        await fetch(`http://localhost:5000/items/${selectedItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...selectedItem, user_id: currentUserID }),
        });
      }
      setSelectedItem(null);
      setModalTask(null);
      refreshViewTracker();
    } catch (err) {
      console.log("Modal save failed.", err);
    }
  }

  return (
    <>
      <NavHeader />

      <h2>Item Inventory</h2>
      <div style={{ marginBottom: "30px" }}>
        {!guestUser && (
          <>
            <button
              style={{ marginRight: "20px" }}
              onClick={() => {
                setSelectedItem({
                  item_name: "",
                  description: "",
                  quantity: 1,
                });
                setModalTask("add");
              }}
            >
              Add Item
            </button>

            <button
              onClick={() => setView("myInventory")}
              style={{ marginRight: "20px" }}
            >
              My Inventory
            </button>
          </>
        )}

        <button onClick={() => setView("allInventory")}>All Inventory</button>
      </div>

      <div className="items-container">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onDelete={handleDelete}
            guestUser={guestUser}
            onClick={() => {
              setSelectedItem(item);
              setModalTask("view");
            }}
          />
        ))}
      </div>

      {selectedItem && (
        <div
          className="modal-fullview-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedItem.item_name || "New Item"}</h2>

            <div>
              <strong>Item: </strong>
              {modalTask === "view" ? (
                selectedItem.item_name
              ) : (
                <input
                  type="text"
                  className="item-field"
                  value={selectedItem.item_name}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      item_name: e.target.value,
                    })
                  }
                />
              )}
            </div>

            {selectedItem.first_name && (
              <div>
                <strong>Added By: </strong> {selectedItem.first_name}{" "}
                {selectedItem.last_name}
              </div>
            )}

            <div>
              <strong>Quantity: </strong>
              {modalTask === "view" ? (
                selectedItem.quantity
              ) : (
                <input
                  type="number"
                  className="item-field"
                  value={selectedItem.quantity}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      quantity: e.target.value,
                    })
                  }
                />
              )}
            </div>

            <div>
              <strong>Description: </strong>
              {modalTask === "view" ? (
                selectedItem.description
              ) : (
                <textarea
                  className="item-field"
                  value={selectedItem.description}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      description: e.target.value,
                    })
                  }
                />
              )}
            </div>

            <div style={{ alignSelf: "center" }}>
              {!guestUser &&
                modalTask === "view" &&
                selectedItem.user_id == currentUserID && (
                  <button
                    onClick={() => setModalTask("edit")}
                    style={{ marginRight: "30px" }}
                  >
                    Edit
                  </button>
                )}

              {modalTask !== "view" && (
                <button
                  onClick={handleModalSaveClick}
                  style={{ marginRight: "30px" }}
                >
                  Save
                </button>
              )}

              <button onClick={() => setSelectedItem(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
