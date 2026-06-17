import { createCanvas, loadImage, registerFont } from 'canvas'
import fs from 'fs'
import path from 'path'
import axios from 'axios'

const fkontak = {
  key: {
    participant: '0@s.whatsapp.net',
    remoteJid: '0@s.whatsapp.net',
    fromMe: false,
    id: 'LobbyML'
  },
  message: {
    conversation: '🎮 MLBB Lobby Generator • Enterprise'
  }
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(
        m.chat,
        `❌ Masukkan Username!\n\nContoh:\n${usedPrefix + command} WatsonXD`,
        m,
        { quoted: fkontak }
      )
    }

    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ''

    if (!mime.startsWith('image/')) {
      return conn.reply(
        m.chat,
        `❌ Harap reply gambar untuk dijadikan avatar MLBB!`,
        m,
        { quoted: fkontak }
      )
    }

    await conn.reply(
      m.chat,
      global.wait || '⏳ Processing MLBB Lobby...',
      m,
      { quoted: fkontak }
    )

    // ================= FONT =================
    const tmpDir = process.cwd()
    const fontPath = path.join(tmpDir, 'mlbb_font.ttf')

    if (!fs.existsSync(fontPath)) {
      const fontUrl = 'https://www.fuku-cloud.my.id/upload/z0gvtn.ttf'
      const fontRes = await axios.get(fontUrl, { responseType: 'arraybuffer' })
      fs.writeFileSync(fontPath, Buffer.from(fontRes.data))
    }

    registerFont(fontPath, { family: 'MLBB' })

    // ================= IMAGE =================
    const media = await q.download()
    const avatar = await loadImage(media)

    const bg = await loadImage('https://www.fuku-cloud.my.id/upload/2akeq0.jpeg')
    const frame = await loadImage('https://www.fuku-cloud.my.id/upload/rkwlf1.jpeg')

    const canvas = createCanvas(bg.width, bg.height)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    // ================= AVATAR =================
    const avatarSize = 205
    const frameSize = 293

    const centerX = (canvas.width - frameSize) / 2
    const centerY = (canvas.height - frameSize) / 2 - 282

    const avatarX = centerX + (frameSize - avatarSize) / 2
    const avatarY = centerY + (frameSize - avatarSize) / 2 - 3

    const { width, height } = avatar
    const minSide = Math.min(width, height)

    const cropX = (width - minSide) / 2
    const cropY = (height - minSide) / 2

    ctx.drawImage(
      avatar,
      cropX, cropY, minSide, minSide,
      avatarX, avatarY,
      avatarSize, avatarSize
    )

    ctx.drawImage(frame, centerX, centerY, frameSize, frameSize)

    // ================= NAME =================
    const name = text.trim()
    const maxFont = 36
    const minFont = 24

    let fontSize = maxFont
    if (name.length > 11) {
      fontSize = Math.max(minFont, maxFont - (name.length - 11) * 2)
    }

    ctx.font = `${fontSize}px MLBB`
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.fillText(name, canvas.width / 2 + 13, centerY + frameSize + 15)

    // ================= OUTPUT =================
    const buffer = canvas.toBuffer('image/png')

    await conn.sendMessage(
      m.chat,
      {
        image: buffer,
        caption:
`🎮 *MLBB Lobby Generated Successfully*

👤 Username: ${name}
✨ Status: Enterprise Render OK`
      },
      { quoted: fkontak }
    )

  } catch (e) {
    console.error(e)
    conn.reply(
      m.chat,
      `❌ Failed to generate MLBB image\n\nError: ${e.message}`,
      m,
      { quoted: fkontak }
    )
  }
}

handler.help = ['fakeml <text>']
handler.tags = ['maker']
handler.command = /^fakeml$/i
handler.limit = true

export default handler