let handler = async (m, { conn, command }) => {
    try {
        let pick
        if (command.toLowerCase() === "gaycheck") {
            pick = pickRandom(global.gay)
            conn.reply(m.chat, `🏳️‍🌈 ${pick}`, m)
        } else if (command.toLowerCase() === "bicheck") {
            pick = pickRandom(global.bi)
            conn.reply(m.chat, `⚡ ${pick}`, m)
        } else if (command.toLowerCase() === "straightcheck") {
            pick = pickRandom(global.straight)
            conn.reply(m.chat, `💙 ${pick}`, m)
        } else {
            m.reply("❌ Unknown command. Use *gaycheck*, *bicheck* or *straightcheck*.")
        }
    } catch (e) {
        console.error(e)
        m.reply("❌ Something went wrong while checking personality.")
    }
}

handler.help = ['gaycheck', 'bicheck', 'straightcheck']
handler.tags = ['fun']
handler.command = /^(gaycheck|bicheck|straightcheck)$/i

handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.limit = true

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

// =========================
// English fun lists
// =========================
global.gay = [
    'Gay Level: 1%\n\nAlmost zero! Safe! 😎',
    'Gay Level: 22%\n\nSlightly flirty 😏',
    'Gay Level: 56%\n\nYou’re kinda gay 😉',
    'Gay Level: 89%\n\nSuper gay! 🌈',
    'Gay Level: 100%\n\nUltimate gay legend! 🏳️‍🌈',
    'Gay Level: 35%\n\nGay ¼',
    'Gay Level: 77%\n\nCan’t deny it anymore!'
]

global.bi = [
    'Bi Level: 0%\n\nNot bi at all! 😅',
    'Bi Level: 20%\n\nA little curious 🤔',
    'Bi Level: 45%\n\nMaybe bi? 😏',
    'Bi Level: 70%\n\nPretty bi! 🌈',
    'Bi Level: 90%\n\nAbsolutely bi! 😎',
    'Bi Level: 50%\n\nHalf bi, half curious 😉',
    'Bi Level: 100%\n\nUltimate bi legend! 🌈'
]

global.straight = [
    'Straight Level: 5%\n\nNot very straight 😅',
    'Straight Level: 25%\n\nMostly straight 😏',
    'Straight Level: 50%\n\nBalanced straight/curious 😉',
    'Straight Level: 75%\n\nPretty straight 😎',
    'Straight Level: 100%\n\nUltimate straight legend! 💙',
    'Straight Level: 40%\n\nSometimes straight, sometimes curious 😏',
    'Straight Level: 90%\n\nVery straight! 💙'
]