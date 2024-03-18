import { Atem } from "atem-connection";
import { MacroPropertiesState } from "atem-connection/dist/state/macro";
import type { AtemConfig } from "./types/yamlTypes";

export class ExtendedAtem extends Atem {
    private macros: Array<MacroPropertiesState | undefined> = [];
    private deviceIP: string;
    private devicePort: number;

    constructor(config: AtemConfig) {
        super();

        this.deviceIP = config.IP;
        const defaultUDP: number = 9910;
        this.devicePort = config.port ?? defaultUDP;
        this.connect(config.IP, config.port);

        this.registerEventHandlers();
    }

    private getUsableMacros(): void {
        if (this.state !== undefined) {
            const allMacros: Array<MacroPropertiesState> = this.state.macro.macroProperties as Array<MacroPropertiesState>;
            this.macros = allMacros.filter(m => m.isUsed === true);
        }
    }

    private async registerEventHandlers(): Promise<void> {
        this.on("connected", async () => {
            console.log(`Connected to: ${this.deviceIP}:${this.devicePort}`);

            this.getUsableMacros();
        });

        this.on("disconnected", async () => {
            console.log("Disconnected");
        });
        
        this.on("stateChanged", (state, pathToChange) => {
            // console.log(state.macro.macroProperties);
        });

        this.on("error", console.error);

        // this.on("info", console.log);
    }
    
    public async runMacro(identifier: number | string): Promise<void> {
        let index: number = 0;
        if (typeof identifier === "number") {
            index = identifier;
        }
        if (typeof identifier === "string") {
            const foundIndex: number = this.macros.findIndex(m => {
                if (m !== undefined && m.name === identifier) {
                    return true;
                }
                return false;
            });
            if (foundIndex === -1) {
                console.log(`Macro not found: ${identifier}`);
                return;
            } else {
                index = foundIndex;
            }
        }
        this.macroRun(index);
    }
}