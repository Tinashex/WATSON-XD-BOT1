/**
  ✧ random anime image ✧ ───────────────────────
  𖣔 Type   : Plugin ESM
  𖣔 Source : safe random API
  𖣔 Bot    : WATSON-XD-BOT
*/

let handler = async (m, { conn }) => {
  try {

    // reaction loading
    await conn.sendMessage(m.chat, {
      react: { text: '⏳', key: m.key }
    })

    await m.reply('⏳ Processing...')

    // SAFE anime image API (example)
    const apiUrl = 'https://api.waifu.pics/sfw/waifu'
    const res = await fetch(apiUrl)

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const json = await res.json()

    await conn.sendMessage(m.chat, {
      image: { url: json.url },
      caption: '🌸 Random anime image for you!'
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply(`❌ Error: ${e.message}`)
  } finally {
    await conn.sendMessage(m.chat, {
      react: { text: '', key: m.key }
    })
  }
}

handler.help = ['anime']
handler.tags = ['random']
handler.command = /^anime$/i

export default handler