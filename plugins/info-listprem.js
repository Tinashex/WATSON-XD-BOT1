import moment from "moment-timezone"

let handler = async (m, { conn }) => {

    let users = global.db.data.users
    let premiumUsers = Object.entries(users)
        .filter(([jid, data]) => data.premium)

    if (!premiumUsers.length)
        return m.reply("❌ No premium users found.")

    let txt = `
╭━━━〔 💎 PREMIUM USERS LIST 〕━━━⬣
┃ 📦 Total Premium : ${premiumUsers.length}
┃ 🤖 Bot : ${global.namebot || "WATSON-XD-BOT"}
╰━━━━━━━━━━━━━━━━━━━━⬣
`.trim()

    let mentions = []

    for (let [jid, data] of premiumUsers) {

        let number = jid.split("@")[0]
        let name = data.name || "Unknown"

        let remaining = data.premiumTime - Date.now()

        let days = Math.floor(remaining / (1000 * 60 * 60 * 24))
        let hours = Math.floor(remaining / (1000 * 60 * 60)) % 24
        let minutes = Math.floor(remaining / (1000 * 60)) % 60

        let expired = remaining <= 0

        txt += `

╭━━〔 👤 USER PREMIUM 〕━━⬣
┃ 📱 Number : @${number}
┃ 👤 Name : ${name}
┃ 💎 Status : ${expired ? "Expired" : "Active"}
┃ ⏳ Remaining :
┃ ${expired ? "Premium expired" : `${days} Days ${hours} Hours ${minutes} Minutes`}
╰━━━━━━━━━━━━━━━━━━━━⬣`

        mentions.push(jid)
    }

    txt += `

╭━━〔 📌 INFORMATION 〕━━⬣
┃ ✨ Want premium access?
┃ 📞 Contact owner now
┃ 🚀 Unlock exclusive features
╰━━━━━━━━━━━━━━━━━━━━⬣`

    await conn.sendMessage(
        m.chat,
        {
            text: txt,
            mentions,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "💎 PREMIUM SUBSCRIPTION",
                    body: `${premiumUsers.length} Active Premium Users`,
                    thumbnailUrl: "https://files.catbox.moe/8lk6xx.jpg",
                    sourceUrl: "https://whatsapp.com",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        },
        { quoted: m }
    )
}

handler.help = ["listpremium"]
handler.tags = ["info"]
handler.command = /^(listprem(ium|iums)?)$/i

export default handler