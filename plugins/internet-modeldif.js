import fetch from "node-fetch"

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    try {
        if (!text || isNaN(text)) {
            return m.reply(
                `❌ Please enter a valid model index number.\n\n` +
                `📌 Example:\n` +
                `${usedPrefix + command} 0`
            )
        }

        await conn.sendMessage(m.chat, {
            react: { text: '⏳', key: m.key }
        })

        let res = await fetch('https://civitai.com/api/v1/models')
        let json = await res.json()

        if (!json.items || !json.items.length) {
            throw new Error('No models found.')
        }

        let index = parseInt(text)

        if (index >= json.items.length || index < 0) {
            return m.reply(
                `❌ Model index not found.\n` +
                `Available range: 0 - ${json.items.length - 1}`
            )
        }

        let model = json.items[index]
        let version = model.modelVersions?.[0]
        let image = version?.images?.[0]

        if (!image?.meta?.prompt) {
            return m.reply('❌ Prompt metadata not available for this model.')
        }

        let prompt = image.meta.prompt

        let caption = `
╭━━━〔 🎨 CIVITAI MODEL INFO 〕━━━╮

│ 🧠 Model Name :
│ ${model.name}

│ 👤 Creator :
│ ${model.creator?.username || 'Unknown'}

│ 📦 Type :
│ ${model.type || 'Unknown'}

│ ⭐ Rating :
│ ${model.stats?.rating || 0}

│ ❤️ Favorites :
│ ${model.stats?.favoriteCount || 0}

│ ⬇️ Downloads :
│ ${model.stats?.downloadCount || 0}

╰━━━━━━━━━━━━━━━━━━━━╯

📝 *AI Prompt:*

${prompt}
`.trim()

        await conn.sendMessage(m.chat, {
            image: { url: image.url },
            caption,
            contextInfo: {
                externalAdReply: {
                    title: model.name,
                    body: `CivitAI Model Explorer`,
                    thumbnailUrl: image.url,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    sourceUrl: `https://civitai.com/models/${model.id}`
                }
            }
        }, { quoted: m })

        await conn.sendMessage(m.chat, {
            react: { text: '✅', key: m.key }
        })

    } catch (e) {
        console.error(e)

        m.reply(
            `❌ Failed to fetch model data.\n` +
            `Reason: ${e.message}`
        )
    }
}

handler.help = ['modeldif <index>']
handler.tags = ['internet']
handler.command = /^(modeldif|civitai|modelprompt)$/i
handler.limit = true

export default handler