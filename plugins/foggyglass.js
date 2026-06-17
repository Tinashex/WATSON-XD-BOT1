import { makeCaption } from '../lib/watsonBrand.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply('Example:\n.foggyglass Watson')

    const text = encodeURIComponent(args.join(' '))
    const background = 'bear' // you can change this later or make it dynamic

    const url = `https://api.nexray.eu.cc/textpro/foggy-glass?text=${text}&background=${background}`

    if (m.key) {
        await conn.sendMessage(m.chat, {
            react: { text: '🌫️', key: m.key }
        })
    }

    await conn.sendMessage(
        m.chat,
        {
            image: { url },
            caption: makeCaption(
                '🌫️ Foggy Glass Effect',
                args.join(' ')
            )
        },
        { quoted: m }
    )
}

handler.help = ['foggyglass <text>']
handler.tags = ['maker']
handler.command = /^(foggyglass|foggy)$/i

export default handler