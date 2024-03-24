export type YamlConfig = {
    atem: AtemConfig,
    twitch: TwitchConfig,
}

export type AtemConfig = {
    IP: string,
    port?: number,
}

export type TwitchConfig = {
    clientId: string,
    clientSecret: string,
    redirectUri: string,
}