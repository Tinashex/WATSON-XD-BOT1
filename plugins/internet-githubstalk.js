import axios from 'axios'
import moment from 'moment-timezone'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) {
            return m.reply(
                `❌ Please enter a GitHub username!\n\n` +
                `📌 Example:\n` +
                `${usedPrefix + command} torvalds`
            )
        }

        let query = text
            .replace('https://github.com/', '')
            .replace('@', '')
            .split('/')[0]

        await conn.sendMessage(m.chat, {
            react: { text: '⏳', key: m.key }
        })

        const { data } = await axios.get(`https://api.github.com/users/${query}`)

        let {
            login,
            name,
            id,
            type,
            followers,
            following,
            public_gists,
            public_repos,
            twitter_username,
            bio,
            hireable,
            email,
            location,
            blog,
            company,
            avatar_url,
            html_url,
            created_at,
            updated_at
        } = data

        let caption = `
╭━━━〔 🐙 GITHUB STALKER 〕━━━╮

│ 👤 Username     : ${login}
│ 🪪 Nickname     : ${name || '-'}
│ 🆔 ID           : ${id}
│ 🤖 Type         : ${type}
│ 👥 Followers    : ${followers}
│ ➕ Following    : ${following}
│ 📦 Public Repo  : ${public_repos}
│ 📄 Public Gists : ${public_gists}

┣━━━━━━━━━━━━━━━━━━

│ 🏢 Company      : ${company || '-'}
│ 📍 Location     : ${location || '-'}
│ 🌐 Blog         : ${blog || '-'}
│ 🐦 Twitter      : ${twitter_username || '-'}
│ 📧 Email        : ${email || '-'}
│ 💼 Hireable     : ${hireable ? 'Yes' : 'No'}

┣━━━━━━━━━━━━━━━━━━

│ 📅 Created :
│ ${moment(created_at)
    .tz('Asia/Jakarta')
    .format('DD MMMM YYYY • HH:mm:ss')}

│ 🔄 Updated :
│ ${moment(updated_at)
    .tz('Asia/Jakarta')
    .format('DD MMMM YYYY • HH:mm:ss')}

┣━━━━━━━━━━━━━━━━━━

│ 📝 Bio:
│ ${bio || 'No bio available.'}

╰━━━━━━━━━━━━━━━━━━╯

🔗 ${html_url}
`.trim()

        await conn.sendMessage(m.chat, {
            image: { url: avatar_url },
            caption,
            contextInfo: {
                externalAdReply: {
                    title: `${login} • GitHub Profile`,
                    body: `Repository: ${public_repos} • Followers: ${followers}`,
                    thumbnailUrl: avatar_url,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    sourceUrl: html_url
                }
            }
        }, { quoted: m })

        await conn.sendMessage(m.chat, {
            react: { text: '✅', key: m.key }
        })

    } catch (e) {
        console.error(e)

        m.reply(
            `❌ Failed to fetch GitHub profile.\n` +
            `Make sure the username is valid.`
        )
    }
}

handler.help = ['githubstalk <username>']
handler.tags = ['stalk']
handler.command = /^(githubstalk|ghstalk|githubuser)$/i
handler.limit = true

export default handler