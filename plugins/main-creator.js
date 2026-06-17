let handler = async (m, { conn }) => {
    try {
        let owners = global.owner.filter(([id, isCreator]) => id && isCreator)

        if (!owners.length) {
            return m.reply('❌ Owner data not found.')
        }

        let caption = `
╭━━━〔 👑 BOT OWNER 〕━━━╮
┃ Here are the official bot owners.
┃ Please contact only when necessary.
╰━━━━━━━━━━━━━━━━━━━━━━╯
`.trim()

        await conn.sendMessage(
            m.chat,
            {
                text: caption,
                contextInfo: {
                    externalAdReply: {
                        title: global.namebot || 'Bot Owner',
                        body: 'Official Developer Contact',
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://i.imgur.com/QxeVvOc.jpeg'
                    }
                }
            },
            { quoted: m }
        )

        await conn.sendContact(
            m.chat,
            owners.map(([id, name]) => [
                id,
                name || 'Owner'
            ]),
            m
        )

    } catch (e) {
        console.error(e)
        m.reply('❌ Failed to send owner contact.')
    }
}

handler.help = ['owner', 'creator']
handler.tags = ['main']
handler.command = /^(owner|creator)$/i

export default handler