module.exports = {
    name : "Help",
    isPublic: true,
    description : "Show Help",
    command : "help",
    handler :  async (message, client, session, args, options) => {
    const {commands} = options
    
    let listperintah = ""
    for(let key in commands){
        const item = commands[key]
        if(item.isPublic === false) continue
        listperintah += `#${item.command} : ${item.description}\n`
    }
    const helpText =  `
🤖 BardizBot V1

Perintah : 

${listperintah}

🛠 Tools
👉 Stickerify : tools untuk mengubah *Gambar/GIF* menjadi Sticker whatsapp!. untuk mengaktifkan silahkan chat *stickerify*. untuk kirim gambar *PNG* pastikan kamu kirim via Document ya.
`

        return client.sendText(message.from, helpText)
    }
}