import styles from './index.module.scss';
import { useAtom, useAtomValue } from 'jotai';
import { dialogAtom } from '../../stores/dialog-atom';
import { useCallback, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { sendCartItemsAtom } from '../../stores/item-atom';
import { useWebsocket } from '../../hooks/use-websocket';
import { orderIdAtom } from '../../stores/order-atom';
import { zWSResponse } from '../../schema/websocket';
import { joinURL } from 'ufo';
import { sha256 } from 'ohash';

const WS_URL = import.meta.env.VITE_WS_URL;

export default function Drawer() {
  const [open, setOpen] = useAtom(dialogAtom);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sendCartItems = useAtomValue(sendCartItemsAtom);
  const [orderId, setOrderIdAtom] = useAtom(orderIdAtom);

  const key = sha256(JSON.stringify(sendCartItems)) + Date.now() + Math.random();
  const sendData = JSON.stringify({ order: sendCartItems, key });
  const { connect, send, close } = useWebsocket(
    joinURL(WS_URL, key),
    (data) => {
      const res = zWSResponse.safeParse(data);
      if (!res.success) {
        console.error('error', res.error);
        return;
      }

      if (res.data.status === 'payed') {
        console.log(res.data);
        setOrderIdAtom(res.data.id);
      }
    },
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickContent = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  useEffect((): void => {
    const dialogElement = dialogRef.current;
    if (dialogElement == undefined) return;

    if (open) {
      if (dialogElement.hasAttribute('open')) return;
      connect();
      send(sendData);
      dialogElement.showModal();
    } else {
      if (!dialogElement.hasAttribute('open')) return;
      close();
      dialogElement.close();
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.content} onClick={handleClickContent}>
        {orderId === undefined ? (
          <>
            <QRCodeSVG value={sendData} size={256} />
            <button onClick={handleClose}>キャンセル</button>
          </>
        ) : (
          <div>{orderId}</div>
        )}
      </div>
    </dialog>
  );
}
