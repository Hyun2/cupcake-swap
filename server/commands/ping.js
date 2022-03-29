const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('야')
        .setDescription('호라고 대답합니다!'),  // 명령어에 대한 설명 
    async execute(interaction) {
        //실제 bot이 대답할 말.
        await interaction.reply('호');
    }
}