const {isAdminByMessage} = require("../helpers")
const {ChatSessionModel} = require("../../Models") 
module.exports = {
    name : "Broadcast",
    isPublic: false,
    description : "For Admin",
    command : "broadcast",
    handler :  async (message, client, session, args, options) => {
        //fungsi bego ini jangan dipake gan
        return
        if(isAdminByMessage(message)){
            const text = args.join(" ")
            const allChatSession = await ChatSessionModel.find({})
            if(allChatSession !== false){
                allChatSession.forEach( item => {
                    client.sendText(item.id, text)
                })
            }
            // return client.sendText(message.from, text)
        }
    }
}