const { ApplicationCommandOptionType } = require('discord.js')
const axios = require('axios')
const config = require('../../../config.json')

const authorizedUsers = [...config.beta_testers, ...config.owner]

module.exports = {
    data: {
        name: "mathgpt",
        description: "ChatGPT, but in gdms and only helps in math...",
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
    
        // Add function for connecting with any AI (Axios was used here)
          
          try {
              const response = await axios.request(options);
              const apimath = response.data.content;
              interaction.editReply({ content: apimath })
console.log(`
---------------
Command: mathgpt
Run by: ${interaction.user.username}, ${interaction.user.displayName} | ${interaction.user.id}
Time: ${new Date().toLocaleString()}
Command Options: prompt: ${prompt}
Command Response: ${apimath}
--------------`)              
          } catch (error) {
              interaction.editReply({ content: "An error occured, please try again later" })
          }
      },
    };