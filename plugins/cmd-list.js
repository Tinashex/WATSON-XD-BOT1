let handler = async (m, { conn }) => {

    let stickerDB = global.db.data.sticker || {}

    let list = Object.entries(stickerDB)
        .map(([key, value], index) => {

            return `${index + 1}. ${value.locked ? '(Locked) ' : ''}${key} : ${value.text || ''}`

        })
        .join('\n')

    if (!list) {
        list = 'No sticker commands found.'
    }

    let mentions = Object.values(stickerDB)
        .map(x => x.mentionedJid || [])
        .flat()

    conn.reply(
        m.chat,
        `
*CMD LIST*
\`\`\`
${list}
\`\`\`
        `.trim(),
        null,
        {
            mentions
        }
    )
}

handler.help = ['listcmd']
handler.tags = ['database']
handler.command = ['listcmd']

export default handler