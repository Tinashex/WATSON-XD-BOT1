let handler = async (m, { conn }) => {

    try {

        let plugins = Object.values(global.plugins || {})
            .filter(v => v.help && v.tags)

        let total = plugins.length

        let categories = {}

        for (let plugin of plugins) {
            let tags = Array.isArray(plugin.tags)
                ? plugin.tags
                : [plugin.tags]

            for (let tag of tags) {
                if (!categories[tag]) categories[tag] = 0
                categories[tag]++
            }
        }

        let txt = `
╭━━━〔 🤖 BOT FEATURE STATS 〕━━━⬣
┃ 📦 Total Features : ${total}
┃ 🧩 Total Categories : ${Object.keys(categories).length}
╰━━━━━━━━━━━━━━━━━━━━⬣
`.trim()

        for (let [tag, count] of Object.entries(categories)) {

            txt += `

╭━━〔 📂 ${tag.toUpperCase()} 〕━━⬣
┃ ⚡ Features : ${count}
╰━━━━━━━━━━━━━━━━━━━━⬣`
        }

        txt += `

╭━━〔 🚀 SYSTEM INFO 〕━━⬣
┃ 🤖 Bot Name : ${global.namebot || "WATSON-XD-BOT"}
┃ 👑 Developer : ${global.author || "Unknown"}
┃ 🔥 Status : Online
╰━━━━━━━━━━━━━━━━━━━━⬣`

        await conn.sendMessage(
            m.chat,
            {
                text: txt,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    externalAdReply: {
                        title: "📦 TOTAL BOT FEATURES",
                        body: `${total} Features Loaded Successfully`,
                        thumbnailUrl: "https://files.catbox.moe/8lk6xx.jpg",
                        sourceUrl: "https://whatsapp.com",
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            },
            { quoted: m }
        )

    } catch (e) {

        console.error("TOTAL FEATURE ERROR:", e)

        m.reply(
            `❌ Failed to load feature statistics.\n\n` +
            `🛠️ Error:\n${e.message}`
        )
    }
}

handler.help = ['totalfitur', 'fitur']
handler.tags = ['info']
handler.command = /^(totalfitur|fitur)$/i

export default handler