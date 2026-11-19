
const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ApplicationIntegrationType,
    InteractionContextType,
    MessageFlags
} = require('discord.js');

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'ranks.json');

function loadRanks() {
    if (!fs.existsSync(dataPath)) return {};

    try {
        return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    } catch {
        return {};
    }
}

function saveRanks(data) {
    fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

const commands = [
    new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Give a player a rank')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
        .setContexts(InteractionContextType.Guild)
        .addUserOption(option =>
            option.setName('player')
                .setDescription('The player to rank')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The rank role')
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName('ranks')
        .setDescription('Display all stored ranks')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
        .setContexts(InteractionContextType.Guild),

    new SlashCommandBuilder()
        .setName('unrank')
        .setDescription('Remove a rank from a player')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
        .setContexts(InteractionContextType.Guild)
        .addUserOption(option =>
            option.setName('player')
                .setDescription('The player to unrank')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The rank role to remove')
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName('hide')
        .setDescription('Toggle your stored rank role')
        .setIntegrationTypes(
            ApplicationIntegrationType.GuildInstall,
            ApplicationIntegrationType.UserInstall
        )
        .setContexts(InteractionContextType.Guild)
];

module.exports = {
    data: commands[0],
    commands,

    async execute(interaction, client) {

        // =====================================
        // HIDE - PERSONAL APP + SERVER APP
        // =====================================

        if (interaction.commandName === 'hide') {
            const guildId = interaction.guildId;

            if (!guildId) return;

            const ranks = loadRanks();
            const stored = ranks[guildId]?.[interaction.user.id];

            if (!stored) {
                return interaction.reply({
                    content: 'No stored rank found in this server.',
                    flags: MessageFlags.Ephemeral
                });
            }

            try {
                // Fetch the server using the bot installation
                const guild = await client.guilds.fetch(guildId)
                    .catch(() => null);

                if (!guild) {
                    return interaction.reply({
                        content: 'The bot must also be installed in this server.',
                        flags: MessageFlags.Ephemeral
                    });
                }

                const member = await guild.members.fetch(
                    interaction.user.id
                );

                const botMember = await guild.members.fetchMe();

                const role = await guild.roles.fetch(
                    stored.roleId
                );

                if (!role) {
                    return interaction.reply({
                        content: 'Your stored rank role no longer exists.',
                        flags: MessageFlags.Ephemeral
                    });
                }

                if (
                    !botMember.permissions.has(
                        PermissionFlagsBits.ManageRoles
                    ) ||
                    role.position >= botMember.roles.highest.position ||
                    role.managed
                ) {
                    return interaction.reply({
                        content: 'I cannot manage that rank role.',
                        flags: MessageFlags.Ephemeral
                    });
                }

                if (member.roles.cache.has(role.id)) {
                    await member.roles.remove(role);

                    await interaction.reply({
                        content: 'Your rank is now hidden.',
                        flags: MessageFlags.Ephemeral
                    });

                    console.log(
                        `[HIDE] Removed ${role.id} from ${member.id} in ${guildId}`
                    );
                } else {
                    await member.roles.add(role);

                    await interaction.reply({
                        content: 'Your rank is now visible.',
                        flags: MessageFlags.Ephemeral
                    });

                    console.log(
                        `[HIDE] Added ${role.id} to ${member.id} in ${guildId}`
                    );
                }

            } catch (error) {
                console.error(`[HIDE ERROR] ${error.message}`);

                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({
                        content: 'Failed to toggle your rank.',
                        flags: MessageFlags.Ephemeral
                    }).catch(() => {});
                }
            }

            return;
        }

        // =====================================
        // ADMIN COMMANDS
        // =====================================

        if (!interaction.inGuild()) return;

        if (!interaction.memberPermissions?.has(
            PermissionFlagsBits.Administrator
        )) {
            return interaction.reply({
                content: 'You need Administrator permission to use this command.',
                flags: MessageFlags.Ephemeral
            });
        }

        const ranks = loadRanks();
        const guildId = interaction.guildId;

        if (!ranks[guildId]) {
            ranks[guildId] = {};
        }

        const guildRanks = ranks[guildId];

        // =====================================
        // RANK
        // =====================================

        if (interaction.commandName === 'rank') {
            const target = interaction.options.getMember('player');
            const role = interaction.options.getRole('role');

            if (!target) {
                return interaction.reply({
                    content: 'That player is not in this server.',
                    flags: MessageFlags.Ephemeral
                });
            }

            if (role.id === guildId || role.managed) {
                return interaction.reply({
                    content: 'That role cannot be used as a rank.',
                    flags: MessageFlags.Ephemeral
                });
            }

            if (
                role.position >= interaction.member.roles.highest.position
            ) {
                return interaction.reply({
                    content: 'You can only assign roles below your highest role.',
                    flags: MessageFlags.Ephemeral
                });
            }

            if (
                role.position >= interaction.guild.members.me.roles.highest.position
            ) {
                return interaction.reply({
                    content: 'I cannot assign that role because it is equal to or higher than my highest role.',
                    flags: MessageFlags.Ephemeral
                });
            }

            const currentHighest = target.roles.highest;

            if (role.position < currentHighest.position) {
                return interaction.reply({
                    content: `${target.user.tag} already has a higher role than ${role.name}. Nothing was changed.`,
                    flags: MessageFlags.Ephemeral
                });
            }

            guildRanks[target.id] = {
                playerId: target.id,
                roleId: role.id
            };

            if (role.id === currentHighest.id) {
                saveRanks(ranks);

                return interaction.reply({
                    content: `${target.user.tag} already has ${role.name} as their highest role. The rank has been stored.`,
                    flags: MessageFlags.Ephemeral
                });
            }

            try {
                await target.roles.add(role);
                saveRanks(ranks);

                return interaction.reply({
                    content: `Successfully ranked ${target.user.tag} as ${role}.`,
                    flags: MessageFlags.Ephemeral
                });

            } catch (error) {
                console.error(`[RANK ERROR] ${error.message}`);

                return interaction.reply({
                    content: 'I could not assign that role. Check my role position and permissions.',
                    flags: MessageFlags.Ephemeral
                });
            }
        }

        // =====================================
        // UNRANK
        // =====================================

        if (interaction.commandName === 'unrank') {
            const target = interaction.options.getMember('player');
            const role = interaction.options.getRole('role');

            if (!target) {
                return interaction.reply({
                    content: 'That player is not in this server.',
                    flags: MessageFlags.Ephemeral
                });
            }

            const stored = guildRanks[target.id];

            const isStored = stored &&
                stored.playerId === target.id &&
                stored.roleId === role.id;

            const hasRole = target.roles.cache.has(role.id);

            if (!hasRole && !isStored) {
                return interaction.reply({
                    content: `${target.user.tag} does not have ${role.name} and it is not stored as their rank.`,
                    flags: MessageFlags.Ephemeral
                });
            }

            try {
                if (hasRole) {
                    if (
                        role.position >= interaction.guild.members.me.roles.highest.position
                    ) {
                        return interaction.reply({
                            content: `I cannot remove ${role.name} because it is equal to or higher than my highest role.`,
                            flags: MessageFlags.Ephemeral
                        });
                    }

                    await target.roles.remove(role);
                }

                if (isStored) {
                    delete guildRanks[target.id];
                    saveRanks(ranks);
                }

                return interaction.reply({
                    content: `Successfully unranked ${target.user.tag} from ${role}.`,
                    flags: MessageFlags.Ephemeral
                });

            } catch (error) {
                console.error(`[UNRANK ERROR] ${error.message}`);

                return interaction.reply({
                    content: 'I could not remove that role. Check my role position and permissions.',
                    flags: MessageFlags.Ephemeral
                });
            }
        }

        // =====================================
        // RANKS
        // =====================================

        if (interaction.commandName === 'ranks') {
            const entries = Object.values(guildRanks);

            if (!entries.length) {
                return interaction.reply({
                    content: 'There are currently no stored ranks in this server.',
                    flags: MessageFlags.Ephemeral
                });
            }

            const lines = [];

            for (const entry of entries) {
                const member = await interaction.guild.members
                    .fetch(entry.playerId)
                    .catch(() => null);

                const role = interaction.guild.roles.cache.get(
                    entry.roleId
                );

                if (!member || !role) continue;

                lines.push(
                    `<@${member.id}> → <@&${role.id}>`
                );
            }

            if (!lines.length) {
                return interaction.reply({
                    content: 'There are no valid stored ranks to display in this server.',
                    flags: MessageFlags.Ephemeral
                });
            }

            return interaction.reply({
                content: `**Stored Ranks**\n${lines.join('\n')}`,
                flags: MessageFlags.Ephemeral
            });
        }
    }
};
