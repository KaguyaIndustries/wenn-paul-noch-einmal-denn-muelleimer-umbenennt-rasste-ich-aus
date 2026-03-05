const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const { token, channelid, originname } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});

const TARGET_CHANNEL_ID = channelid;
const FIXED_NAME = originname;

client.once('ready', () => {
    console.log(`Gatekeeper readyy`);

    client.user.setPresence({
        activities: [{
            name: 'Mülleimer Channel',
            type: ActivityType.Watching,
            url: 'https://catb.it'
        }],
        status: 'dnd'
    })
});

client.on('channelUpdate', async (oldChannel, newChannel) => {
    if (newChannel.id !== TARGET_CHANNEL_ID) return;
    if (newChannel.name !== FIXED_NAME) {
        console.log(`Irgendso ein Paul hat den Channel zu "${newChannel.name}" geändert! Cringe..`);
        try {
            await newChannel.setName(FIXED_NAME);
            console.log(`Yaaasss, Name ist wiedew safe "${FIXED_NAME}" UwU 💖`);
        } catch (error) {
            console.error(`Oooopsie fucky wucky, Discowd sagt nein (Ewwow):`, error);
        }
    }
});

client.login(token);