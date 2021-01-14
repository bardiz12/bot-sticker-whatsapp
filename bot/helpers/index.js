const {admin} = require("@/config")

module.exports = {
    isAdmin : number => {
        return admin.numbers.indexOf(`${number}`) >= 0
    },
    isAdminByMessage : message => {
        return admin.numbers.indexOf(`${message.sender.id.split("@")[0]}`) >= 0
    }
}