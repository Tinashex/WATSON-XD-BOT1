import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) {
            return m.reply(
                `❌ Please enter a package name!\n\n` +
                `📌 Example:\n` +
                `${usedPrefix + command} axios`
            )
        }

        await conn.sendMessage(m.chat, {
            react: { text: '⏳', key: m.key }
        })

        let res = await fetch(
            `https://registry.npmjs.com/-/v1/search?text=${encodeURIComponent(text)}&size=10`
        )

        let json = await res.json()

        if (!json.objects || !json.objects.length) {
            return m.reply(`❌ Package "${text}" not found.`)
        }

        let result = json.objects.map((v, i) => {
            let pkg = v.package

            return `
╭━━━〔 📦 PACKAGE ${i + 1} 〕━━━╮
│ 📛 Name    : ${pkg.name}
│ 🔖 Version : ${pkg.version}
│ 👤 Author  : ${pkg.publisher?.username || 'Unknown'}
│ 📅 Updated : ${new Date(pkg.date).toLocaleDateString()}
│ ⭐ Score    : ${v.score.final.toFixed(2)}

│ 📝 Description:
│ ${pkg.description || 'No description'}

│ 🔗 NPM:
│ ${pkg.links.npm}

│ 🌐 Homepage:
│ ${pkg.links.homepage || '-'}

│ 📂 Repository:
│ ${pkg.links.repository || '-'}
╰━━━━━━━━━━━━━━━━━━━━╯
`.trim()
        }).join('\n\n')

        await conn.sendMessage(m.chat, {
            text: `🔎 *NPM SEARCH RESULTS*\n\n${result}`,
            contextInfo: {
                externalAdReply: {
                    title: `NPM Search • ${text}`,
                    body: `${json.total} package(s) found`,
                    thumbnailUrl: 'https://static.npmjs.com/images/branding/npm-square-red.png',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    sourceUrl: `https://www.npmjs.com/search?q=${encodeURIComponent(text)}`
                }
            }
        }, { quoted: m })

        await conn.sendMessage(m.chat, {
            react: { text: '✅', key: m.key }
        })

    } catch (e) {
        console.error(e)

        m.reply(
            `❌ Failed to search NPM packages.\n` +
            `Reason: ${e.message}`
        )
    }
}

handler.help = ['npmsearch <query>']
handler.tags = ['internet']
handler.command = /^(npmsearch|npmjs|npms)$/i
handler.limit = true

export default handler