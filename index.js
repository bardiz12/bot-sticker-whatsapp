require('dotenv').config()
require('module-alias/register')
const wa = require('@open-wa/wa-automate');
const web = require("@/web")
const bot = require("@/bot")
const mongoose = require('mongoose');
const config = require("./config")

mongoose.connect('mongodb://localhost:27017/wa-bot', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    wa.create({
        sessionId: config.bot.identifier,
        // authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
        // blockCrashLogs: true,
        // disableSpins: true,
        headless: true,
        // hostNotificationLang: 'PT_BR',
        // logConsole: false,
        // popup: true,
        // qrTimeout: 0, //0 means it will wait 
    }).then(async client => {
        bot.initBotListener(client)
        web.startWebService(client)
    });
});