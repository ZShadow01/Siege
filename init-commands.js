const fs = require('fs');
const { REST, Routes } = require('discord.js');

require('dotenv').config();
const TOKEN = process.env.SURTR;

const CLIENT_ID = '842830194346950696';
const GUILD_ID = '842833941433286707';

const rest = new REST({version: '10'}).setToken(TOKEN);


// FETCH COMMANDS /////////////////////////////////////////////////////////////////////////////////
const commands = [];
const commandsPath = __dirname + '/commands';
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const cmdFile of commandFiles) {
    const command = require(commandsPath + '/' + cmdFile);
    commands.push(command.data);
}


// DEPLOY COMMANDS ////////////////////////////////////////////////////////////////////////////////
(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        // await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });  // Applies commands to all guilds
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });  // Only applices commands to GUILD_ID
        
        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();
