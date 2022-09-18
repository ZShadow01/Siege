const { Collection } = require('discord.js');
const fs = require('fs');


module.exports = commandsPath => {
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    var commands = new Collection();
    for (const command of commandsFiles) {
        const cmd = require(commandsPath + '/' + command);
        commands.set(cmd.data.name, cmd);  // Add command to the collection
    }
    return commands;
};
