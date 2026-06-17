let handler = async (m) => {
    let chat = global.db.data.chats[m.chat]

    // safety check (create structure if missing)
    if (!chat) global.db.data.chats[m.chat] = { isBanned: false }

    if (!chat?.isBanned) {
        return m.reply('ℹ️ This chat is not banned.')
    }

    chat.isBanned = false

    // optional log in console
    console.log(`[UNBAN CHAT] ${m.chat} unbanned by ${m.sender}`)

    m.reply('✅ Chat has been unbanned successfully!')
}

handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^(unbanchat|ubnc)$/i
handler.owner = true

export default handler