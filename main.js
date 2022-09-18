const discord = require('discord.js');
const { GatewayIntentBits } = discord;

require('dotenv').config();
const TOKEN = process.env.TOKEN;

const events = require('./events');


// Client setup
const intents = [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers
];
var client = new discord.Client({intents: intents});


// Initialize events
events.initializeEvents(client);

// Events
client.once('ready', events.ready);
client.on('interactionCreate', events.interactionCreate);

client.login(TOKEN);
