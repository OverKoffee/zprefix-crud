export default function ItemCard({ item, onDelete }) {
  return (
    <>
      <div className="item-card">
        <div>
          <strong>Item: </strong>
          {item.item_name}
        </div>

        <div>
          <strong>Description:</strong>
          {item.description.length > 100
            ? item.description.slice(1, 100).concat("...")
            : item.description}
        </div>

        <div>
          <strong>Owner:</strong> {item.user_id}
        </div>
        <div>
          <button style={{ marginRight: "15px" }}>Edit Item</button>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </div>
      </div>
    </>
  );
}
