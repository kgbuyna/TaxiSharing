// import { io } from "socket.io-client";
import io from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://10.245.49.145:3000";

export const socket = io(URL, {
    transports: ["websocket"],
    autoConnect: false
});
