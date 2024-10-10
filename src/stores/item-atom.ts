import { atomFamily, atomWithStorage } from "jotai/utils";
import { CartItem } from "../types";
import { itemList } from "../const/items";
import { atom } from "jotai";

export const cartItemsAtom = atom((get) =>
  itemList.map((item) => get(cartItemAtomFamily(item.name))),
);

export const cartItemAtomFamily = atomFamily((name: string) => {
  const item = itemList.find((item) => item.name === name);
  if (item == undefined) throw new Error(`Item not found: ${name}`);

  return atomWithStorage<CartItem>(item.name, { ...item, quantity: 0 });
});

export const totalPriceAtom = atom((get) =>
  get(cartItemsAtom).reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0,
  ),
);

export const totalQuantityAtom = atom((get) =>
  get(cartItemsAtom).reduce((acc, { quantity }) => acc + quantity, 0),
);

export const sendCartItemsAtom = atom((get) => {
  const cartItems = get(cartItemsAtom);
  // 0件の商品は送信しない
  const filteredCartItems = cartItems
    .filter((item) => item.quantity > 0)
    .map(({ name, quantity }) => ({
      name,
      quantity,
    }));

  return JSON.stringify(filteredCartItems);
});
