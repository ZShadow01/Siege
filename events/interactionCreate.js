module.exports = {
    name: 'interactionCreate',
    call: async (client, interaction) => {
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
};
