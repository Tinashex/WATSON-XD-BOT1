let handler = async (m, { conn, usedPrefix, text, command }) => {

    let hash

    // Get sticker hash from quoted message
    if (m.quoted && m.quoted.fileSha256) {
        hash = m.quoted.fileSha256
    }

    // Validate hash
    if (!hash) {
        throw '❌ No sticker hash found'
    }

    let sticker = global.db.data.sticker

    // Check if sticker command exists and is locked
    if (sticker[hash] && sticker[hash].locked) {
        throw '❌ You do not have permission to delete this sticker command'
    }

    // Delete sticker command
    delete sticker[hash]

    m.reply('✅ Successfully deleted!')

}

handler.help = ['delcmd']
handler.tags = ['database']
handler.command = ['delcmd']

export default handler