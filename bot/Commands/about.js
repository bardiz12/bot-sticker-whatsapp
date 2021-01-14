module.exports = {
    name : "About",
    isPublic: true,
    description : "Informasi Developer",
    command : "about",
    handler :  async (message, client, session, args, options) => {
    
    const helpText =  `
🤖 BardizBot V1


Created by Bardizba Z. follow me here,
🔗 https://bardiz.netlify.app
🐦 https://twitter.com/bardiz12

`

        return client.sendText(message.from, helpText)
    }
}