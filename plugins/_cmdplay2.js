/*
╔════════════════════════════════════╗
║ 🎵 WATSON-XD-BOT YT PLAY 🎵       ║
╚════════════════════════════════════╝

✨ Type    : Plugins ESM
🌐 API     : https://kaizenapi.my.id
👑 Creator : WATSON-XD-BOT
*/

import axios from "axios"

// 🔢 Format views
function formatNumber(num) {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

let handler = async (m, { conn, text, usedPrefix, command }) => {

  // 🕒 React loading
  await conn.sendMessage(m.chat, {
    react: { text: '🕒', key: m.key }
  })

  if (!text) {
    return m.reply(`
╭━━━〔 *🎵 WATSON-XD-BOT PLAY 🎵* 〕━━━⬣
┃ ❌ Please enter song title
┃
┃ 📌 Example:
┃ ${usedPrefix + command} the story of us milet
╰━━━━━━━━━━━━━━━━━━⬣
`.trim())
  }

  try {

    const apiUrl =
      `https://kaizenapi.my.id/api/downloader/ytmp3?q=${encodeURIComponent(text)}`

    const { data } = await axios.get(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    })

    if (!data?.status || !data?.data) {
      throw "No results found"
    }

    const res = data.data
    const audioUrl = res.audio?.url

    if (!audioUrl) {
      throw "Audio URL not available"
    }

    // 📝 Caption
    let caption = `
╭━━━〔 🎶 YOUTUBE PLAY 🎶 〕━━━⬣
┃ 🎵 Title :
┃ ${res.title}
┃
┃ 👤 Channel :
┃ ${res.author?.name}
┃
┃ ⏱️ Duration :
┃ ${res.timestamp}
┃
┃ 👁️ Views :
┃ ${formatNumber(res.views)}
┃
┃ 📦 Size :
┃ ${res.audio?.size || "Unknown"}
┃
┃ 🔗 Link :
┃ ${res.url}
╰━━━━━━━━━━━━━━━━━━⬣
`.trim()

    // 🖼️ Send thumbnail
    await conn.sendMessage(
      m.chat,
      {
        image: { url: res.thumbnail },
        caption
      },
      { quoted: m }
    )

    // 🎧 Send audio
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: audioUrl },
        mimetype: "audio/mpeg",
        ptt: false
      },
      { quoted: m }
    )

    // ✅ Success react
    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key }
    })

  } catch (e) {

    console.error("[YTPLAY ERROR]", e)

    // ❌ Error react
    await conn.sendMessage(m.chat, {
      react: { text: '❌', key: m.key }
    })

    m.reply(`
╭━━━〔 ❌ ERROR ❌ 〕━━━⬣
┃ ⚠️ Failed to process request
┃ 🔁 Try again later
╰━━━━━━━━━━━━━━━━━━⬣
`.trim())
  }
}

handler.help = ["song1 <title>"]
handler.tags = ["downloader"]
handler.command = /^(song1)$/i

export default handler