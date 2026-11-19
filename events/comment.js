const { commentTargetUserId: TARGET_USER_ID } = require('../config');

module.exports = {
    name: 'messageCreate',
    once: false,

    async execute(message) {
        // Only react to this specific user
        if (!TARGET_USER_ID || message.author.id !== TARGET_USER_ID) return;

        // Don't react to bots
        if (message.author.bot) return;

        try {
            await message.react('🇳');
            await message.react('🇮');
            await message.react('🇨');
            await message.react('🇭');
            await message.react('🇪');
        } catch (error) {
            console.error(`[NICHE REACTION ERROR] ${error.message}`);
        }
    }
};
