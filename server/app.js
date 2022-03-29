const express = require('express');
const app = express();
const cors = require("cors");
const { sequelize } = require('./database/models');
const fs = require('fs');
//router import
const accountRouter = require('./routes/AccountRouter')
const swapRouter = require('./routes/swapRouter')
const { token } = require('./config.json');
require("dotenv").config();


// '/'로 들어오는 요청은 기본적으로 indexRouter로 이동해서 된다.

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/account', accountRouter)
app.use('/swap', swapRouter);

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });





//디스코드 봇 설정 

  //v12  
// const Discord = require('discord.js');	// discord.js 라이브러리 호출
//const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES","GUILD_MEMBERS"] })	// Client 객체 생성


//v13
const { Client, Intents, MessageEmbed,WebhookClient } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_WEBHOOKS] })	// Client 객체 생성

// client.once('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);

// });


// client.fetchWebhook('957190200633733120', "Mzu450xIMgQoHog4AEZ2mE2-LMwWDm6qqyipvZcnhMkd8ZBtCQYZwbPuU3ZTzYzQfEYh")
//   .then(webhook => webhook.send('난 이제 살아 있어요!'))
//   .catch(console.error);


client.on('messageCreate', async msg => {

    //   console.log(msg.author);       
    // const user = await client.users.fetch(msg.author.id);
    // user.send(msg.content);
  if(msg.webhookId === "957190200633733120"){
        msg.channel.send(`이건말이여 transaction성공 했을때 보내주는 메세지여~~`);
    };
    try { 
        // !ping 
            if (msg.content === '!야') msg.channel.send(`!호`); // 채팅에서 메세지가 들어왔을 때 실행할 콜백함수입니다.
    
            if (msg.content === '!avatar') msg.channel.send(msg.author.displayAvatarURL()); // 메세지를 보낸 유저의 프로필 사진을 받아옵니다.
    
            // !help
        if(msg.content === '!help') {
            // 저희는 MessageEmbed 생성자로 embed를 생성할 수 있습니다.
            const embed = new MessageEmbed()
            .setTitle("Hello I'm cupcake bot, What do you want?") // 1 - embed의 제목을 담당합니다.
            .setColor('0f4c81') // 2 - embed 사이드 바의 색을 정합니다.
            .setDescription('안녕하세요! 이곳은 추후에 설명할 공간입니다.'); // 3 - 실제로 설명을 담당하는 곳입니다.
            msg.reply({ embeds: [embed] })
        }
            
       
        if (msg.content.startsWith("안녕하세요")) { //메세지가 /안녕 으로 시작된다면
            msg.channel.send("안녀엉! 우리는 BLSTUDY그룹이야 잘부탁해!!") //안녀엉! 이라는 메세지를 채널에 전송합니다.
        }
      
        if (msg.content === 'ch') {
            let name = msg.author.username;
            msg.guild.channels.create('cupcake chat : 1', {
                type: 'text',
                parent: "957914803895148574",
            })
            msg.channel.send("Channel Created!");
        }
        
            
            //console.log(msg.author); 사용자 정보가 발생합니다.
        }catch (e) {
            console.log(e);
        }
        
});

 //memeber가 추가될때 발생하는 이벤트 
 // member가 추가되면 DB에 account와 discordId를 적재할까? 
 client.on("guildMemberAdd", (member) => {
    let channel = member.guild.channels.cache
   
    const embed = new Discord.MessageEmbed()
        .addField(
                `:point_right: Welcome!`,
                `Hello, welcome to ${member.guild.name} <@${member.user.id}>!`,
                true
                )
        .setColor("YELLOW") // 2 - embed 사이드 바의 색을 정합니다.
        .setImage(
            member.user.avatarURL() // make sure to change this to your image
              );    
    
      channel
      .find((channel) => channel.id === "957813201146359858")
      .send({ embeds: [embed] });
 });
  
    app.get('/', async(req, res) => {    
            // const result = await axios.post("https://discord.com/api/webhooks/957190200633733120/Mzu450xIMgQoHog4AEZ2mE2-LMwWDm6qqyipvZcnhMkd8ZBtCQYZwbPuU3ZTzYzQfEYh", {
            //     "content": "트랜잭션이 발 생했어요!!"
            // })
        
            const data = {
                id : process.env.WEBHOOKID,
                token : process.env.WEBHOOKTOKEN
            }
            const embed = new MessageEmbed()
                        .setTitle("transaction Success") // 1 - embed의 제목을 담당합니다.
                        .setColor("PURPLE") // 2 - embed 사이드 바의 색을 정합니다.
                        .setDescription('곧있으면 transaction 성공한 자료들을 넣어서 꾸며볼게요'); // 3 - 실제로 설명을 담당하는 곳입니다.
                       
            const hook = new WebhookClient(data);
        hook.send('hi');
    })


app.listen(5000, () => {
    console.log('5___port started1');
    // client.login(token);    
})