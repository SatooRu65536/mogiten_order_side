export interface Item {
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Item {
  quantity: number;
}

export type ItemGroup = Record<string, Item[]>;
