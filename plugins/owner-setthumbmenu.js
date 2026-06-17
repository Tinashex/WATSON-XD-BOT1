import fs from 'fs'

let handler = async (m, { usedPrefix, command }) => {
  try {
    const quoted = m.quoted || m
    const mime = quoted?.mimetype || ''

    if (!mime.startsWith('image/')) {
      return m.reply(`Reply to an image first!\nExample: reply to a photo then type *${usedPrefix + command}*`)
    }

    const buffer = await quoted.download()
    fs.writeFileSync('./media/menu.jpg', buffer)
    global.thumb = buffer

    m.reply('✅ Menu thumbnail updated successfully!')
  } catch (e) {
    console.error(e)
    m.reply('Error: ' + e.message)
  }
}

handler.help = ['setthumbmenu']
handler.tags = ['owner']
handler.command = /^setthumbmenu$/i
handler.owner = true

export default handler