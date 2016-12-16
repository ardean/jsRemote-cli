import program from "commander";
import Server from "./server";
import pkg from "../package";

program
  .version(pkg.version)
  .option("-p, --port [port]", "sets server port", parseInt)
  .parse(process.argv);

const server = new Server();
const port = program.port;

server.listen(port, () => {
  console.log(`jsremote server is running on port ${server.port}`);
});
