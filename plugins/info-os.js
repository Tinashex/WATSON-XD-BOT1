import { performance } from 'perf_hooks'
import os from 'os'

let handler = async (m, { conn }) => {

    try {

        const start = performance.now()

        const loading = await conn.sendMessage(m.chat, {
            text: '⚡ *Scanning bot system...*'
        }, { quoted: m })

        const end = performance.now()
        const speed = (end - start).toFixed(2)

        const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
        const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2)
        const usedMem = (totalMem - freeMem).toFixed(2)

        const cpuModel = os.cpus()[0].model
        const cpuCore = os.cpus().length

        const nodeVersion = process.version
        const platform = process.platform
        const arch = process.arch

        const uptime = runtime(process.uptime())

        const ramUsage = (
            process.memoryUsage().rss / 1024 / 1024
        ).toFixed(2)

        const users = Object.keys(global.db.data.users || {}).length
        const groups = Object.keys(global.db.data.chats || {}).length
        const plugins = Object.keys(global.plugins || {}).length

        let txt = `
╭━━━〔 🤖 BOT SYSTEM STATUS 〕━━━⬣

┃ ⚡ Speed    : ${speed} ms
┃ ⏳ Uptime   : ${uptime}
┃ 🧠 RAM Used : ${ramUsage} MB
┃ 💾 Memory   : ${usedMem} GB / ${totalMem} GB

╭━━〔 🖥️ SERVER INFO 〕━━⬣
┃ 🪟 Platform : ${platform}
┃ 🏗️ Arch     : ${arch}
┃ 📦 NodeJS   : ${nodeVersion}

╭━━〔 ⚙️ CPU INFO 〕━━⬣
┃ 🧠 CPU      : ${cpuModel}
┃ 🔥 Cores    : ${cpuCore}

╭━━〔 📊 DATABASE INFO 〕━━⬣
┃ 👥 Users    : ${users}
┃ 💬 Groups   : ${groups}
┃ 🧩 Plugins  : ${plugins}

╰━━━━━━━━━━━━━━━━━━━━⬣
> Powered by WATSON-XD-BOT
`.trim()

        await conn.sendMessage(
            m.chat,
            {
                text: txt,
                contextInfo: {
                    externalAdReply: {
                        title: '⚙️ BOT SYSTEM STATUS',
                        body: `Speed ${speed} ms • Runtime ${uptime}`,
                        thumbnailUrl: 'https://files.catbox.moe/8lk6xx.jpg',
                        sourceUrl: 'https://whatsapp.com',
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            },
            { quoted: loading }
        )

    } catch (e) {

        console.error('SYSTEM STATUS ERROR:', e)

        m.reply(
            `❌ Failed to check system status.\n\n` +
            `🛠️ Error:\n${e.message}`
        )
    }
}

handler.help = ['os', 'system']
handler.tags = ['info']
handler.command = /^(os|system)$/i

handler.register = true

export default handler

function runtime(seconds) {

    seconds = Number(seconds)

    const d = Math.floor(seconds / (3600 * 24))
    const h = Math.floor(seconds % (3600 * 24) / 3600)
    const m = Math.floor(seconds % 3600 / 60)
    const s = Math.floor(seconds % 60)

    return [
        d && `${d}d`,
        h && `${h}h`,
        m && `${m}m`,
        s && `${s}s`
    ].filter(Boolean).join(' ')
}