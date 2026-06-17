import { createCanvas, loadImage } from 'canvas'
import moment from 'moment-timezone'

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {

    if (!text || !text.includes('|')) {
      return m.reply(
`❌ Invalid format!

Example:
${usedPrefix + command} username|message|avatar_url

Example:
${usedPrefix + command} WatsonXD|Hello Discord!|https://i.imgur.com/abc.png`
      )
    }

    let [username, message, avatarUrl] = text.split('|').map(v => v.trim())

    if (!username || !message) {
      return m.reply(
`⚠️ Missing username or message!

Usage:
${usedPrefix + command} username|message|avatar_url`
      )
    }

    await conn.sendMessage(m.chat, {
      react: {
        text: '⏳',
        key: m.key
      }
    })

    const avatar = await loadImage(
      avatarUrl || 'https://files.catbox.moe/ifx2y7.png'
    )

    const time = moment()
      .tz('Asia/Jakarta')
      .format('HH:mm')

    const canvas = createCanvas(950, 250)
    const ctx = canvas.getContext('2d')

    // Background
    ctx.fillStyle = '#313338'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Avatar
    ctx.save()
    ctx.beginPath()
    ctx.arc(70, 70, 45, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(avatar, 25, 25, 90, 90)
    ctx.restore()

    // Username
    ctx.font = 'bold 28px Sans'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(username, 140, 55)

    // Timestamp
    const usernameWidth = ctx.measureText(username).width

    ctx.font = '18px Sans'
    ctx.fillStyle = '#949ba4'
    ctx.fillText(
      `Today at ${time}`,
      150 + usernameWidth,
      55
    )

    // Message
    ctx.font = '24px Sans'
    ctx.fillStyle = '#dbdee1'

    const wrapText = (text, x, y, maxWidth, lineHeight) => {
      let words = text.split(' ')
      let line = ''

      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' '
        let metrics = ctx.measureText(testLine)
        let testWidth = metrics.width

        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y)
          line = words[n] + ' '
          y += lineHeight
        } else {
          line = testLine
        }
      }

      ctx.fillText(line, x, y)
    }

    wrapText(message, 140, 95, 740, 35)

    // Discord fake badge
    ctx.font = 'bold 16px Sans'
    ctx.fillStyle = '#5865F2'
    ctx.fillText('BOT', 140, 130)

    // Footer watermark
    ctx.font = '16px Sans'
    ctx.fillStyle = '#72767d'
    ctx.fillText(global.namebot || 'Launcher MD', 25, 225)

    const buffer = canvas.toBuffer('image/png')

    await conn.sendMessage(
      m.chat,
      {
        image: buffer,
        caption:
`✅ Successfully generated fake Discord chat

👤 Username: ${username}
💬 Message: ${message.substring(0, 40)}${message.length > 40 ? '...' : ''}`
      },
      { quoted: m }
    )

  } catch (e) {
    console.error(e)

    m.reply(
`❌ Failed to generate fake Discord image.

${e.message}`
    )
  }
}

handler.help = [
  'fdc <username|message|avatar>',
  'fakediscord <username|message|avatar>'
]

handler.tags = ['maker']

handler.command = /^(fdc|fakediscord)$/i

handler.limit = true

export default handler