import { Client } from "./Client";

// Remove first two which are 'node' and the file
const args = process.argv.slice(2);
let debug: boolean = false;
if (args.includes("--debug")) {
    debug = true;
}

const client = new Client(debug);