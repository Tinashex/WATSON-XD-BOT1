import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) {
            return m.reply(
                `❌ Please enter a search query!\n\n` +
                `📌 Example:\n` +
                `${usedPrefix + command} whatsapp bot`
            )
        }

        await conn.sendMessage(m.chat, {
            react: { text: '⏳', key: m.key }
        })

        let res = await fetch(
            `https://api.github.com/search/repositories?q=${encodeURIComponent(text)}&per_page=7`
        )

        let json = await res.json()

        if (!json.items || !json.items.length) {
            return m.reply(`❌ No repositories found for "${text}"`)
        }

        let caption = `╭━━━〔 🔍 GITHUB SEARCH 〕━━━╮\n`
        caption += `│ 📦 Query : ${text}\n`
        caption += `│ 📊 Results : ${json.total_count}\n`
        caption += `╰━━━━━━━━━━━━━━━━━━━━╯\n\n`

        caption += json.items.map((repo, index) => {
            return `
╭━━━〔 ${index + 1} • ${repo.name} 〕━━━╮

│ 👤 Author :
│ ${repo.owner.login}

│ ⭐ Stars :
│ ${formatNumber(repo.stargazers_count)}

│ 🍴 Forks :
│ ${formatNumber(repo.forks)}

│ 👀 Watchers :
│ ${formatNumber(repo.watchers)}

│ 🐞 Issues :
│ ${repo.open_issues}

│ 💻 Language :
│ ${repo.language || 'Unknown'}

│ 📁 Visibility :
│ ${repo.visibility}

│ 🔀 Forked Repo :
│ ${repo.fork ? 'Yes' : 'No'}

│ 📅 Created :
│ ${formatDate(repo.created_at)}

│ 🔄 Updated :
│ ${formatDate(repo.updated_at)}

│ 🔗 Repository :
│ ${repo.html_url}

│ 📥 Clone :
│ ${repo.clone_url}

${repo.description ? `│ 📝 Description :
│ ${repo.description}` : ''}

╰━━━━━━━━━━━━━━━━━━━━╯
`.trim()
        }).join('\n\n')

        let topRepo = json.items[0]

        await conn.sendMessage(m.chat, {
            image: { url: topRepo.owner.avatar_url },
            caption,
            contextInfo: {
                externalAdReply: {
                    title: topRepo.full_name,
                    body: `⭐ ${formatNumber(topRepo.stargazers_count)} Stars • 🍴 ${formatNumber(topRepo.forks)} Forks`,
                    thumbnailUrl: topRepo.owner.avatar_url,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    sourceUrl: topRepo.html_url
                }
            }
        }, { quoted: m })

        await conn.sendMessage(m.chat, {
            react: { text: '✅', key: m.key }
        })

    } catch (e) {
        console.error(e)

        m.reply(
            `❌ Failed to search GitHub repositories.\n` +
            `Reason: ${e.message}`
        )
    }
}

handler.help = ['githubsearch <query>']
handler.tags = ['tools', 'internet']
handler.command = /^(g(it)?h(ub)?s(earch)?|githubsearch)$/i
handler.limit = true

export default handler

function formatDate(date) {
    return new Date(date).toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

function formatNumber(num) {
    return Intl.NumberFormat('en', {
        notation: 'compact'
    }).format(num)
}