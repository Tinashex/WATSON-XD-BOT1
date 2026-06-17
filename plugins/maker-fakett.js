import axios from 'axios'

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.sendMessage(m.chat, {
      text:
`🎭 *Fake TikTok Profile Generator*

📌 Format:
${usedPrefix + command} Name|Username|Followers|Following|Likes|Bio|Verified|isFollow|Theme

📍 Example:
${usedPrefix + command} Zen 🪐|zen|4020030|12|789000|Coding lover 🔥|true|true|dark`
    }, { quoted: m })
  }

  let [
    name,
    username,
    followers,
    following,
    likes,
    bio,
    verified = 'true',
    isFollow = 'true',
    dark = 'true'
  ] = text.split('|').map(v => v.trim())

  if (!name || !username || !followers || !following || !likes || !bio) {
    return m.reply('❌ Format salah!\nGunakan format: Name|Username|Followers|Following|Likes|Bio|Verified|isFollow|Theme')
  }

  try {
    await m.reply('⏳ Membuat fake TikTok profile...')

    const ppUrl = await conn.profilePictureUrl(m.sender, 'image')
      .catch(() => 'https://telegra.ph/file/2f61d40b7cfb440f3cfa7.jpg')

    const apiUrl = `https://flowfalcon.dpdns.org/imagecreator/faketiktok`
      + `?name=${encodeURIComponent(name)}`
      + `&username=${encodeURIComponent(username)}`
      + `&pp=${encodeURIComponent(ppUrl)}`
      + `&verified=${verified}`
      + `&followers=${followers}`
      + `&following=${following}`
      + `&likes=${likes}`
      + `&bio=${encodeURIComponent(bio)}`
      + `&dark=${dark}`
      + `&isFollow=${isFollow}`

    const { data } = await axios.get(apiUrl, { responseType: 'arraybuffer' })

    await conn.sendMessage(m.chat, {
      image: Buffer.from(data),
      caption:
`✅ *Fake TikTok Generated*

👤 Name: ${name}
🔖 Username: @${username}
👥 Followers: ${followers}
❤️ Likes: ${likes}
📝 Bio: ${bio}`
    }, { quoted: m })

  } catch (err) {
    console.error(err)
    m.reply('❌ Failed to generate Fake TikTok profile.')
  }
}

handler.help = ['faketiktok <data>']
handler.tags = ['maker']
handler.command = /^faketiktok|tiktokfake$/i
handler.limit = true

export default handler