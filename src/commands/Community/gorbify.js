const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    data: {
        name: "gorbify",
        description: "Gorbifies stuff",
        "integration_types": [1],
        "contexts": [0, 1, 2],
        options: [
            {
              name: 'prompt',
              description: 'The prompt for gorbifying stuff',
              required: true,
              type: ApplicationCommandOptionType.String,
            }
        ], 
    },
    async execute(interaction) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const shiftedAlphabet = '⏃⏚☊⎅⟒⎎☌⊑⟟⟊☍⌰⋔⋏⍜⌿⍾⍀⌇⏁⎍⎐⍙⌖⊬⋉';

        const numbers = '0123456789';
        const shiftedNumbers = '⚌⚍⚎⚏⏑⏒⏓⏔⏕⌀';

        const prompt = interaction.options.getString('prompt');
        const gorbifiedText = prompt.toLowerCase().split('').map(char => {
          if (alphabet.includes(char)) {
            return shiftedAlphabet[alphabet.indexOf(char)];
          } else if (numbers.includes(char)) {
            return shiftedNumbers[numbers.indexOf(char)];
          } else {
            return char;
          }
        }).join('');

        await interaction.reply(gorbifiedText);

console.log(`
---------------
Command: gorbify
Run by: ${interaction.user.username}, ${interaction.user.displayName} | ${interaction.user.id}
Time: ${new Date().toLocaleString()}
Command Options: prompt: ${prompt}
Command Response: ${gorbifiedText}
--------------`)  
    }
}