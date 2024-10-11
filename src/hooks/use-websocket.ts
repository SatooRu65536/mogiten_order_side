import { useEffect, useState } from 'react';

type CallBack = (data: unknown) => void;

export const useWebsocket = (url: string, callBack: CallBack) => {
  const [ws, setWS] = useState<WebSocket>();

  useEffect(() => {
    if (!ws) return;

    ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      callBack(data);
    });

    return () => {
      ws.close();
    };
  }, [ws]);

  function connect() {
    setWS(new WebSocket(url));
  }

  function send<T>(data: T): boolean {
    if (!ws || ws.readyState !== ws.OPEN) return false;

    ws.send(JSON.stringify(data));
    return true;
  }

  function close() {
    ws?.close();
  }

  return { connect, send, close } as const;
};
