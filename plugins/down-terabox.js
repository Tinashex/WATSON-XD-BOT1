let handler = async (m, { conn, text, args }) => {

let url = text || args[0]

if (
  !url ||
  !/^https?:\/\/(www\.)?(terabox|1024terabox)\.(app|com)\/s\/[a-zA-Z0-9_-]+/i.test(url)
) {
  return m.reply("🙅‍♀️ *Invalid URL! Please send a correct Terabox link.*")
}

try {

  await global.loading(m, conn)

  let response = await fetch(
    global.API(
      "https://api.neoxr.eu",
      "/api/download/terabox",
      { url },
      "Kemii"
    )
  )

  if (!response.ok)
    throw new Error(`*Failed to get data from API. Status:* ${response.status}`)

  let json = await response.json()

  if (!json.status || !json.result || json.result.length === 0)
    return m.reply("❌ *Failed to get file. Make sure the URL is correct and try again.*")

  let files = json.result

  let caption = `
🌸 *Terabox Downloader* 🌸
━━━━━━━━━━━━━━━━━━━
📂 *Total Files: ${files.length}*\n`

  for (let file of files) {
    let fileData = file.files[0]
    let fileSizeMB = (parseInt(fileData.size) / (1024 * 1024)).toFixed(2) + " MB"

    caption += `
━━━━━━━━━━━━━━━━━━━
📁 *Name: ${file.name}*
📦 *Size: ${fileSizeMB}*
📅 *Upload Date: ${new Date(file.created).toLocaleString("en-US")}*
━━━━━━━━━━━━━━━━━━━`
  }

  await conn.sendMessage(m.chat, { text: caption }, { quoted: m })

  for (let file of files) {
    let fileData = file.files[0]
    let mediaType = fileData.filename.endsWith(".mp4")
      ? "video/mp4"
      : "image/jpeg"

    await conn.sendMessage(
      m.chat,
      mediaType === "video/mp4"
        ? {
            video: { url: fileData.url },
            mimetype: mediaType,
            caption: `🎥 *Video Downloaded Successfully!*`
          }
        : {
            image: { url: fileData.url },
            caption: `🖼️ *Image Downloaded Successfully!*`
          },
      { quoted: m }
    )
  }

} catch (error) {

  console.error(error)

  return m.reply(
    `❌ *An error occurred while processing the request.*\n⚠️ *Details:* ${error.message}`
  )

} finally {

  await global.loading(m, conn, true)

}

}

handler.help = ["terabox"]
handler.tags = ["downloader"]
handler.command = /^(terabox|tbx)$/i
handler.limit = true
handler.register = true

export default handler