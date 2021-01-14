const {Setting} = require("@/Models")

const stickerCounter  = async () => {
    let settingStickerCounter = await Setting.findOne({'_id' : "sticker_counter"})
    if(settingStickerCounter === null){
        settingStickerCounter = new Setting({
            '_id': "sticker_counter",
            value : "0"
        })
        await settingStickerCounter.save();
    }

    settingStickerCounter.value = `${parseInt(settingStickerCounter.value) + 1}`
    await settingStickerCounter.save()
}
module.exports = {
    name : "stickerify",
    toolName : "Stickerify",
    description : "Silahkan kirim gambar apapun ke chat ini!",
    handler  : async (message, client) => {
        // console.log(message);
        if(message.isMedia){
            const {isGif, type} = message;
            const media = await client.decryptMedia(message)
            
            let sendSticker = false
            if(isGif && type === 'video'){
                client.sendText(message.from , "Bentar gan, GIF nya lagi diubah jadi sticker.")
                sendSticker = await client.sendMp4AsSticker(message.from, media)
            }else{
                client.sendText(message.from , "Bentar gan, stikernya bentar lagi dikirim!!")
                sendSticker = await client.sendImageAsSticker(message.from, media)
                console.log(sendSticker)
            }
            
            if(sendSticker){
                await stickerCounter()
                client.sendText(message.from , "Sticker nya udah berhasil dikirim!!")
            }else{
                client.sendText(message.from , "Maaf, server nya ngga kuat gan 😅!!")
            }

            return
        }else{
            // console.log(message.mimetype)
            if(message.mimetype === 'image/png'){
                // console.log("BEFOREDOWN")
                const media = await client.decryptMedia(message)
                // console.log("BEFOREMED")
                if(media){
                    client.sendText(message.from , "Bentar gan, stikernya bentar lagi dikirim!!")
                    const sendSticker = await client.sendImageAsSticker(message.from, media)
                    await stickerCounter()
                }else{
                    // console.log("NOTDOWNLOADED")
                }
                
            }
        }
    }
}