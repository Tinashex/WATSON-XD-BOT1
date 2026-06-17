export function before(m) {

  let db = global.db.data
  if (!db.users) db.users = {}

  let user = db.users[m.sender]

  // 🧠 auto create user if not exist
  if (!user) {
    db.users[m.sender] = {
      afk: -1,
      afkReason: ''
    }
    user = db.users[m.sender]
  }

  // =========================
  // ❌ STOP AFK MODE
  // =========================
  if (user.afk && user.afk > -1) {

    let time = Date.now() - user.afk

    m.reply(`
📴 *AFK MODE OFF*

👤 User: ${m.pushName}
⏱ Duration: ${msToTime(time)}
${user.afkReason ? `💬 Reason: ${user.afkReason}` : ''}
    `.trim())

    user.afk = -1
    user.afkReason = ''
  }

  // =========================
  // 👀 CHECK MENTIONS AFK
  // =========================
  let jids = [
    ...new Set([
      ...(m.mentionedJid || []),
      ...(m.quoted ? [m.quoted.sender] : [])
    ])
  ]

  for (let jid of jids) {

    let u = db.users[jid]
    if (!u || u.afk < 0) continue

    let time = Date.now() - u.afk

    m.reply(`
🚫 *USER IS AFK*

👤 ${conn.getName(jid)}
⏱ Duration: ${msToTime(time)}
${u.afkReason ? `💬 Reason: ${u.afkReason}` : ''}
    `.trim())
  }

  return true
}

// ⏱ helper function
function msToTime(ms) {
  let seconds = Math.floor(ms / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)

  return `${hours}h ${minutes % 60}m ${seconds % 60}s`
}
