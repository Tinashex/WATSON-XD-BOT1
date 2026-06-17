/**
 ╔══════════════════════
      ⧉  [Copilot (GPT-5)] — [AI]
 ╚══════════════════════

  ✺ Type     : ESM Plugin
  ✺ Source   : https://whatsapp.com/channel/0029Vb5vz4oDjiOfUeW2Mt03
  ✺ Creator  : SXZnightmare
  ✺ API      : https://theresapis.vercel.app
  ✺ Model    : gpt-5 Copilot
*/

let handler = async (m, { conn, text, usedPrefix, command }) => {

    try {

        // Input validation
        if (!text) {
            return m.reply(
                `Example: ${usedPrefix + command} Advantages of Titan Elite keyboard`
            )
        }

        // Loading reaction
        await conn.sendMessage(
            m.chat,
            {
                react: {
                    text: '⏳',
                    key: m.key
                }
            }
        )

        // API request
        const url =
            `https://theresapis.vercel.app/ai/copilot?message=` +
            encodeURIComponent(text) +
            `&model=gpt-5`

        const r = await fetch(url)
        const j = await r.json()

        // Response validation
        if (!j?.status || !j?.result) {
            return m.reply(
                '🍂 Error while processing request.'
            )
        }

        const answer =
            j.result.text || 'No result found.'

        const citations =
            j.result.citations || []

        let caption =
`🤖 GPT-5 Answer

${answer}

`

        // Add citations if exist
        if (citations.length > 0) {

            caption += `🔗 References:\n\n`

            for (let i of citations.slice(0, 10)) {
                caption +=
`• ${i.title}
${i.url}

`
            }
        }

        // Send response
        await conn.sendMessage(
            m.chat,
            {
                text: caption
            },
            {
                quoted: m.quoted ? m.quoted : m
            }
        )

    } catch (e) {

        console.log(e)

        await m.reply(
            '🍂 Internal error, please try again.'
        )

    } finally {

        // Remove reaction
        await conn.sendMessage(
            m.chat,
            {
                react: {
                    text: '',
                    key: m.key
                }
            }
        )
    }
}

handler.help = ['gpt5']
handler.tags = ['ai']
handler.command = /^(gpt5)$/i
handler.register = true

export default handler