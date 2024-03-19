import { ExtendedAtem } from "./ExtendedAtem";
import fs from "fs";
import YAML from "yaml";
import type { YamlConfig } from "./types/yamlTypes";

export class Client {
    public atem: ExtendedAtem;
    private config: YamlConfig;
    
    constructor(debug: boolean = false) {
        let configFile: string = "config.yaml";
        if (debug === true) {
            configFile = "debug.yaml";
        }
        this.config = this.readConfig(configFile);
        this.atem = new ExtendedAtem(this.config.atem);
    }

    private readConfig(fileName: string): YamlConfig {
        const yamlContents: string = fs.readFileSync(`./config/${fileName}`, "utf-8");
        return YAML.parse(yamlContents);
    }
}