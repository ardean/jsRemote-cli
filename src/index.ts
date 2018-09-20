import { log } from "util";
import * as path from "path";
import * as program from "commander";
import Server from "jsremote-server";
import { networkInterfaces } from "os";
import chalk from "chalk";

const version = "1.0.1";

program
  .version(version)
  .option("-p, --port [port]", "sets server port", parseInt)
  .parse(process.argv);

const server = new Server({
  port: program.port,
  webroot: path.join(__dirname, "..", "client")
});

server.on("clientConnect", socket => {
  let address = socket.request.connection.remoteAddress.replace(/^.*:/, "");
  if (address.toString() === "1") address = "127.0.0.1";

  log(chalk.cyan(`new client connected: ${address}`));
  socket.once("disconnect", () => log(chalk.magenta(`client disconnected: ${address}`)));
});

(async () => {
  await server.start();

  log(chalk.cyan(`jsRemote v${version} is running`));

  const ipv4Addresses = getIPv4Addresses();
  for (const ipv4Address of ipv4Addresses) {
    log(chalk.green(`http://${ipv4Address}:${server.port}/`));
  }
})();

function getIPv4Addresses() {
  const interfaces = networkInterfaces();
  const devices = Object.keys(interfaces);

  const ipv4 = [];
  for (const device of devices) {
    const interfaceItems = interfaces[device];
    for (const { family, address } of interfaceItems) {
      if (family === "IPv4") ipv4.push(address);
    }
  }

  return ipv4;
}