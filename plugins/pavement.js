import { makeCaption } from '../lib/watsonBrand.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply('Example:\n.pavement Watson')

    const text = encodeURIComponent(args.join(' '))
    const url = `https://api.nexray.eu.cc/textpro/pavement?text=${text}`

    // reaction
    if (m.key) {
        await conn.sendMessage(m.chat, {
            react: { text: '🧱', key: m.key }
        })
    }

    // send image
    await conn.sendMessage(
        m.chat,
        {
            image: { url },
            caption: makeCaption('🧱 Pavement Text Logo', args.join(' '))
        },
        { quoted: m }
    )
}

handler.help = ['pavement <text>']
handler.tags = ['maker']
handler.command = /^(pavement)$/i

export default handler