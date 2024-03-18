"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_connection_1 = require("atem-connection");
const Util_1 = require("./Util");
process.on('exit', (code) => {
    console.log('Exiting with code:', code);
});
process.on('SIGINT', () => {
    console.log('Received SIGINT signal');
    process.exit(0);
});
const deviceIP = "mitmat4dhq.ddns.net";
const devicePort = 9910;
const myAtem = new atem_connection_1.Atem();
myAtem.on("error", console.error);
myAtem.connect(deviceIP, devicePort);
myAtem.on("connected", async () => {
    console.log(`Connected to: ${deviceIP}:${devicePort}`);
    await Util_1.Util.sleep(5000);
    if (myAtem.state !== undefined) {
        const macros = myAtem.state.macro.macroProperties;
        console.log(macros[0]);
    }
});
myAtem.on("disconnected", async () => {
    console.log("disconnected");
});
myAtem.on("stateChanged", (state, pathToChange) => {
    console.log(state.macro.macroProperties);
});
