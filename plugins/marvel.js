import { makeCaption } from '../lib/watsonBrand.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply('Example:\n.marvel Watson')

    const text = encodeURIComponent(args.join(' '))
    const background = 'logo-1' // can be changed or made dynamic
    const url = `https://api.nexray.eu.cc/textpro/marvel?text=${text}&background=${background}`

    // react to command
    if (m.key) {
        await conn.sendMessage(m.chat, {
            react: { text: '🦸‍♂️', key: m.key }
        })
    }

    // send generated image
    await conn.sendMessage(
        m.chat,
        {
            image: { url },
            caption: makeCaption('🦸 Marvel Logo', args.join(' '))
        },
        { quoted: m }
    )
}

handler.help = ['marvel <text>']
handler.tags = ['maker']
handler.command = /^(marvel)$/i

export default handler