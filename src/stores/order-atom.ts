import { atom } from 'jotai';

export const orderIdAtom = atom<number>();

export const orderStatusAtom = atom<'sending' | 'waiting' | 'done'>();
