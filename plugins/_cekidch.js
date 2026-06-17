function formatLimitReply(name, limitUsed, remainingLimit, isOwner, title = "WATSON-XD-BOT") {
  let time = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })

  return {
    text: `╭───❑ ✦ *CHANNEL ID CHECKER* ✦ ❑───╮
┃ 👤 Name : *${name}*
┃ 📌 Limit Used : ${limitUsed}
┃ 📌 Remaining Limit : ${isOwner ? 'UNLIMITED' : remainingLimit}
┃ 🕒 Time : ${time}
┗━━━━━━━━━━━━━━━━━━⟢`,
    
    contextInfo: {
      externalAdReply: {
        title,
        body: "WATSON-XD-BOT",
        mediaType: 1,
        sourceUrl: "https://nabilxiteroffcialll.vercel.app"
      }
    }
  }
}

const handler = async (m, { text, isOwner }) => {

    // Check if link is entered
    if (!text) return m.reply("❌ Please enter a WhatsApp channel link!")

    let user = global.db.data.users[m.sender]
    if (!user) throw '🚫 User not found in database.'

    // Get limit value from handler metadata
    const limitUsed = handler.limit || 0

    let name = conn.getName(m.sender)

    await conn.sendMessage(
        m.chat,
        formatLimitReply(
            name,
            limitUsed,
            user.limit,
            isOwner,
            "CHANNEL ID FEATURE"
        ),
        { quoted: m }
    )

    await (m, conn)

    // Validate WhatsApp channel link
    if (!text.includes("https://whatsapp.com/channel/")) {
        return m.reply("⚠️ Invalid channel link!")
    }

    let result = text.split("https://whatsapp.com/channel/")[1]

    let res = await conn.newsletterMetadata("invite", result)

    let teks = `
*📌 ID:* ${res.id}
*📢 Name:* ${res.name}
*👥 Total Followers:* ${res.subscribers}
*📌 Status:* ${res.state}
*✅ Verified:* ${res.verification == "VERIFIED" ? "Verified" : "Not Verified"}
`

    return m.reply(teks)
}

handler.help = ["checkid"]
handler.tags = ["tools"]
handler.command = ["checkid", "idch"]

handler.limit = 10
handler.daftar = true

export default handler