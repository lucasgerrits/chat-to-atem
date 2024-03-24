import fs from "fs";
import { ApiClient } from "@twurple/api";
import { RefreshingAuthProvider } from "@twurple/auth";
import type { TwitchConfig } from "./types/yamlTypes";

export class TwitchHandler {
    // private apiClient: ApiClient;
    private authProvider: RefreshingAuthProvider;

    constructor(config: TwitchConfig, debug: boolean = false) {
        this.authProvider = new RefreshingAuthProvider({
            clientId: config.clientId,
            clientSecret: config.clientSecret,
        });

        this.authProvider.onRefresh(
            async (userId, newTokenData) => {
                fs.writeFile(
                    "token.json",
                    JSON.stringify(newTokenData, null, 4),
                    () => {}
                );
            });
    }
}