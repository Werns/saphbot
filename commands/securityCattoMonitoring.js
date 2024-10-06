import { PresenceUpdateStatus } from "discord.js";

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").Presence} presence
 */
export default function monitorSecurityCattoPresence(client, presence) {
    const securityCamsChannelId = "1082100597513269248";
    const securityCattoBotId = "1093039910874791997";

    if (presence.userId.toLowerCase() == securityCattoBotId && presence.status !== PresenceUpdateStatus.Online) {
        let me = client.users.cache.get("114463729218748424");
        let securityCamsChannel = client.channels.cache.get(securityCamsChannelId);
        if (securityCamsChannel)
        securityCamsChannel
            // @ts-ignore
            .send(
            `${me?.toString()}, Security Catto has gone offline!`);
    }
}