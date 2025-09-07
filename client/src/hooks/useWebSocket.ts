import { useCallback, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import type { TSocketMessage, TSocketResponse } from '../types';

interface UseWebSocketResult {
  isConnected: boolean;
  messages: TSocketResponse[];
  sendMessage: (message: TSocketMessage) => void;
}

const useWebSocket = <T>(url: string, onMessage: (message: TSocketResponse<T>) => void): UseWebSocketResult => {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<TSocketResponse[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const sendMessage = useCallback((message: TSocketMessage) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket not connected");
    }
  }, []);

  useEffect(() => {
    ws.current = new WebSocket(`${url}?access_token=${Cookies.get('access_token')}`);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    ws.current.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      console.log("Received:", message);

      onMessage?.(message);
      setMessages((prev) => [...prev, message]);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  return {
    isConnected,
    messages,
    sendMessage,
  };
};

export default useWebSocket;
