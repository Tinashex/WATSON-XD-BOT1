import { makeCaption } from '../lib/watsonBrand.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply('Example:\n.graffiti Watson')

    const text = encodeURIComponent(args.join(' '))
    const url = `https://api.nexray.eu.cc/textpro/v5/graffiti?text=${text}`

    // react to command
    if (m.key) {
        await conn.sendMessage(m.chat, {
            react: { text: '🎨', key: m.key }
        })
    }

    // send generated image
    await conn.sendMessage(
        m.chat,
        {
            image: { url },
            caption: makeCaption('🎨 Graffiti v5 Logo', args.join(' '))
        },
        { quoted: m }
    )
}

handler.help = ['graffiti <text>']
handler.tags = ['maker']
handler.command = /^(graffiti)$/i

export default handler