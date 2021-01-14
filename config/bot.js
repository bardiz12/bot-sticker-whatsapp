module.exports = {
    start_term : process.env.BOT_START_TERM || 'start',
    name : process.env.BOT_NAME || 'Bot',
    internal_handler : process.env.BOT_INTERNAL_HANDLER || false,
    external_handler : process.env.BOT_EXTERNAL_HANDLER || false,
    identifier : process.env.BOT_IDENTIFIER || 'botwhatsapp'
}