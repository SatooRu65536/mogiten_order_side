import styles from './index.module.scss';
import { Item } from '../../../types';
import { useAtom } from 'jotai';
import { cartItemAtomFamily } from '../../../stores/item-atom';
import { useCallback, useEffect } from 'react';

interface Props {
  item: Item;
}

export default function ItemCard({ item }: Props) {
  const [{ quantity }, setCartItem] = useAtom(cartItemAtomFamily(item.name));

  const handleAdd = useCallback(() => {
    setCartItem((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  }, []);

  const handleRemove = useCallback(() => {
    setCartItem((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
  }, []);

  useEffect(() => {
    if (quantity < 0) setCartItem((prev) => ({ ...prev, quantity: 0 }));
    if (quantity > 50) setCartItem((prev) => ({ ...prev, quantity: 50 }));
  }, [quantity]);

  return (
    <div className={styles.item_card}>
      <img src={item.image} alt={item.name} />
      <div className={styles.body}>
        <h3>{item.name}</h3>
        <p>{item.price}円</p>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.increment}
          onClick={handleRemove}
          disabled={quantity <= 0}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className={styles.decrement}
          onClick={handleAdd}
          disabled={quantity >= 50}
        >
          +
        </button>
      </div>
    </div>
  );
}
