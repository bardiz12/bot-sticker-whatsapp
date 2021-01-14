const express = require('express')
const bodyParser = require("body-parser")
const Validator = require("validatorjs")

const webService = (client) => {
    const app = express()

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    app.post('/send', async function (req, res) {
        const formData = req.body;
        const validator = new Validator(formData, {
            number: 'required|numeric',
            type: 'required|in:message,media',
            message: 'sometimes|string',
            media: 'sometimes'
        })

        if (validator.fails()) {
            return res.json({
                success: false,
                message: 'Data yang anda kirimkan tidak lengkap!',
                errors: validator.errors.all()
            })
        }

        let { type, message, media, number } = formData

        if (type === 'message') {
            number += "@c.us"
            const wa = await client.sendText(number, message)
            return res.json({
                success : wa !== false,
                data : wa
            })
        }
        
        if (type === 'media') {

        }
    })

    app.post("/broadcast-all", async function(req, res){
        const formData = req.body

        const validator = new Validator(formData, {
            type: 'required|in:message,media',
            message: 'sometimes|string',
        })

        if (validator.fails()) {
            return res.json({
                success: false,
                message: 'Data yang anda kirimkan tidak lengkap!',
                errors: validator.errors.all()
            })
        }

        let { type, message } = formData
        const data = await ChatSessionModel.find()

        
        if (type === 'message') {
            data.forEach(chatSession => {
                client.sendText(chatSession._id, message)
            })
            return res.json({
                success : true,
                data : "Trying to send message to " + data.length + " contact"
            }) 
        }
    })

    const port = 3000
    app.listen(port, () => {
        console.log(`Whatsapp API server on http://localhost:${port}`)
    })
    
}

module.exports = {
    webService
}