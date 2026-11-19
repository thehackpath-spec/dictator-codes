const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const token = config.discordToken();
const clientId = config.clientId();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildExpressions,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.GuildMessagePolls,
        GatewayIntentBits.DirectMessagePolls,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent
    ],

    presence: { status: 'dnd' }
});

client.commands = new Collection();
const commandData = [];
let loadedEvents = 0;
function getFiles(dir) {
    return fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).filter(x => x.isFile() && x.name.endsWith('.js')).map(x => path.join(dir, x.name)) : [];
}
for (const file of getFiles(path.join(__dirname, 'commands'))) {
    try {
        const command = require(file);
        if (typeof command.execute !== 'function') throw new Error('Missing execute');
        const definitions = command.commands || [command.data];
        if (!Array.isArray(definitions)) throw new Error('commands must be an array');
        for (const data of definitions) {
            if (!data?.name) throw new Error('Missing command name');
            if (client.commands.has(data.name)) throw new Error(`Duplicate command: ${data.name}`);
            client.commands.set(data.name, command);
            commandData.push(data.toJSON());
        }
    } catch (error) { console.error(`[COMMAND ERROR] ${path.basename(file)}: ${error.message}`); }
}
for (const file of getFiles(path.join(__dirname, 'events'))) {
    try {
        const event = require(file);
        if (!event.name || typeof event.execute !== 'function') throw new Error('Missing name or execute');
        const handler = (...args) => Promise.resolve().then(() => event.execute(...args, client)).catch(error => console.error(`[EVENT ERROR] ${event.name}:`, error));
        client[event.once ? 'once' : 'on'](event.name, handler);
        loadedEvents++;
    } catch (error) { console.error(`[EVENT LOAD ERROR] ${path.basename(file)}: ${error.message}`); }
}
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try { await command.execute(interaction, client); }
    catch (error) {
        console.error(`[COMMAND ERROR] ${interaction.commandName}:`, error);
        const response = { content: 'Something went wrong while running this command.' };
        if (interaction.replied || interaction.deferred) await interaction.editReply(response).catch(() => {});
        else await interaction.reply({ ...response, ephemeral: true }).catch(() => {});
    }
});
async function updateRobloxPresence() {
    if (!config.robloxPresenceUniverseId) return;
    try {
        const response = await fetch(`https://games.roblox.com/v1/games?universeIds=${config.robloxPresenceUniverseId}`, { signal: AbortSignal.timeout(10000) });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();
        if (!result.data?.length) throw new Error('No game data returned');
        const players = result.data[0].playing;
        client.user.setPresence({ status: 'dnd', activities: [{ name: config.robloxPresenceName, type: 0, state: `${players} players playing` }] });
        console.log(`[ROBLOX] ${players} players playing`);
    } catch (error) { console.error(`[ROBLOX API ERROR] ${error.message}`); }
}
client.once('clientReady', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Loaded ${commandData.length} command(s) and ${loadedEvents} event(s)`);
    try {
        await new REST({ version: '10' }).setToken(token).put(Routes.applicationCommands(clientId), { body: commandData });
        console.log('Slash commands registered.');
    } catch (error) { console.error('[COMMAND REGISTER ERROR]', error); }
    await updateRobloxPresence();
    setInterval(updateRobloxPresence, 60000);
});
client.on('error', error => console.error('[DISCORD ERROR]', error));
process.on('unhandledRejection', error => console.error('[UNHANDLED REJECTION]', error));
client.login(token).catch(error => { console.error(`[LOGIN ERROR] ${error.message}`); process.exitCode = 1; });
