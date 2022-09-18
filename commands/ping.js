const { SlashCommandBuilder } = require('discord.js');


const cmd = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    execute: async (interaction) => {
        await interaction.reply('Pong!');
    }
};


module.exports = cmd;
