const axios = require('axios')

module.exports = {
    data: {
        name: "trivias",
        description: "Just sends random trivia question",
        "integration_types": [1],
        "contexts": [0, 1, 2],
    },
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const response = await axios.get('https://opentdb.com/api.php?amount=1');
            const data = response.data;
            const results = data.results; // Get the results array
            const difficulty = results[0].difficulty; // Access the difficulty property from the first result
            const category = results[0].category;
            const question = results[0].question;
            const answer = results[0].correct_answer;

            const formattedQuestion = question.replace(/&amp/g, "&");
            const formattedAnswer = answer.replace(/&amp/g, "&");

            interaction.editReply({ content: `# ${category}\n${difficulty}\n\n${question}\nA: ||${answer}||`})
        } catch (error) {
            console.error(error);
            await interaction.editReply('An error occurred while retrieving trivia question.');
          }      
console.log(`
---------------
Command: trivias
Run by: ${interaction.user.username}, ${interaction.user.displayName} | ${interaction.user.id}
Time: ${new Date().toLocaleString()}
Command Response: ${category} | ${difficulty} | ${question} | ${answer}
--------------`)          
      },
    };