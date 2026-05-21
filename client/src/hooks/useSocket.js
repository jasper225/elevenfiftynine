import { useEffect, useRef } from "react";
import { connectSocket, disconnectSocket, getSocket } from "../services/socket";
import { useAuthStore } from "../store/authStore";

export const useSocket = () => {
  const { accessToken } = useAuthStore();
  const ref = useRef(null);
  useEffect(() => {
    if (accessToken) ref.current = connectSocket(accessToken);
    return () => disconnectSocket();
  }, [accessToken]);
  return ref.current || getSocket();
};
