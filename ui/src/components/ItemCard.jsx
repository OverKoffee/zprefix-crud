export default function ItemCard() {
  return (
    <>
      <ul>
        <li key={item.id}>
          Item: {item.item_name} Description: {item.description}
        </li>
      </ul>
    </>
  );
}
