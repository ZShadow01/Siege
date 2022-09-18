const discord = require('discord.js');
const fs = require('fs');

var client;


function initializeEvents(c) {
    client = c;
    client.commands = new discord.Collection();
    const commandsPath = __dirname + '/commands';
    const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));
    for (const cmdFile of commandFiles) {
        const command = require(commandsPath + '/' + cmdFile);
        client.commands.set(command.data.name, command);
    }
}


async function ready() {
    console.log(`Name: ${client.user.tag}`);
    console.log(`ID  : ${client.user.id}`);
    console.log("-------------------------");
    console.log("Bot is online");
}


async function interactionCreate(interaction) {
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
            
        try {
            await command.execute(interaction);
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
    else if (interaction.isSelectMenu()) {
        const command = client.commands.get(interaction.message.interaction.commandName);
        if (!command) return;

        try {
            await command.update(interaction);
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: 'There was an error while updating the message!', ephemeral: true });
        }
    }
}


module.exports = {
    initializeEvents: initializeEvents,
    ready: ready,
    interactionCreate: interactionCreate
};