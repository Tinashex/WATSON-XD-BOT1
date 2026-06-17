// ANTI LINK HANDLER
let handler = m => m

let channelRegex = /https?:\/\/whatsapp\.com\/channel\//i
let groupRegex   = /https?:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {

    // Ignore bot messages
    if ((m.isBaileys && m.fromMe) || m.fromMe) return

    // Only work in groups
    if (!m.isGroup) return

    // Ignore admins
    if (isAdmin) return

    let chat = global.db.data.chats[m.chat]

    // Anti-link feature OFF
    if (!chat.antiLink) return

    // Detect WhatsApp links
    if (!(channelRegex.test(m.text) || groupRegex.test(m.text))) return

    let sender = m.sender
    let tag = '@' + sender.split('@')[0]

    // Create warning database
    if (!chat.users) chat.users = {}

    if (!chat.users[sender]) {
        chat.users[sender] = { warn: 0 }
    }

    // Add warning
    chat.users[sender].warn += 1

    await m.reply(
        `*「 ANTI LINK 」*\n\n` +
        `Link detected from ${tag}\n` +
        `Warning: *${chat.users[sender].warn}/5*`,
        null,
        { mentions: [sender] }
    )

    // Delete link message
    if (isBotAdmin) {
        try {
            await conn.sendMessage(m.chat, { delete: m.key })
        } catch {}
    }

    // Remove user after 5 warnings
    if (chat.users[sender].warn >= 5) {

        await m.reply(
            `*「 ANTI LINK 」*\n\n${tag} reached *5 warnings* and has been removed.`,
            null,
            { mentions: [sender] }
        )

        if (isBotAdmin) {
            try {
                await conn.groupParticipantsUpdate(
                    m.chat,
                    [sender],
                    'remove'
                )
            } catch {}
        }

        // Reset warning
        chat.users[sender].warn = 0
    }

    return
}

export default handler