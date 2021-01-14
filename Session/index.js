const { ChatSessionModel } = require("../Models")

module.exports = {
    async getSession(number){
        let chatSession = await ChatSessionModel.findOne({
            '_id' : number
        })

        if(chatSession === null){
            chatSession = new ChatSessionModel({
                '_id' : number,
                chat_position : "default_message",
                name : ""
            })
            await chatSession.save()
        }

        return chatSession
    }
}