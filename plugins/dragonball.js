import { makeCaption } from '../lib/watsonBrand.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply('Example:\n.dragonball Watson')

    const text = encodeURIComponent(args.join(' '))
    const url = `https://api.nexray.eu.cc/textpro/dragonball?text=${text}`

    if (m.key) {
        await conn.sendMessage(m.chat, {
            react: { text: '🐉', key: m.key }
        })
    }

    await conn.sendMessage(
        m.chat,
        {
            image: { url },
            caption: makeCaption('🐉 Dragon Ball Logo', args.join(' '))
        },
        { quoted: m }
    )
}

handler.help = ['dragonball <text>']
handler.tags = ['maker']
handler.command = /^(dragonball|dball)$/i

export default handler