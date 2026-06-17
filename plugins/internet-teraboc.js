import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `❌ Please enter a Terabox link.\n\nExample:\n${usedPrefix + command} https://www.4funbox.com/wap/share/filelist?surl=xxxx`
  }

  try {
    await m.reply('⏳ Fetching Terabox files...')

    let url = encodeURIComponent(args[0])
    let apiUrl = `https://xzn.wtf/api/teraboxdl?url=${url}&apikey=mufar`

    let res = await fetch(apiUrl)
    let json = await res.json()

    if (!json.list || !json.list.length) {
      throw '❌ No downloadable files found.'
    }

    let files = json.list
    let total = files.length

    let caption = `📦 *TERABOX DOWNLOADER*\n\n`
    caption += `📁 Total Files: *${total}*\n\n`

    for (let i = 0; i < files.length; i++) {
      let file = files[i]

      caption += `
╭─❍ FILE ${i + 1}
│ 📄 Name: ${file.filename || '-'}
│ 💾 Size: ${file.filesize || '-'}
│ 📅 Date: ${file.date || '-'}
╰───────────────
`
    }

    await conn.sendMessage(
      m.chat,
      {
        text: caption,
        contextInfo: {
          externalAdReply: {
            title: 'Terabox Downloader',
            body: 'Download files directly from Terabox',
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: args[0]
          }
        }
      },
      { quoted: m }
    )

    for (let file of files) {
      if (!file.direct_link) continue

      let isVideo = /\.(mp4|mkv|mov|webm)$/i.test(file.filename)
      let isImage = /\.(jpg|jpeg|png|webp)$/i.test(file.filename)
      let isAudio = /\.(mp3|wav|ogg|m4a)$/i.test(file.filename)

      if (isVideo) {
        await conn.sendMessage(
          m.chat,
          {
            video: { url: file.direct_link },
            caption: `🎬 ${file.filename}`
          },
          { quoted: m }
        )
      } else if (isImage) {
        await conn.sendMessage(
          m.chat,
          {
            image: { url: file.direct_link },
            caption: `🖼️ ${file.filename}`
          },
          { quoted: m }
        )
      } else if (isAudio) {
        await conn.sendMessage(
          m.chat,
          {
            audio: { url: file.direct_link },
            mimetype: 'audio/mpeg',
            fileName: file.filename
          },
          { quoted: m }
        )
      } else {
        await conn.sendMessage(
          m.chat,
          {
            document: { url: file.direct_link },
            fileName: file.filename,
            mimetype: 'application/octet-stream'
          },
          { quoted: m }
        )
      }
    }

  } catch (e) {
    console.error(e)
    m.reply(`❌ Error:\n${e.message || e}`)
  }
}

handler.help = ['tera <url>']
handler.tags = ['downloader']
handler.command = /^(tera|terabox|tb)$/i
handler.limit = true

export default handler