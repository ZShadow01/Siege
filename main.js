const fs = require('fs');
const discord = require('discord.js');
const { GatewayIntentBits, Collection } = discord;

require('dotenv').config();
const TOKEN = process.env.SURTR;


// CLIENT SETUP ///////////////////////////////////////////////////////////////////////////////////
const intents = {intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]};
var client = new discord.Client(intents);


// COMMANDS SETUP /////////////////////////////////////////////////////////////////////////////////
client.commands = new Collection();
const commandsPath = __dirname + '/commands';
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));
for (const cmdFile of commandFiles) {
    const command = require(commandsPath + '/' + cmdFile);
    client.commands.set(command.data.name, command);
}


// EVENTS /////////////////////////////////////////////////////////////////////////////////////////
client.once('ready', function() {
    console.log(`Name: ${client.user.tag}`);
    console.log(`ID  : ${client.user.id}`);
    console.log("-------------------------");
    console.log("Bot is online");
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        return;
    }

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


client.login(TOKEN);
