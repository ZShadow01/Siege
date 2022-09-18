const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, channelMention } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Say something in the specified channel')
        .addStringOption(text => 
            text.setRequired(true)
                .setName('text')
                .setDescription('What do you want to say?')
        )
        .addChannelOption(channel =>
            channel.setRequired(false)
            .setName('channel')
            .setDescription('Target channel')
        ),

    execute: async interaction => {
        if (!(interaction instanceof ChatInputCommandInteraction)) return;
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const text = interaction.options.getString('text');

        await channel.send(text);

        const embed = new EmbedBuilder()
            .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
            .setDescription('Sent "' + text + '" to ' + channelMention(channel.id));

        await interaction.reply({embeds: [embed], ephemeral: true});
    }
};
