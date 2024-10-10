import styles from "./index.module.scss";
import { useAtom, useAtomValue } from "jotai";
import { dialogAtom } from "../../stores/dialog-atom";
import { useCallback, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { sendCartItemsAtom } from "../../stores/item-atom";

export default function Drawer() {
  const [open, setOpen] = useAtom(dialogAtom);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sendData = useAtomValue(sendCartItemsAtom);

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
      if (dialogElement.hasAttribute("open")) return;
      dialogElement.showModal();
    } else {
      if (!dialogElement.hasAttribute("open")) return;
      dialogElement.close();
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClick={handleClose}>
      <div className={styles.content} onClick={handleClickContent}>
        <QRCodeSVG value={sendData} size={256} />
      </div>
    </dialog>
  );
}
