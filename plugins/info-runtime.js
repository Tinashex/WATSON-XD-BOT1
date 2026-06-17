let handler = async (m, { conn }) => {
    let uptime = process.uptime() * 1000

    if (process.send) {
        process.send('uptime')
        uptime = (await new Promise(resolve => {
            process.once('message', resolve)
            setTimeout(() => resolve(process.uptime()), 1000)
        })) * 1000
    }

    m.reply(`╭──〔 ⏳ Runtime 〕──⬣
│ 📅 Days    : ${clockString(uptime).days}
│ 🕐 Hours   : ${clockString(uptime).hours}
│ ⏰ Minutes : ${clockString(uptime).minutes}
│ ⏱ Seconds : ${clockString(uptime).seconds}
╰──────────────⬣`)
}

handler.help = ['runtime']
handler.tags = ['info']
handler.command = ['runtime', 'rt']

export default handler

function clockString(ms) {
    const days = Math.floor(ms / 86400000)
    const hours = Math.floor(ms / 3600000) % 24
    const minutes = Math.floor(ms / 60000) % 60
    const seconds = Math.floor(ms / 1000) % 60

    return {
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
    }
}