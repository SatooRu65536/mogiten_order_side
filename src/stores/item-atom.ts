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
