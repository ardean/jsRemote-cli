import { log } from "util";
import program from "commander";
import Server from "./server";
import { networkInterfaces } from "os";
import { green, cyan, magenta } from "chalk";

program
  .version("0.5.5")
  .option("-p, --port [port]", "sets server port", parseInt)
  .parse(process.argv);

const server = new Server({
  port: program.port
});

server.on("clientConnect", (socket) => {
  let address = socket.request.connection.remoteAddress.replace(/^.*:/, '');
  if (address == 1) address = "127.0.0.1";

  log(cyan("new client connected: " + address));
  socket.once("disconnect", () => log(magenta("client disconnected: " + address)));
});

server.listen(() => {
  log(cyan(`jsRemote is running`));
  getIPv4Addresses().forEach((address) => {
    log(green(`http://${address}:${server.port}/`));
  });
});

function getIPv4Addresses() {
  const interfaces = networkInterfaces();
  const ipv4 = [];

  Object.keys(interfaces).forEach((dev) => {
    interfaces[dev].forEach((details) => {
      if (details.family === "IPv4") {
        ipv4.push(details.address);
      }
    });
  });

  return ipv4;
}