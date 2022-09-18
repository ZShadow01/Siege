const { SlashCommandBuilder, EmbedBuilder, SelectMenuBuilder, ActionRowBuilder, ChatInputCommandInteraction } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show a selected command\'s information'),

    execute: async interaction => {
        var commands = [];
        interaction.client.commands.forEach(cmd => {
            commands.push({
                label: cmd.data.name,
                description: cmd.data.description,
                value: cmd.data.name
            });
        });
        commands.sort((a, b) => a.label.localeCompare(b.label))  // Sort alphabetically
        
        const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('command')
                    .setPlaceholder('Nothing selected')
                    .addOptions(commands)
            );

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setDescription('Command information will be shown here!')
            .setFooter({text: '<> = required; [] = optional'});
        
        await interaction.reply({embeds: [embed], components: [row], ephemeral: true});
    },
    update: async interaction => {
        const command = interaction.client.commands.get(interaction.values[0]);
        if (!command) {
            // Error
            return;
        }
        const options = command.data.options;
        var params = '';
        for (const option of options) {
            if (option.required) {
                params += `<${option.name}>`;
            } else {
                params += `[${option.name}]`
            }
        }

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setDescription('Command: **' + command.data.name + '**')
            .addFields(
                {
                    name: 'Usage',
                    value: '/' + command.data.name + (params ? ' ' + params : '')
                },
                {
                    name: 'Description',
                    value: command.data.description
                }
            )
            .setFooter({text: '<> = required; [] = optional'});

        await interaction.update({embeds: [embed], ephemeral: true});
    }
};