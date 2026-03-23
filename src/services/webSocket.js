import SockJS from "sockjs-client/dist/sockjs"; // ✅ IMPORTANT FIX
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (userId, onMessageReceived) => {

  if (!userId) {
    console.log("UserId not available yet");
    return;
  }

  try {
    const socket = new SockJS("http://localhost:8085/ws");

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("✅ Connected to WebSocket");

        stompClient.subscribe(
          `/topic/notifications/${userId}`,
          (message) => {
            try {
              const notification = JSON.parse(message.body);
              onMessageReceived(notification);
            } catch (err) {
              console.error("JSON parse error", err);
            }
          }
        );
      },

      onStompError: (frame) => {
        console.error("WebSocket error:", frame);
      }
    });

    stompClient.activate();

  } catch (error) {
    console.error("WebSocket failed:", error);
  }
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};