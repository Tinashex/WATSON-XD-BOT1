let handler = async (m, { conn, text }) => {
    if (!text) throw 'Who do you want to unban?'

    let who
    if (m.isGroup) {
        who = m.mentionedJid[0]
    } else {
        who = m.chat
    }

    if (!who) throw 'Please tag a user!'

    // ensure user exists in database
    if (!global.db.data.users[who]) {
        global.db.data.users[who] = {}
    }

    global.db.data.users[who].banned = false

    m.reply('✅ User has been successfully unbanned!')
}

handler.help = ['unban']
handler.tags = ['owner']
handler.command = /^unban(user)?$/i
handler.owner = true

export default handler