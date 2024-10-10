import styles from './index.module.scss';
import { useAtomValue, useSetAtom } from 'jotai';
import { totalPriceAtom, totalQuantityAtom } from '../../stores/item-atom';
import { IoQrCodeOutline } from 'react-icons/io5';
import { dialogAtom } from '../../stores/dialog-atom';
import { useCallback } from 'react';

export default function Footer() {
  const setOpen = useSetAtom(dialogAtom);
  const totalPrice = useAtomValue(totalPriceAtom);
  const totalQuantity = useAtomValue(totalQuantityAtom);

  const handleOpenDialog = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <footer className={styles.footer} data-show={totalPrice > 0}>
      <p
        className={styles.total_price}
      >{`合計: ${totalQuantity}点 ${totalPrice}円`}</p>
      <IoQrCodeOutline className={styles.qr} onClick={handleOpenDialog} />
    </footer>
  );
}
