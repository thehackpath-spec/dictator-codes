
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the bot latency and response time.'),

    async execute(interaction, client) {
        await interaction.deferReply();

        const responseTime =
            Date.now() - interaction.createdTimestamp;

        const apiLatency = client.ws.ping;

        await interaction.editReply({
            content:
                `Pong!\n\n` +
                `**Bot response:** ${responseTime}ms\n` +
                `**API latency:** ${apiLatency}ms`
        });
    }
};
