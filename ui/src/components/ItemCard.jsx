export default function ItemCard({ item, onDelete, guestUser, onClick }) {
  const itemName = item.item_name || "";
  const description = item.description || "";
  const quantity = item.quantity || 1;

  const currentUserID = localStorage.getItem("currentUserID");

  return (
    <>
      <div className="item-card" onClick={onClick}>
        <div>
          {!guestUser && item.user_id == currentUserID && (
            <>
              <button
                className="item-button delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>

        <div>
          <strong>Item: </strong>
          {itemName}
        </div>

        <div>
          <strong>Added By: </strong> {item.first_name} {item.last_name}
        </div>

        <div>
          <strong>Quantity: </strong>
          {quantity}
        </div>

        <div>
          <strong>Description: </strong>
          <br />
          <textarea
            readOnly
            className="item-textarea"
            value={
              description.length > 100
                ? description.slice(0, 100).concat("...")
                : description
            }
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </>
  );
}
