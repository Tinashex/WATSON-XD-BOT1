import util from "util"

let handler = async (m, { conn, usedPrefix, command, isAdmin }) => {

  if (!m.isGroup)
    return m.reply("❌ This command can only be used in groups.")

  if (!isAdmin)
    return m.reply("❌ Only group admins can use this command.")

  if (!m.quoted)
    return m.reply(
      `📢 Reply to a media message with:\n` +
      `*${usedPrefix + command}*`
    )

  try {

    await conn.sendMessage(m.chat, {
      react: {
        text: "⏳",
        key: m.key
      }
    })

    let media = JSON.parse(
      JSON.stringify({
        [m.quoted.mtype]: m.quoted
      })
    )

    await conn.relayMessage(
      m.chat,
      {
        groupStatusMessageV2: {
          message: media
        }
      },
      {}
    )

    await conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key
      }
    })

    m.reply(
      `✅ *Successfully uploaded to Group Status*\n\n` +
      `📌 Media Type: *${m.quoted.mtype}*\n` +
      `👤 Uploaded by: *@${m.sender.split("@")[0]}*`,
      null,
      {
        mentions: [m.sender]
      }
    )

  } catch (error) {

    console.error("GROUP STATUS ERROR:", util.format(error))

    await conn.sendMessage(m.chat, {
      react: {
        text: "❌",
        key: m.key
      }
    })

    m.reply(
      `❌ Failed to upload media to group status.\n\n` +
      `🛠️ Error:\n${util.format(error)}`
    )
  }
}

handler.help = ["upswgroup", "upswgc"]
handler.tags = ["group"]
handler.command = /^(upswgroup|upswgc)$/i

handler.group = true
handler.admin = true

export default handler