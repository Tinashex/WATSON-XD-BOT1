let handler = async (m, { conn, text, usedPrefix, command }) => {

    // Validate quoted sticker
    if (!m.quoted) {
        throw `Reply to a sticker with *${usedPrefix + command}*`
    }

    if (!m.quoted.fileSha256) {
        throw '❌ SHA256 hash missing'
    }

    // Validate text input
    if (!text) {
        throw `Usage:\n${usedPrefix + command} <text>\n\nExample:\n${usedPrefix + command} test`
    }

    let sticker = global.db.data.sticker
    let hash = m.quoted.fileSha256

    // Permission check
    if (sticker[hash] && sticker[hash].locked) {
        throw '❌ You are not allowed to edit this sticker command'
    }

    // Save command
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid,
        creator: m.sender,
        at: Date.now(),
        locked: false
    }

    m.reply('✅ Success!')
}

handler.help = ['setcmd <text>']
handler.tags = ['database']
handler.command = ['setcmd']

export default handler