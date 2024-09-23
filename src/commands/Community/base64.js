const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    data: {
        name: "base64",
        description: "base64",
        "integration_types": [1],
        "contexts": [0, 1, 2],
        options: [
            {
              name: 'prompt',
              description: 'The prompt for converting stuff ',
              required: true,
              type: ApplicationCommandOptionType.String,
            },
            {
                name: 'code',
                description: 'Encode or decode?',
                required: true,
                type: ApplicationCommandOptionType.String,
                choices: [
                    { name: 'encode', value: 'encode' },
                    { name: 'decode', value: 'decode' },
                  ]
            }
        ], 
    },
    async execute(interaction) {
      
        const prompt = interaction.options.getString('prompt');
        const code = interaction.options.getString('code');
      
        if (code === 'encode') {
          const encoded = Buffer.from(prompt).toString('base64');
          await interaction.reply(`${encoded}`);
        } else if (code === 'decode') {
          try {
            const decoded = Buffer.from(prompt, 'base64').toString();
            await interaction.reply(`${decoded}`);
            console.log(`${decoded}`)
          } catch (error) {
            await interaction.reply('Invalid base64 input');
          }
        }
console.log(`
---------------
Command: base64
Run by: ${interaction.user.username}, ${interaction.user.displayName} | ${interaction.user.id}
Time: ${new Date().toLocaleString()}
Command Options: prompt: ${prompt} | code: ${code}
--------------`)
      }
    }