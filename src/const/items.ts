import { ItemGroup } from '../types';

export const itemGroup = {
  food: [
    {
      name: '焼き鳥もも(塩こしょう)',
      price: 120,
      image: '/sample.png',
    },
    {
      name: '焼き鳥ねぎま(塩こしょう)',
      price: 120,
      image: '/sample.png',
    },
    {
      name: '焼き鳥もも(タレ)',
      price: 120,
      image: '/sample.png',
    },
    {
      name: '焼き鳥ねぎま(タレ)',
      price: 120,
      image: '/sample.png',
    },
    {
      name: '焼き鳥4本セット(各種1本)',
      price: 400,
      image: '/sample.png',
    },
    {
      name: '焼き鳥24本セット(各種6本)',
      price: 2000,
      image: '/sample.png',
    },
  ],
  drink: [
    {
      name: 'コカコーラ',
      price: 100,
      image: '/sample.png',
    },
    {
      name: 'ドクタペッパー',
      price: 100,
      image: '/sample.png',
    },
    {
      name: '칠성사이다(サイダー)',
      price: 100,
      image: '/sample.png',
    },
    {
      name: 'ファンタグレープ',
      price: 100,
      image: '/sample.png',
    },
    {
      name: '緑茶',
      price: 100,
      image: '/sample.png',
    },
  ],
} as const satisfies ItemGroup;

export const itemList = Object.values(itemGroup).flat();
