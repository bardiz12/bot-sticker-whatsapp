const CONF = require("@/config");
const db = require("@/db");
const {getSession} = require("@/Session")
const botTools = require ("./tools")
const defaultMessage = require("./defaultMessage")
const {isCommandExist, commands} = require('./Commands');

const BOT_POSITION = {
    DEFAULT : 'default_message'
}

const startInfo = () => {
    return `
Informasi penggunaan :
🔵  kirim chat "Stickerify" untuk mengaktifkan mode stickerify. mode stickerify adalah tools untuk mengubah *Gambar/GIF* yang kamu kirim jadi sticker whatsapp!

🔵  untuk bantuan coba ketik *#help*
`
}
const is = {
    command : (message) => message.body.toLowerCase().indexOf("#") === 0
}

module.exports = {
    initBotListener(client){
        client.onMessage(async message => {
            
            // if(message.from.indexOf("@g.us")  > -1) {
            //     return
            // }
            // console.log(message);
            const chatSession = await getSession(message.from)
            const lowerTextChat = message.body.toLowerCase();
            if (message.body.toLowerCase() === CONF.bot.start_term) {     
                await client.simulateTyping(message.from, true);
                return await client.sendText(
                    message.from,
                    `Selamat Datang di BOT ${CONF.bot.name}\n\n`
                    +
                    startInfo() 
                );
            }
            // console.log(message.body.toLowerCase().indexOf("#"))
            if(is.command(message)){
                const commandName = message.body.toLowerCase().substring(1).split(" ")[0]
                const [, ...args] = message.body.split(" ");
                if(isCommandExist(commandName)){
                    // console.log(`COMMAND ${commandName} called`)
                    return await commands[commandName].handler(message, client, chatSession, args, {
                        commands
                    })
                }
            }

            for(let tool_chat_position in botTools){
                const tool = botTools[tool_chat_position]

                if(tool.name  === lowerTextChat){
                    if(chatSession.chat_position === tool_chat_position){
                        chatSession.chat_position = BOT_POSITION.DEFAULT
                        await chatSession.save()
                        return client.sendText(
                            message.from,
                            `Mode ${tool.toolName} dinonaktifkan!. untuk mengaktifkan kembali silahkan kirim "stickerify" di chat ini!`
                        )
                        
                    }else{
                        chatSession.chat_position = tool_chat_position
                        await chatSession.save()
                        return client.sendText(
                            message.from,
                            `Anda sekarang dalam mode ${tool.toolName}!. ${tool.description || ''}`
                        )
                    }
                    
                }
            }
            

            if(chatSession.chat_position === BOT_POSITION.DEFAULT){
                return defaultMessage(message, client)  
            }

            //check bot tools handler first
            if(chatSession.chat_position in botTools){
                return botTools[chatSession.chat_position].handler(message, client)
            }

            

        });

        client.onAddedToGroup( async chat => {
            await client.simulateTyping(message.from, true);
            return await client.sendText(
                message.from,
                `Hi, aku BOT ${CONF.bot.name}. thanks udah dimasukin ke grup ini! \n\n`
                +
                startInfo() 
            );
        })
    }
}