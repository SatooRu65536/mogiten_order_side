import { ItemGroup } from "../types";

export const itemGroup = {
  food: [
    {
      name: "焼き鳥もも(塩こしょう)",
      price: 150,
      image: "/public/sample.png",
    },
    {
      name: "焼き鳥ねぎま(塩こしょう)",
      price: 150,
      image: "/public/sample.png",
    },
    {
      name: "焼き鳥もも(タレ)",
      price: 150,
      image: "/public/sample.png",
    },
    {
      name: "焼き鳥ねぎま(タレ)",
      price: 150,
      image: "/public/sample.png",
    },
  ],
  drink: [
    {
      name: "コーラ",
      price: 100,
      image: "/public/sample.png",
    },
    {
      name: "칠성사이다(サイダー)",
      price: 100,
      image: "/public/sample.png",
    },
  ],
} as const satisfies ItemGroup;

export const itemList = Object.values(itemGroup).flat();
