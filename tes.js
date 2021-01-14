const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/wa-bot', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
const {getSession} = require("./Session")
const {ChatSession, ChatSessionModel} = require("./Models") 


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
   console.log('connected')
   const data = await ChatSessionModel.countDocuments({}).exec();
   console.log(data)


});

