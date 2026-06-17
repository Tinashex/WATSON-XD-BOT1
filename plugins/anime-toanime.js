/**
 ╔══════════════════════
      ⧉  ToAnime — Maker
 ╚══════════════════════

  ✺ Type     : ESM Plugin
  ✺ Creator  : SXZnightmare (Modded)
  ✺ Bot      : WATSON-XD-BOT
*/

let handler = async (m, { conn, text, usedPrefix, command }) => {

    try {

        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ""

        // Input validation
        if (!text && !/image\/(jpe?g|png|webp)/.test(mime)) {
            return m.reply(
`📸 Usage:

• Reply image:
  ${usedPrefix + command}

• Or use URL:
  ${usedPrefix + command} <image-url>`
            )
        }

        // Loading reaction
        await conn.sendMessage(m.chat, {
            react: { text: '⏳', key: m.key }
        })

        let imageUrl = text

        // If image reply → upload via Baileys CDN
        if (/image\/(jpe?g|png|webp)/.test(mime)) {

            let buffer = await q.download()
            if (!buffer) {
                return m.reply('❌ Failed to download image.')
            }

            // Correct way: send to get media URL
            const uploaded = await conn.sendMessage(
                m.chat,
                { image: buffer },
                { quoted: m }
            )

            imageUrl =
                uploaded?.message?.imageMessage?.url

            if (!imageUrl) {
                return m.reply(
                    '❌ Failed to get image URL.'
                )
            }
        }

        // API request
        const apiURL =
            `https://zelapioffciall.koyeb.app/imagecreator/toanime?url=` +
            encodeURIComponent(imageUrl)

        let r = await fetch(apiURL)

        if (!r.ok) {
            return m.reply('❌ Conversion failed.')
        }

        let hasil = Buffer.from(
            await r.arrayBuffer()
        )

        // Send result
        await conn.sendMessage(
            m.chat,
            {
                image: hasil,
                caption:
                    '✨ Successfully converted to Anime style!'
            },
            { quoted: m }
        )

    } catch (e) {

        console.error(e)

        m.reply('❌ Error while processing image.')
    }

    finally {

        await conn.sendMessage(m.chat, {
            react: { text: '', key: m.key }
        })
    }
}

handler.help = ["toanime"]
handler.tags = ["maker"]
handler.command = /^(toanime|animeconv|animeconvert)$/i
handler.limit = true

export default handler