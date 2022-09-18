const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, userMention } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('role-members')
        .setDescription('List all of the members with the specified role')
        .addRoleOption(role =>
            role.setRequired(true)
                .setName('role')
                .setDescription('Target role')
        ),

    execute: async interaction => {
        if (!(interaction instanceof ChatInputCommandInteraction)) return

        const role = interaction.options.getRole('role');

        let embed = new EmbedBuilder()
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setTitle(role.name)
            .setColor(role.hexColor);

        var description = `**[${role.members.size}]** - members\n\n`;
        role.members.forEach(member => {
            description += userMention(member.id) + '\n';
        });
        embed.setDescription(description);

        await interaction.reply({embeds: [embed]});
    }
};
