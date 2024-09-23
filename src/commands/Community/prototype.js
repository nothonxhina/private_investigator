const { SlashCommandBuilder, EmbedBuilder, SelectMenuBuilder, ActionRowBuilder, ActionRow } = require('discord.js')

const config = require("../../../config.json");
const authorizedUsers = [...config.developers, ...config.owner];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('prototype')
    .setDescription('A dev-only command which tests multiple command functions and responses')
    .addStringOption((option) =>
        option
            .setName("function")
            .setDescription("The function to test")
            .setRequired(true)
            .setAutocomplete(true)
    )
    .setContexts(0, 1, 2)
    .setIntegrationTypes(1),

    async autocomplete(interaction) {
        const value = interaction.options.getFocused().toLowerCase();
        let choices = [
            // This command will not be public nor be ever released, most or all code will not be sent to anyone.
        ]


        const filtered = choices
            .filter(
                (choice) =>
                    choice.name.toLowerCase().includes(value) ||
                    choice.value.toLowerCase().includes(value)
            )
            .slice(0, 25);

        if (!interaction) return;

        await interaction.respond(
            filtered.map((choice) => ({
                name: choice.name,
                value: choice.value,
            }))
        );
    },
    async execute(interaction) {
        if (authorizedUsers.includes(interaction.user.id)) {
            const selectedFunction = interaction.options.getString('function');

            // Functions go here

        } else {
            await interaction.editReply({ content: 'You are not authorized to use this command.\n-# Use of this command is limited to the owner, and developers. It is not available for public use.', ephemeral: true });
        }
    }
};