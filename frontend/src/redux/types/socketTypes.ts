import { Socket } from "socket.io-client";

export const SOCKET = "SOCKET";

export interface SocketTypeInt {
 type: typeof SOCKET;
 payload: Socket;
}