
const { accounts } = require('../database_mongo/models/accounts');
const { proposals } = require('../database_mongo/models/proposals');
const { Client, Intents, MessageEmbed,WebhookClient, MessageActionRow,MessageButton } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_WEBHOOKS] })	// Client 객체 생성
require("dotenv").config();


const sendEmbed = async (proposedAddress,offeredAddress,proposalId) => {
    try {
        //  ---- DB에서 계정에 해당하는 discordId를 찾아와야합니다.  -----
        const addrInfo = await accounts.findOne({ address: offeredAddress });
        const discordId = (addrInfo.discordId);
        const discordData = {
            id: process.env.WEBHOOKID,
            token: process.env.WEBHOOKTOKEN
        }
    
    
        //임베드만드는 기본 양식 함수
        const embed = new MessageEmbed()
            .setTitle("SWAP") // 1 - embed의 제목을 담당합니다
            .setDescription(`${proposedAddress} PROPOSE to ${offeredAddress}`)
            .setFields([
                {
                    name: `proposal Address`,
                    value: `[${proposedAddress}](https://ropsten.etherscan.io/address/${proposedAddress})`,
                    inline: true
                },
                {
                    name: `offerd Address`,
                    value: `[${offeredAddress}](https://ropsten.etherscan.io/address/${offeredAddress})`,
                    inline: true
                },
		
                {
                    name: `discordId`,
                    value: `${discordId}`,
                    inline: true
                },
                {
                    name: `openSwap URL`,
                    value: `[swapURL](http://localhost:3000/proposal/${proposalId})`,
                    inline: true
                },
                {
                    name: `proposalId`,
                    value: `${proposalId}`,
                    inline: true
                }

            ])
            .setColor("PURPLE") // 2 - embed 사이드 바의 색을 정합니다.
            // 3 - 실제로 설명을 담당하는 곳입니다.
            .setImage("https://lh3.googleusercontent.com/Q5V9Q0PLsQqpMXaj39_CgcxVdoBQxNf1fNyJtSyA3wcgm5Fkgh9-sv97aIIgJZbPy1sC6dFFAtiZyD82cz7EoQXvkFXeLZBVK8JwEA")
        // // discordId를 통해서 보내주는 작업
        // const embed = makeEmbed(proposedAddress,offeredAddress,swapId,discordId)
        const hook = new WebhookClient(discordData);
       const result = hook.send({
            embeds: [embed],
            // files: [
            // 'https://lh3.googleusercontent.com/Q5V9Q0PLsQqpMXaj39_CgcxVdoBQxNf1fNyJtSyA3wcgm5Fkgh9-sv97aIIgJZbPy1sC6dFFAtiZyD82cz7EoQXvkFXeLZBVK8JwEA',
            // 'https://lh3.googleusercontent.com/Q5V9Q0PLsQqpMXaj39_CgcxVdoBQxNf1fNyJtSyA3wcgm5Fkgh9-sv97aIIgJZbPy1sC6dFFAtiZyD82cz7EoQXvkFXeLZBVK8JwEA '
            //]
        })
       if(result) return 1;
    
    } catch (e) {
        console.log(e);
       
    }
}

const makeCompo = () => {
    return (
        new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('accept')
                .setLabel('Accept')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('reject')
                .setLabel('Reject')  
                .setStyle('SECONDARY'),
                new MessageButton()
                .setCustomId('close')
                .setLabel('close')
                .setStyle('DANGER'),                
        )
 )   
}




client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', async msg => {
    try { 
    if (msg.webhookId === "958360197607358524") {
        if (msg.embeds[0].title === "SWAP") {
         // user.send({ embeds: [msg.embeds[0]], components: [swap] });
            const user1 = await client.users.fetch('961855942436200448');
            const user2 = await client.users.fetch(msg.embeds[0].fields[2].value);
            const proposalId = msg.embeds[0].fields[4].value;
            const swap = makeCompo(proposalId);

            const everyone = msg.guild;
            msg.guild.channels.create(`proposalId ${proposalId}`, {
                type: 'text',
                parent: "957914803895148574",
                permissionOverwrites: [ 
                    {
                        id: everyone.id,
                        deny: 'VIEW_CHANNEL'
                    },
                    {
                        id: user2.id,
                        allow : 'VIEW_CHANNEL'
                    },
                ]
            }).then((result) => {
                const channelId = result.id;
                const channel = client.channels.cache.get(channelId);
                channel.send({ embeds: [msg.embeds[0]], components: [swap] });
                channel.send("<@" + msg.embeds[0].fields[2].value  + ">");
                channel.send("<@" + user1.id + ">");


                //! 버튼반응 시간을 결정해 주는 곳 || filter도 정할 수 있음. 
                const collector = client.channels.cache.get(channelId).createMessageComponentCollector({
                    time: 1000 * 1000
                })

                //! 버튼반응 결과가 나오는 곳 
                collector.on("collect", async (interaction) => {
                    if (interaction.customId === "accept") {
                      
                        const result = await proposals.updateOne({proposalId }, { status:"accept" })
                        if (result.modifiedCount > 0) {
                            const compo = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setLabel('Accept')
                                        .setURL(`http://localhost:3000/proposal/${proposalId}`)
                                        .setStyle('LINK'),
                                )
                            client.channels.cache.get(channelId).permissionOverwrites.create(user1.id, { VIEW_CHANNEL: true, SEND_MESSAGES: false });
                            await interaction.update({ content: "<@" + user1.id + ">", components: [compo] });
                        } else {
                            return
                        }
                     
                    } else if (interaction.customId === "reject") {
                        const result = await proposals.updateOne({ proposalId }, { status: "reject" })
                        if (result.modifiedCount > 0) {
                            await interaction.update({ content: "<@" + user1.id + ">"+user2.id+" reject your proposal"+proposalId, components: [] });
                        } else {
                            console.log('reject DB변환 실패');
                            return
                        }
                      
                    } else if (interaction.customId === "close") {
                        const result = await proposals.updateOne({ proposalId }, { status: "reject" })
                        if (result.modifiedCount > 0) {
                            user1.send("user2가 제안을 거절했습니다.")
                            interaction.reply("거절했기 때문에 채널을 삭제하겠씁니다")
                            interaction.guild.channels.cache.get(channelId).delete();                 
                        } else {
                            console.log('reject DB변환 실패');
                            return
                        }
                     
                            
                    }
                   
                })

                collector.on("end", async (collect) => {
                    console.log(collect,"시간이 초과됬어요");
                } )
            })

            //msg.channel.get('960918644269920316').send({ embeds: [msg.embeds[0]], components: [swap] });
            
        }
       
    };

        // if (msg.content === 'ch') {
        //     let name = msg.author.username;
        //     msg.guild.channels.create('cupcake chat : 1', {
        //         type: 'text',
        //         parent: "957914803895148574",
        //     })
        //     msg.channel.send("Channel Created!");
        // }
        
            
            //console.log(msg.author); 사용자 정보가 발생합니다.
        }catch (e) {
            console.log(e);
        }
        
});

 //memeber가 추가될때 발생하는 이벤트 
 // member가 추가되면 DB에 account와 discordId를 적재할까? 
 client.on("guildMemberAdd", (member) => {
    let channel = member.guild.channels.cache

    const embed = new MessageEmbed()
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



 client.login(process.env.TOKEN);    
module.exports = {sendEmbed}