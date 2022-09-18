const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Shows the selected user\'s information')
        .addUserOption(user =>
            user.setRequired(false)
            .setName('user')
            .setDescription('Target user [optional]')
        ),

    execute: async interaction => {
        var user = interaction.options.getUser('user') || interaction.user;
        user = await user.fetch(true);  // Forced fetch
        
        let embed = new EmbedBuilder()
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setTitle(user.username + "'s avatar")
            .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
            .setColor(user.hexAccentColor);

        await interaction.reply({embeds: [embed]});
    }
};
