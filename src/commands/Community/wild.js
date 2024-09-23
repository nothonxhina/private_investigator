const fs = require('fs');
const path = require('path');
const config = require('../../../config.json')

const authorizedUsers = [...config.beta_testers, ...config.owner]

module.exports = {
    data: {
        name: "wild",
        description: "Sends random media from shitpost accounts on 𝕏",
        "integration_types": [1],
        "contexts": [0, 1, 2]
    },
    async execute(interaction) {
        await interaction.deferReply();

            const filePaths = [
                "../../../tweets/ShitpostGate",
                "../../../tweets/videos144p",
                "../../../tweets/LocalBateman",
                "../../../tweets/ImagesOOC",
                "../../../tweets/videosinfolder",
                "../../../tweets/picsthatg0hard_",
                "../../../tweets/shitpost_2077",
                "../../../tweets/brainrotpostig"
            ];

            // Get a list of files in the selected directory
            const imagePath = path.join(__dirname, `${filePaths[Math.floor(Math.random() * filePaths.length)]}`);
            const files = fs.readdirSync(imagePath);

            // Select a random file
            const randomFile = files[Math.floor(Math.random() * files.length)];

            // Send the media file as an attachment
            await interaction.editReply({ files: [{ attachment: `${imagePath}/${randomFile}`, name: randomFile }] });

            // I will not include media in the tweets folder as it would take gigabytes of storage, sorry ¯\_(ツ)_/¯

console.log(`
---------------
Command: wild
Run by: ${interaction.user.username}, ${interaction.user.displayName} | ${interaction.user.id}
Time: ${new Date().toLocaleString()}
Command Response: ${imagePath} | ${randomFile}
--------------`)
    }
};