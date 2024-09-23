const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    data: {
        name: "freakify",
        description: "Freakifies stuff",
        "integration_types": [1],
        "contexts": [0, 1, 2],
        options: [
            {
              name: 'prompt',
              description: 'The prompt for freakifying stuff',
              required: true,
              type: ApplicationCommandOptionType.String,
            }
        ], 
    },
    async execute(interaction) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const shiftedAlphabet = [
          '𝓪', '𝓫', '𝓬', '𝓭', '𝓮', '𝓯', '𝓰', '𝓱', '𝓲', '𝓳', '𝓴', '𝓵', '𝓶', '𝓷', '𝓸', '𝓹', '𝓺', '𝓻', '𝓼', '𝓽', '𝓾', '𝓿', '𝔀', '𝔁', '𝔂', '𝔃'
        ];

        const uppercaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const shiftedUppercaseAlphabet = [
          '𝓐', '𝓑', '𝓒', '𝓓', '𝓔', '𝓕', '𝓖', '𝓗', '𝓘', '𝓙', '𝓚', '𝓛', '𝓜', '𝓝', '𝓞', '𝓟', '𝓠', '𝓡', '𝓢', '𝓣', '𝓤', '𝓥', '𝓦', '𝓧', '𝓨', '𝓩'
        ];

        const numbers = '0123456789';
        const shiftedNumbers = [
          '𝟎', '𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗'
        ];

        const prompt = interaction.options.getString('prompt');
        const gorbifiedText = prompt.split('').map(char => {
          if (alphabet.includes(char.toLowerCase())) {
            if (char === char.toLowerCase()) {
              return shiftedAlphabet[alphabet.indexOf(char)];
            } else {
              return shiftedUppercaseAlphabet[uppercaseAlphabet.indexOf(char)];
            }
          } else if (numbers.includes(char)) {
            return shiftedNumbers[numbers.indexOf(char)];
          } else {
            return char;
          }
        }).join('');

        if (gorbifiedText.length === 0) {
            await interaction.reply({ content: 'Please provide a valid prompt to freakify.', ephemeral: true });
        } else {
            await interaction.reply({ content: `${gorbifiedText}` });
        }

        // and yes, I did c&p gorbify here since i was feelign lazy and not a lot of edits were needed

console.log(`
---------------
Command: freakify
Run by: ${interaction.user.username}, ${interaction.user.displayName} | ${interaction.user.id}
Time: ${new Date().toLocaleString()}
Command Options: prompt: ${prompt}
Command Response: ${gorbifiedText}
--------------`)        
    }
}