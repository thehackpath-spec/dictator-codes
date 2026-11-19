function required(name) {
    const value = process.env[name];
    if (!value) throw new Error(`Missing required environment variable: ${name}`);
    return value;
}

module.exports = {
    discordToken: () => required('DISCORD_TOKEN'),
    clientId: () => required('CLIENT_ID'),
    robloxApiKey: process.env.ROBLOX_API_KEY || null,
    bloxlinkApiKey: process.env.BLOXLINK_API_KEY || null,
    universeId: process.env.ROBLOX_UNIVERSE_ID || null,
    datastoreName: process.env.ROBLOX_DATASTORE_NAME || 'PlayerDonatedStoreV2',
    robloxPresenceName: process.env.ROBLOX_PRESENCE_NAME || 'Roblox',
    robloxPresenceUniverseId: process.env.ROBLOX_PRESENCE_UNIVERSE_ID || null,
    cashoutWorkerUrl: process.env.CASHOUT_WORKER_URL || null,
    voiceChannelId: process.env.VOICE_CHANNEL_ID || null,
    robloxLinkTargetUserId: process.env.ROBLOXLINK_TARGET_USER_ID || null,
    robloxLinkUrl: process.env.ROBLOXLINK_URL || null,
    commentTargetUserId: process.env.COMMENT_TARGET_USER_ID || null,
    specialUserId: process.env.SPECIAL_USER_ID || null,
    logChannelId: process.env.DONATION_LOG_CHANNEL_ID || null,
    donationRoleIds: (process.env.DONATION_ROLE_IDS || '').split(',').map(value => value.trim()).filter(Boolean)
};
