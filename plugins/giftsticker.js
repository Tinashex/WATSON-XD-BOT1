/*
⚠️ Do not remove WM

✨ GIF Search Sticker Plugin (ESM)
📌 Source: Tenor Scraper
📌 Output: WhatsApp Sticker
*/

import axios from "axios"
import * as cheerio from "cheerio"
import { Sticker } from "wa-sticker-formatter"

async function searchGIFs(query) {
    try {
        const url = `https://tenor.com/search/${encodeURIComponent(query)}-gifs`

        const { data } = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
            }
        })

        const $ = cheerio.load(data)
        const results = []

        $("figure.UniversalGifListItem").each((_, el) => {
            const img = $(el).find("img")
            const gifUrl = img.attr("src")
            const alt = img.attr("alt") || "GIF"

            const link = $(el).find("a").first().attr("href")

            if (gifUrl && link) {
                results.push({
                    gif: gifUrl,
                    title: alt,
                    link: "https://tenor.com" + link
                })
            }
        })

        return results
    } catch (err) {
        console.error("GIF search error:", err)
        return []
    }
}

let handler = async (m, { conn, text }) => {

    if (!text) {
        return m.reply(
`🎞️ *GIF Sticker Search*

Usage:
.gifsticker cat,5`
        )
    }

    let [query, num] = text.split(",").map(v => v.trim())

    let count = parseInt(num) || 10

    try {
        let gifs = await searchGIFs(query)

        if (!gifs.length) {
            return m.reply(`❌ No GIF results found for: *${query}*`)
        }

        let limit = Math.min(count, gifs.length)

        await m.reply(
`🎞️ Found *${gifs.length}* GIFs
📦 Sending *${limit}* stickers...`
        )

        for (let i = 0; i < limit; i++) {
            try {
                let item = gifs[i]

                let sticker = new Sticker(item.gif, {
                    pack: query,
                    author: "Watson-XD Multi-Device",
                    type: "full",
                    quality: 70
                })

                await conn.sendMessage(
                    m.chat,
                    await sticker.toMessage(),
                    { quoted: m }
                )

                await new Promise(r => setTimeout(r, 700))

            } catch (e) {
                console.error("Sticker conversion failed:", e)
            }
        }

    } catch (err) {
        console.error(err)
        m.reply("❌ Error occurred. Please try again later.")
    }
}

handler.help = ["gifsticker <query>,<count>"]
handler.tags = ["sticker"]
handler.command = /^gifsticker$/i

export default handler