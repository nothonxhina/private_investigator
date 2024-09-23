const { SlashCommandBuilder, EmbedBuilder, SelectMenuBuilder, ActionRowBuilder } = require('discord.js')

const update1_0 = new EmbedBuilder()
            .setTitle("Update 1.0")
            
            const update1_1 = new EmbedBuilder()
            .setTitle("Update 1.1")

            const update1_2 = new EmbedBuilder()
            .setTitle("Update 1.2")
        
            const update1_3 = new EmbedBuilder()
            .setTitle("Update 1.3")

const commandData = new SlashCommandBuilder()
    .setName('updates')
    .setDescription('Sends the changes made in the recent update in the bot')
    .addStringOption((option) =>
        option
            .setRequired(true)
            .setName('update')
            .setAutocomplete(true)
            .setDescription(`The different changes in the bot's functionality and code`)
    )
module.exports = {
    data: {
        ...commandData,
        "integration_types": [1],
        "contexts": [0, 1, 2]
    },

    async autocomplete(interaction) {
        const value = interaction.options.getFocused().toLowerCase();
        let choices = [
            { name: "Update 1.0", value: "1" },
            { name: "Update 1.1", value: "2"},
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
        await interaction.deferReply();

        const update = interaction.options.getString('update')

        if (update === '1.0') {
            await interaction.editReply({ embeds: [update1_0] })
        } else if (update === '1.1') {
            await interaction.editReply({ embeds: [update1_1] })
        } else if (update === '1.2') {
            await interaction.editReply({ embeds: [update1_2] })
        } else if (update === '1.3') {
            await interaction.editReply({ embeds: [update1_3] })
        }
console.log(`
---------------
Command: updates
Run by: ${interaction.user.username}, ${interaction.user.displayName} | ${interaction.user.id}
Time: ${new Date().toLocaleString()}
Command Response: ${update}
--------------`)
    }
}