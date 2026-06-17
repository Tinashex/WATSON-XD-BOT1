import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `❌ Please enter a Steam game title.\n\nExample:\n${usedPrefix + command} gta v`
  }

  try {
    await m.reply('⏳ Searching Steam database...')

    let query = encodeURIComponent(args.join(' '))
    let apiUrl = `https://ll--lasdanon.repl.co/api/search/steam?q=${query}&apikey=Onlasdan`

    let res = await fetch(apiUrl)
    let json = await res.json()

    if (!json.status || !json.data || !json.data.length) {
      throw '❌ No results found.'
    }

    let results = json.data.slice(0, 5)

    for (let game of results) {
      let caption = `
🎮 *STEAM GAME SEARCH*

📌 *Title:* ${game.judul || '-'}
💰 *Price:* ${game.harga || '-'}
⭐ *Rating:* ${game.rating || '-'}
📅 *Release:* ${game.rilis || '-'}
🔗 *Steam URL:* ${game.link || '-'}

> Powered by ${global.namebot || 'Steam Search'}
`.trim()

      await conn.sendMessage(
        m.chat,
        {
          image: { url: game.img },
          caption,
          contextInfo: {
            externalAdReply: {
              title: game.judul,
              body: game.harga || 'Steam Store',
              thumbnailUrl: game.img,
              mediaType: 1,
              renderLargerThumbnail: true,
              sourceUrl: game.link
            }
          }
        },
        { quoted: m }
      )
    }

  } catch (e) {
    console.error(e)
    m.reply(`❌ Error:\n${e.message || e}`)
  }
}

handler.help = ['steam <game title>']
handler.tags = ['internet']
handler.command = /^(steam|steamsearch)$/i
handler.limit = false

export default handler