const {isAdmin} = require("./helpers")
const {ChatSessionModel, Setting} = require("@/Models")
module.exports = async (message, client) => {
    const text = message.body.toLowerCase()
    const from = message.from
    const fromNumber = message.sender.id.split("@")[0]

    if(text === 'admin info'){
        if(isAdmin(fromNumber)){
            const totalUser = await ChatSessionModel.countDocuments({}).exec();
            const setting = await Setting.findOne({_id: "sticker_counter"})
            const totalStickerSent = setting.value || 'not found'
            return await client.sendText(from,
`
🔵 Informasi Admin
- Total Sticker terkirim : ${totalStickerSent}
- Total Pengguna ChatBot : ${totalUser}
`)
        }
    }
    
}