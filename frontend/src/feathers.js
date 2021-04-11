import io from "socket.io-client";
import feathers from "@feathersjs/client";
const rx = require("feathers-reactive");

const server = process.env.REACT_APP_API_URL;

const socket = io(server);
const client = feathers().configure(
  rx({
    idField: "_id",
  })
);

client.configure(feathers.socketio(socket));

export default client;
