const { Client, GatewayIntentBits } = require('discord.js');

require('dotenv').config();
const TOKEN = process.env.TOKEN;

// Client setup
const intents = [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers
];
var client = new Client({intents: intents});


// Import commands
const commandsPath = './commands';
client.commands = require('./commands.js')(commandsPath);


// Import events
const eventsPath = './events';
const events = require('./events.js')(eventsPath);


// Events
client.once('ready', async () => await events.ready(client));
client.on('interactionCreate', async interaction => await events.interactionCreate(client, interaction));


// Run
client.login(TOKEN);
