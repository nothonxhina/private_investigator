module.exports = {
    data: {
        name: "sponsor",
        description: "Sponsors your chat!",
        "integration_types": [1],
        "contexts": [0, 1, 2]
    },
    async execute(interaction) {

        const sponsors = [
        // Please create your own, I don't want you leeching off the contents on this bot lmao
        ];

        const sponsor = `${sponsors[Math.floor(Math.random() * sponsors.length)]}`;

        await interaction.reply({ content: `${sponsor} ` })

console.log(`
---------------
Command: sponsor
Run by: ${interaction.user.username}, ${interaction.user.displayName} | ${interaction.user.id}
Time: ${new Date().toLocaleString()}
Command Response: ${sponsor}
--------------`)
    }
}