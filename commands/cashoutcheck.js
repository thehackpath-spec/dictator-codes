const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, ThreadAutoArchiveDuration, AttachmentBuilder } = require('discord.js');

const WORKER = require('../config').cashoutWorkerUrl;
const AGE_REASONS = new Set(['ContextualPlayabilityAgeGated', 'ContextualPlayabilityAgeRecommendationParentalControls']);
const active = new Set();
const cooldowns = new Map();

function classify(place) {
    const known = typeof place?.isPlayable === 'boolean';
    const override = known && !place.isPlayable && AGE_REASONS.has(place.reasonProhibited);
    return { playable: known ? place.isPlayable || override : null, override };
}

async function scan(username, progress) {
    const deadline = Date.now() + 150000;
    const report = { username, userId: null, complete: true, errors: [], games: [], gamepassesScanned: 0 };
    function problem(message) { report.complete = false; report.errors.push(message); }
    async function json(url, body) {
        const remaining = deadline - Date.now();
        if (remaining <= 0) throw new Error('Scan time limit reached');
        const response = await fetch(url, {
            method: body ? 'POST' : 'GET',
            headers: body ? { 'Content-Type': 'application/json' } : undefined,
            body: body ? JSON.stringify(body) : undefined,
            signal: AbortSignal.timeout(Math.min(10000, remaining))
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    }
    const lookup = await json('https://users.roblox.com/v1/usernames/users', { usernames: [username], excludeBannedUsers: false });
    const user = lookup.data?.[0];
    if (!user?.id) throw new Error('Roblox username not found');
    report.userId = user.id;
    report.username = user.name;
    let cursor = '';
    const seenGames = new Set();
    for (let page = 0; page < 10; page++) {
        try {
            const url = new URL(`https://games.roblox.com/v2/users/${user.id}/games`);
            url.search = new URLSearchParams({ accessFilter: 'Public', sortOrder: 'Asc', limit: '50', ...(cursor ? { cursor } : {}) });
            const result = await json(url);
            if (!Array.isArray(result.data)) throw new Error('Invalid experience response');
            for (const game of result.data) {
                if (!game?.id || seenGames.has(game.id)) continue;
                seenGames.add(game.id);
                report.games.push({ name: game.name, universeId: game.id, placeId: game.rootPlace?.id, apiPlayable: null, playable: null, playableOverride: false, reasonProhibited: null, passScanComplete: false, passes: [] });
            }
            cursor = result.nextPageCursor;
            if (!cursor) break;
            if (page === 9) problem('Experience pagination limit reached');
        } catch (error) { problem(`Experiences: ${error.message}`); break; }
    }
    await progress(`Found ${report.games.length} public experiences. Checking playability…`);
    const places = report.games.filter(g => g.placeId);
    for (const game of report.games.filter(g => !g.placeId)) game.reasonProhibited = 'No root place';
    for (let start = 0; start < places.length; start += 49) {
        const batch = places.slice(start, start + 49);
        try {
            const results = WORKER ? await json(WORKER, { placeIds: batch.map(g => String(g.placeId)) }) : {};
            if (!Array.isArray(results)) throw new Error('Invalid worker response');
            for (const game of batch) {
                const place = results.find(p => p && (String(p.placeId ?? p.id) === String(game.placeId) || String(p.universeId) === String(game.universeId)));
                const state = classify(place);
                game.apiPlayable = typeof place?.isPlayable === 'boolean' ? place.isPlayable : null;
                game.playable = state.playable;
                game.playableOverride = state.override;
                game.reasonProhibited = place?.reasonProhibited ?? null;
                if (state.playable === null) problem(`Missing/invalid playability: ${game.placeId}`);
            }
        } catch (error) { problem(`Playability batch: ${error.message}`); }
    }
    await progress('Checking gamepasses for playable experiences and both age restriction exceptions…');
    for (const game of report.games) {
        if (game.playable !== true) continue;
        if (Date.now() >= deadline || report.gamepassesScanned >= 5000) { problem('Scan time or total gamepass limit reached; remaining passes not checked'); break; }
        let passCursor = '';
        const seenPasses = new Set();
        for (let page = 0; page < 10; page++) {
            try {
                const url = new URL(`https://apis.roproxy.com/game-passes/v1/universes/${game.universeId}/game-passes`);
                url.search = new URLSearchParams({ passView: 'Full', pageSize: '100', ...(passCursor ? { cursor: passCursor } : {}) });
                const result = await json(url);
                if (!Array.isArray(result.gamePasses)) throw new Error('Invalid gamepass response');
                for (const pass of result.gamePasses) {
                    if (!pass?.id || seenPasses.has(pass.id)) continue;
                    if (report.gamepassesScanned >= 5000) throw new Error('Total gamepass limit reached');
                    seenPasses.add(pass.id);
                    const creatorId = Number(pass.creator?.creatorId ?? pass.creator?.id ?? 0);
                    game.passes.push({ id: pass.id, name: pass.name, price: pass.price ?? null, forSale: pass.isForSale === true, creatorId, ownerMatches: creatorId === user.id, creatorUnknown: creatorId === 0, ownershipAcceptedByCurrentPurseLogic: creatorId === user.id || creatorId === 0 });
                    report.gamepassesScanned++;
                }
                passCursor = result.nextPageCursor;
                if (!passCursor) { game.passScanComplete = true; break; }
                if (page === 9) problem(`Gamepass pagination limit: ${game.universeId}`);
            } catch (error) { problem(`Gamepasses ${game.universeId}: ${error.message}`); break; }
        }
    }
    return report;
}

function textReport(report) {
    const lines = [
        'ROBLOX CASHOUT DIAGNOSTIC', `${report.username} (${report.userId})`,
        `Scan: ${report.complete ? 'COMPLETE' : 'INCOMPLETE'}`,
        'Read-only public API scan. Does not verify wallet balance, group eligibility, exact cashout price, or previously used/reserved passes.',
        'Age overrides classify experiences for scanning only; Roblox access restrictions remain unchanged.', ''
    ];
    for (const game of report.games) {
        lines.push(`${game.name} | ${game.playable === true ? 'PLAYABLE' : game.playable === false ? 'BLOCKED' : 'UNKNOWN'}`,
            `Universe: ${game.universeId} | Place: ${game.placeId ?? 'None'}`,
            `API playable: ${game.apiPlayable} | PlayableOverride: ${game.playableOverride} | Reason: ${game.reasonProhibited ?? 'Unknown'}`,
            `https://www.roblox.com/games/${game.placeId ?? ''}`,
            `Pass scan: ${game.playable !== true ? 'SKIPPED' : game.passScanComplete ? 'COMPLETE' : 'INCOMPLETE'} | Passes found: ${game.passes.length}`);
        for (const pass of game.passes) lines.push(`  ${pass.name} | ID ${pass.id} | ${pass.price ?? 'Unknown'} Robux | ${pass.forSale ? 'FOR SALE' : 'OFFSALE'} | Creator ${pass.creatorId} | ${pass.ownerMatches ? 'OWNER MATCH' : pass.creatorUnknown ? 'OWNER UNKNOWN (accepted by current Purse logic)' : 'OWNER MISMATCH'}`);
        lines.push('');
    }
    if (report.errors.length) lines.push('LOOKUP ERRORS / LIMITS', ...report.errors);
    return lines.join('\n');
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test').setDescription('Administrator diagnostic tools')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addSubcommand(sub => sub.setName('cashout').setDescription('Inspect Roblox experiences and gamepasses without submitting a cashout')
            .addStringOption(option => option.setName('username').setDescription('Roblox username, not display name').setRequired(true).setMinLength(3).setMaxLength(20))),
    async execute(interaction) {
        const ephemeral = content => interaction.reply({ content, ephemeral: true });
        if (!interaction.inGuild() || !interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) return ephemeral('Administrator permission is required.');
        if (interaction.options.getSubcommand() !== 'cashout') return;
        const channel = interaction.channel;
        if (channel?.type !== ChannelType.GuildText) return ephemeral('Run this command in a regular server text channel so I can create a private thread.');
        const permissions = channel.permissionsFor(interaction.client.user);
        const required = [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.CreatePrivateThreads, PermissionFlagsBits.SendMessagesInThreads, PermissionFlagsBits.AttachFiles];
        if (!permissions?.has(required)) return ephemeral('I need View Channel, Send Messages, Create Private Threads, Send Messages in Threads, and Attach Files here.');
        const username = interaction.options.getString('username', true).trim();
        if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) return ephemeral('Enter a valid Roblox username, not a display name.');
        const key = `${interaction.guildId}:${interaction.user.id}`;
        const now = Date.now();
        for (const [id, expiry] of cooldowns) if (expiry <= now) cooldowns.delete(id);
        if (active.has(interaction.guildId)) return ephemeral('A test is already running in this server. Try again when it finishes.');
        if ((cooldowns.get(key) ?? 0) > now) return ephemeral('Wait one minute between tests.');
        active.add(interaction.guildId);
        cooldowns.set(key, now + 60000);
        let thread;
        let statusMessage;
        try {
            await interaction.deferReply({ ephemeral: true });
            thread = await channel.threads.create({ name: `cashout-test-${username}`, type: ChannelType.PrivateThread, invitable: false, autoArchiveDuration: ThreadAutoArchiveDuration.OneHour, reason: `Cashout diagnostic requested by ${interaction.user.id}` });
            await thread.members.add(interaction.user.id);
            await interaction.editReply({ content: `Your private test thread: <#${thread.id}>` });
            statusMessage = await thread.send({ content: `Checking Roblox username: ${username}…`, allowedMentions: { parse: [] } });
            const report = await scan(username, message => statusMessage.edit({ content: message, allowedMentions: { parse: [] } }));
            const playable = report.games.filter(g => g.playable === true).length;
            const overrides = report.games.filter(g => g.playableOverride).length;
            await thread.send({
                content: `**${report.complete ? 'Scan complete' : 'Scan incomplete'}** — ${report.username}\nExperiences: ${report.games.length} | Accepted as playable: ${playable} (${overrides} age overrides) | Passes scanned: ${report.gamepassesScanned}\nPublic API diagnostic only; this does not confirm cashout eligibility. Details are attached.`,
                files: [new AttachmentBuilder(Buffer.from(textReport(report)), { name: 'cashout-report.txt' })],
                allowedMentions: { parse: [] }
            });
            await statusMessage.edit({ content: 'Finished. See the report below.', allowedMentions: { parse: [] } });
        } catch (error) {
            console.error('[TEST CASHOUT]', error);
            const message = 'The cashout diagnostic could not finish. Check the bot console for details.';
            if (thread) await thread.send({ content: message, allowedMentions: { parse: [] } }).catch(() => {});
            if (interaction.deferred || interaction.replied) await interaction.editReply({ content: thread ? `${message} Thread: <#${thread.id}>` : message }).catch(() => {});
            else await ephemeral(message).catch(() => {});
        } finally {
            active.delete(interaction.guildId);
        }
    }
};
