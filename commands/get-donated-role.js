const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const config = require('../config');

const donationRoles = config.donationRoleIds.map((id, index) => ({ amount: 10 ** (index + 3), id }));

async function getRobloxId(discordId, guildId) {
    if (!config.bloxlinkApiKey) throw new Error('BLOXLINK_API_KEY is not configured');
    const response = await fetch(`https://api.blox.link/v4/public/guilds/${guildId}/discord-to-roblox/${discordId}`, { headers: { Authorization: config.bloxlinkApiKey } });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Bloxlink error: ${response.status}`);
    const data = await response.json();
    return data.robloxID && /^\d+$/.test(String(data.robloxID)) ? String(data.robloxID) : null;
}

async function getDonated(robloxId) {
    if (!config.robloxApiKey || !config.universeId) throw new Error('Roblox Open Cloud is not configured');
    const url = `https://apis.roblox.com/cloud/v2/universes/${config.universeId}/ordered-data-stores/${config.datastoreName}/scopes/global/entries/${robloxId}`;
    const response = await fetch(url, { headers: { 'x-api-key': config.robloxApiKey } });
    if (response.status === 404) return 0;
    if (!response.ok) throw new Error(`Roblox error: ${response.status}`);
    return Number((await response.json()).value) || 0;
}

module.exports = {
    data: new SlashCommandBuilder().setName('get-donated-role').setDescription('Get the donation role matching your Roblox donation total'),
    async execute(interaction) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        try {
            const robloxId = await getRobloxId(interaction.user.id, interaction.guildId);
            if (!robloxId) return interaction.editReply('Your Discord account is not linked to Roblox.');
            const donated = await getDonated(robloxId);
            const role = donationRoles.filter(item => donated >= item.amount).at(-1);
            if (!role) return interaction.editReply(`Your recorded donation total is ${donated} Robux, which does not meet a role threshold.`);
            const member = await interaction.guild.members.fetch(interaction.user.id);
            await member.roles.add(role.id);
            await interaction.editReply(`Your donation role has been updated for ${donated} Robux.`);
        } catch (error) {
            console.error('[GET DONATED ROLE ERROR]', error.message);
            await interaction.editReply('This command is not configured yet or the lookup failed.');
        }
    }
};
