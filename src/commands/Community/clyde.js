const { ApplicationCommandOptionType } = require('discord.js')
const axios = require('axios')
const config = require('../../../config.json')

const finetune = "<finetune>" // Please contact me to get the Clyde finetune
const authorizedUsers = [...config.beta_testers, ...config.owner]

module.exports = {
    data: {
        name: "clyde",
        description: "OpenAI's ChatGPT finetuned to act like Clyde; old Discord AI",
        "integration_types": [1],
        "contexts": [0, 1, 2],
        options: [
            {
              name: 'prompt',
              description: 'The prompt for the gpt',
              required: true,
              type: ApplicationCommandOptionType.String,
            }
        ], 
    },
    async execute(interaction) {
        await interaction.deferReply();
    
        const prompt = interaction.options.getString('prompt');
        const user = interaction.user.username
    
        // Add function for connecting with any AI (Axios was used here)
    
        try {
            const response = await axios.request(options);
            const text = response.data.content; // Access the "text" property
            interaction.editReply({ content: text });
console.log(`
---------------
Command: clyde
Run by: ${interaction.user.username}, ${interaction.user.displayName} | ${interaction.user.id}
Time: ${new Date().toLocaleString()}
Command Options: prompt: ${prompt}
Command Response: ${text}
--------------`)            
          } catch (error) {
            interaction.editReply({ content: 'An error occurred while processing your request.' });
          }   
      },
    };