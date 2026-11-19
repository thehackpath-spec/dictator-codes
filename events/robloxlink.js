const { robloxLinkTargetUserId: TARGET_USER_ID, robloxLinkUrl: ROBLOX_LINK } = require('../config');

const COOLDOWN = 60 * 1000; // 1 minute

let lastTriggered = 0;

module.exports = {
    name: 'messageCreate',
    once: false,

    async execute(message) {
        // Ignore bots
        if (message.author.bot) return;

        // Check if the specific user was mentioned
        if (!TARGET_USER_ID || !ROBLOX_LINK || !message.mentions.users.has(TARGET_USER_ID)) return;

        const now = Date.now();

        // Global 1-minute cooldown
        if (now - lastTriggered < COOLDOWN) return;

        lastTriggered = now;

        await message.channel.send(
            `I am playing Summer Donations! 🎮\n${ROBLOX_LINK}`
        );
    }
};
