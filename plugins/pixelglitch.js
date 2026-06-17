import { makeCaption } from '../lib/watsonBrand.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply('Example:\n.pixelglitch Watson')

    const text = encodeURIComponent(args.join(' '))
    const url = `https://api.nexray.eu.cc/textpro/pixel-glitch?text=${text}`

    // react
    if (m.key) {
        await conn.sendMessage(m.chat, {
            react: { text: '🧊', key: m.key }
        })
    }

    // send image
    await conn.sendMessage(
        m.chat,
        {
            image: { url },
            caption: makeCaption('🧊 Pixel Glitch Logo', args.join(' '))
        },
        { quoted: m }
    )
}

handler.help = ['pixelglitch <text>']
handler.tags = ['maker']
handler.command = /^(pixelglitch)$/i

export default handler