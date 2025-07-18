import { io } from "socket.io-client";

const socket = io("https://fee-management-system.onrender.com", {
  withCredentials: true,
  autoConnect: false,
});

export default socket;
