
const {
    joinVoiceChannel,
    getVoiceConnection,
    VoiceConnectionStatus,
    entersState
} = require('@discordjs/voice');
const { voiceChannelId: CHANNEL_ID } = require('../config');

let reconnecting = false;
let reconnectTimer = null;

async function maintainVoice(client) {
    if (!CHANNEL_ID) return;
    if (reconnecting) return;

    reconnecting = true;

    try {
        const channel = await client.channels.fetch(CHANNEL_ID)
            .catch(() => null);

        if (!channel || !channel.isVoiceBased() || !channel.guild) {
            console.log('[VOICE] Target channel unavailable.');
            return;
        }

        const permissions = channel.permissionsFor(client.user);

        if (
            !permissions ||
            !permissions.has(['ViewChannel', 'Connect'])
        ) {
            console.log('[VOICE] Missing permissions.');
            return;
        }

        const guild = channel.guild;

        let connection = getVoiceConnection(guild.id);

        // Check existing connection
        if (
            connection &&
            connection.joinConfig.channelId === CHANNEL_ID
        ) {
            if (connection.state.status === VoiceConnectionStatus.Ready) {
                return;
            }

            if (
                connection.state.status === VoiceConnectionStatus.Connecting ||
                connection.state.status === VoiceConnectionStatus.Signalling
            ) {
                try {
                    await entersState(
                        connection,
                        VoiceConnectionStatus.Ready,
                        12000
                    );

                    return;
                } catch {
                    console.log('[VOICE] Connection stalled. Reconnecting...');
                }
            }

            if (
                connection.state.status !== VoiceConnectionStatus.Destroyed
            ) {
                connection.destroy();
            }

        } else if (connection) {
            connection.destroy();
        }

        console.log(`[VOICE] Rejoining ${guild.name}...`);

        connection = joinVoiceChannel({
            channelId: CHANNEL_ID,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
            selfMute: true,
            selfDeaf: true
        });

        connection.on('error', error => {
            console.error('[VOICE CONNECTION ERROR]', error.message);
        });

        connection.on('stateChange', (oldState, newState) => {
            console.log(
                `[VOICE] ${oldState.status} -> ${newState.status}`
            );

            if (
                newState.status === VoiceConnectionStatus.Disconnected
            ) {
                console.log('[VOICE] Disconnected. Scheduling recovery...');

                scheduleReconnect(client, 3000);
            }

            if (
                newState.status === VoiceConnectionStatus.Ready
            ) {
                console.log('[VOICE] Successfully connected!');
            }
        });

        try {
            await entersState(
                connection,
                VoiceConnectionStatus.Ready,
                20000
            );

        } catch (error) {
            console.log('[VOICE] Connection did not become ready.');

            if (
                connection.state.status !== VoiceConnectionStatus.Destroyed
            ) {
                connection.destroy();
            }
        }

    } catch (error) {
        console.error('[VOICE ERROR]', error.message);

    } finally {
        reconnecting = false;
    }
}

// Schedule reconnect without creating duplicate timers
function scheduleReconnect(client, delay = 2000) {
    if (reconnectTimer) return;

    reconnectTimer = setTimeout(async () => {
        reconnectTimer = null;
        await maintainVoice(client);
    }, delay);
}

module.exports = {
    name: 'clientReady',
    once: true,

    async execute(client) {
        console.log('[VOICE] Voice manager started.');

        // Initial connection
        await maintainVoice(client);

        // Detect when the bot leaves or gets moved out
        client.on('voiceStateUpdate', (oldState, newState) => {
            if (oldState.id !== client.user.id) return;

            if (
                oldState.channelId === CHANNEL_ID &&
                newState.channelId !== CHANNEL_ID
            ) {
                console.log('[VOICE] Bot left target VC.');

                scheduleReconnect(client, 2000);
            }
        });

        // Backup health check every 15 seconds
        setInterval(() => {
            maintainVoice(client);
        }, 15000);

        console.log('[VOICE] Automatic recovery enabled.');
    }
};
