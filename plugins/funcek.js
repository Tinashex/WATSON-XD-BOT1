import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {

    let who = m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
        ? conn.user.jid
        : m.sender

    let name = conn.getName(who)

    // Random percentage
    const percentage =
        global.cek1[
            Math.floor(Math.random() * global.cek1.length)
        ]

    // Clean command name
    let checkName =
        command.replace('check', '').toUpperCase()

    // Stylish reply
    let teks = `
╭━━━〔 🔍 CHECK RESULT 〕━━━╮
┃ 👤 User :
┃ @${who.split('@')[0]}
┃
┃ 🧪 Test :
┃ ${checkName}
┃
┃ 📊 Result :
┃ ${percentage}%
╰━━━━━━━━━━━━━━━━━━━━╯
`.trim()

    let msg = await conn.sendMessage(
        m.chat,
        {
            text: teks,
            mentions: [who]
        },
        { quoted: m }
    )

    // Auto delete after 1 minute
    setTimeout(async () => {

        try {

            await conn.sendMessage(m.chat, {
                delete: msg.key
            })

        } catch (e) {
            console.log(e)
        }

    }, 60000)
}

handler.tags = ['fun']

handler.help = handler.command = [
    'stupidcheck',
    'uglycheck',
    'gaycheck',
    'rate',
    'lesbiancheck',
    'handsomecheck',
    'beautifulcheck',
    'dumbcheck',
    'smartcheck',
    'skillfulcheck',
    'noobcheck',
    'sillycheck',
    'lazycheck',
    'goodcheck',
    'evilcheck',
    'dogcheck',
    'haramcheck',
    'playboycheck',
    'playgirlcheck',
    'hornycheck',
    'sensitivecheck',
    'fakeboycheck',
    'piouscheck',
    'coolcheck',
    'weeabocheck',
    'marketcheck',
    'nerdcheck'
]

handler.limit = true

export default handler

// Global percentage array
global.cek1 = Array.from(
    { length: 100 },
    (_, i) => (i + 1).toString()
)