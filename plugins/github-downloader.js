let handler = async (m, { conn, text }) => {
  try {
    if (!text) {
      return m.reply(
        "❌ Please enter a GitHub repository URL!\nExample: .github https://github.com/username/repo"
      )
    }

    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })

    // Extract owner + repo
    const match = text.match(/github\.com\/([^\/]+)\/([^\/]+)/i)
    if (!match) throw new Error("Invalid GitHub URL")

    const owner = match[1]
    const repo = match[2].replace(/\.git$/, "")

    // GitHub API for stats
    const api = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
    if (!api.ok) throw new Error("Failed to fetch repo data")

    const data = await api.json()

    // ZIP download link (official GitHub archive)
    const zipUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`

    const info = `
📦 *GitHub Repo Info*

📁 Name: ${data.name}
👤 Owner: ${data.owner.login}

⭐ Stars: ${data.stargazers_count}
🍴 Forks: ${data.forks_count}
🧑‍💻 Language: ${data.language || "Unknown"}

📄 Description: ${data.description || "No description"}

📥 *POWERED BY WATSON-XD-BOT*
🔗 ${zipUrl}
`.trim()

    await conn.sendMessage(m.chat, { text: info }, { quoted: m })

    // Send ZIP file directly
    await conn.sendMessage(m.chat, {
      document: { url: zipUrl },
      fileName: `${repo}.zip`,
      mimetype: "application/zip",
      caption: "📦 Repository downloaded as ZIP"
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply(`❌ Error: ${e.message}`)
  }
}

handler.help = ["github <url>"]
handler.tags = ["downloader"]
handler.command = /^github$/i

export default handler