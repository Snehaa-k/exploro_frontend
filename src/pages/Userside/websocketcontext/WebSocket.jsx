// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create WebSocket Context
// const WebSocketContext = createContext(null);

// export const useWebSocket = () => {
//   return useContext(WebSocketContext);
// };

// export const WebSocketProvider = ({ children, userId }) => {
//   const [notifications, setNotifications] = useState([]);
  
//   useEffect(() => {
//     let ws;
//     let isConnected = false;

//     const connectWebSocket = () => {
//       ws = new WebSocket(`ws://localhost:8000/ws/notification/?user_id=${userId}`);

//       ws.onopen = () => {
//         console.log('WebSocket connection established');
//         isConnected = true;
//       };

//       ws.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         console.log('Notification received:', data);
//         setNotifications((prev) => [...prev, data.notification]);
//       };

//       ws.onclose = () => {
//         console.log('WebSocket connection closed');
//         isConnected = false;
//         // Attempt to reconnect after a delay
//         setTimeout(() => {
//           if (!isConnected) connectWebSocket();
//         }, 5000);
//       };
//     };

//     connectWebSocket();

//     return () => {
//       if (ws) {
//         ws.close();
//       }
//     };
//   }, [userId]);

//   return (
//     <WebSocketContext.Provider value={{ notifications }}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };
