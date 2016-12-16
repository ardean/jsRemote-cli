import {
  log
} from "util";
import program from "commander";
import Server from "./server";
import pkg from "../package";

program
  .version(pkg.version)
  .option("-p, --port [port]", "sets server port", parseInt)
  .parse(process.argv);

const server = new Server({
  port: program.port
});

server.on("clientConnect", (socket) => {
  log("new client connected: " + socket.request.connection.remoteAddress);
  socket.once("disconnect", () => log("client disconnected: " + socket.request.connection.remoteAddress));
});

server.listen(() => {
  log(`jsremote server is running on port ${server.port}`);
});
