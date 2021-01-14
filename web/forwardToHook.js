const config = require("@/config")
const { default: axios } = require("axios")

module.exports = async (client, message) => {
    const urls = config.hook.url
    urls.array.forEach(url => {
        axios.post(url, {
            client,
            message
        })
    });
}