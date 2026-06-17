let handler = async (m, { conn, text }) => {
    if (!text) throw 'Who do you want to remove as owner user?'
    
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    
    if (!who) throw 'Tag someone?'
    
    let users = global.db.data.users
    users[who].owner = false
    users[who].ownerTime = 0
    
    conn.reply(m.chat, 'Done!', m)
}

handler.help = ['delown']
handler.tags = ['owner']
handler.command = /^delown(user)?$/i
handler.rowner = true

export default handler