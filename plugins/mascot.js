import { makeCaption } from '../lib/watsonBrand.js'

let handler = async (m, { conn, args }) => {
    if (args.length < 2) {
        return m.reply('Example:\n.mascot Watson XD ninja-cat')
    }

    const text1 = encodeURIComponent(args[0])
    const text2 = encodeURIComponent(args[1])
    const style = args[2] || 'ninja-cat'

    const url = `https://api.nexray.eu.cc/textpro/mascot?text1=${text1}&text2=${text2}&style=${style}`

    if (m.key) {
        await conn.sendMessage(m.chat, {
            react: { text: '🐱‍👤', key: m.key }
        })
    }

    await conn.sendMessage(
        m.chat,
        {
            image: { url },
            caption: makeCaption(
                '🐱 Mascot Logo',
                `${args[0]} + ${args[1]} (${style})`
            )
        },
        { quoted: m }
    )
}

handler.help = ['mascot <text1> <text2> <style>']
handler.tags = ['maker']
handler.command = /^(mascot)$/i

export default handler