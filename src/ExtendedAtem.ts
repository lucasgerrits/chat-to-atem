import { Atem, DEFAULT_PORT } from "atem-connection";
import { Util } from "./Util";
import { MacroPropertiesState } from "atem-connection/dist/state/macro";
import type { AtemConfig } from "./types/yamlTypes";


export class ExtendedAtem extends Atem {
    private macros: Array<MacroPropertiesState | undefined> = [];
    private deviceIP: string;
    private devicePort: number;

    constructor(config: AtemConfig) {
        super();
        
        this.deviceIP = config.IP;
        this.devicePort = config.port ?? DEFAULT_PORT;

        this.registerEventHandlers();

        this.connect(config.IP, config.port).catch((e) => {
            console.error(e)
            process.exit(0)
        })
    }

    private getUsableMacros(): void {
        if (this.state !== undefined) {
            const allMacros: Array<MacroPropertiesState> = this.state.macro.macroProperties as Array<MacroPropertiesState>;
            this.macros = allMacros.filter(m => m.isUsed === true);
        }
    }

    private registerEventHandlers(): void {
        this.on("connected", async () => {
            console.log("Connected to device.");

            this.getUsableMacros();

            await Util.sleep(1000);
            this.setInput(1);
        });

        this.on("disconnected", async () => {
            console.log("Disconnected from device.");
	        process.exit(0)
        });
        
        this.on("stateChanged", (state, pathToChange) => {
            // console.log(state.macro.macroProperties);
        });

        this.on("error", console.error);

        this.on("info", console.log);
    }
    
    public async setInput(input: number): Promise<void> {
        this.changeProgramInput(input);
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