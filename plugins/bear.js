import { makeCaption } from '../lib/watsonBrand.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply('Example:\n.bear Watson')

    const text = encodeURIComponent(args.join(' '))
    const url = `https://api.nexray.eu.cc/textpro/bear?text=${text}`

    // reaction
    if (m.key) {
        await conn.sendMessage(m.chat, {
            react: { text: '🐻', key: m.key }
        })
    }

    // send image
    await conn.sendMessage(
        m.chat,
        {
            image: { url },
            caption: makeCaption('🐻 Bear Text Logo', args.join(' '))
        },
        { quoted: m }
    )
}

handler.help = ['bear <text>']
handler.tags = ['maker']
handler.command = /^(bear)$/i

export default handler