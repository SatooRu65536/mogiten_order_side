import styles from "./index.module.scss";
import { itemGroup } from "../../const/items";
import { entries } from "../../utils";
import ItemCard from "./ItemCard";

export default function ItemList() {
  return (
    <section className={styles.item_list}>
      {entries(itemGroup).map(([category, items]) => (
        <div key={category} className={styles.category}>
          <h2 className={styles.category_name}>{category}</h2>

          {items.map((item) => (
            <ItemCard key={item.name} item={item} />
          ))}
        </div>
      ))}
    </section>
  );
}
