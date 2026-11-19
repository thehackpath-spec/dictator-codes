const config = require('../config');

async function request(url) {
    const response = await fetch(url, { headers: { 'x-api-key': config.robloxApiKey } });
    if (!response.ok) throw new Error(`Roblox HTTP ${response.status}`);
    return response.json();
}

async function updateDescription(client) {
    if (!config.robloxApiKey || !config.universeId) return;
    const base = `https://apis.roblox.com/cloud/v2/universes/${config.universeId}`;
    const queue = await request(`${base}/data-stores/CashoutQueueV1/scopes/global/entries/Queue`);
    const requests = Array.isArray(queue.value ?? queue) ? (queue.value ?? queue) : [];
    const restrictions = await request(`${base}/user-restrictions?maxPageSize=100`);
    let permanent = 0;
    let temporary = 0;
    for (const restriction of restrictions.userRestrictions || []) {
        const joinRestriction = restriction.gameJoinRestriction;
        if (!joinRestriction?.active) continue;
        if (joinRestriction.duration) temporary++;
        else permanent++;
    }
    await client.application.edit({ description: [
        `Number of Cashout in queue: ${requests.length}`,
        `Number of Assigned: ${requests.filter(item => item?.AssignedTo).length}`,
        `Number of Player PermBanned: ${permanent}`,
        `Number of Player temporary baned: ${temporary}`
    ].join('\n') });
}

module.exports = {
    name: 'clientReady',
    once: true,
    async execute(client) {
        const update = () => updateDescription(client).catch(error => console.error('[CASHOUT STATUS ERROR]', error.message));
        update();
        setInterval(update, 5 * 60 * 1000);
    }
};
