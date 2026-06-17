let handler = async (m, { conn, args }) => {
  const userNumber = args[0]
  const validNumbers = ['0','1','2','3','4','5','6','7','8','9']

  if (!userNumber || !validNumbers.includes(userNumber))
    return conn.reply(
      m.chat,
      '⚠️ Enter a number between 0 and 9!\nExample: #number 5',
      m
    )

  const botNumber = pickRandom(validNumbers)
  const isCorrect = userNumber === botNumber
  const bonus = isCorrect
    ? Math.floor(Math.random() * 201) + 100
    : Math.floor(Math.random() * 100) + 1

  global.db.data.users[m.sender].exp += bonus

  let result = `
*「 🎲 GUESS THE NUMBER 」*

🎯 Your Number : *${userNumber}*
🤖 Bot Number  : *${botNumber}*

${isCorrect ? '✅ Your guess is **CORRECT!**' : '❌ Your guess is **WRONG!**'}
🎁 You got *+${bonus} XP!*
`.trim()

  conn.reply(m.chat, result, m)
}

handler.help = ['number']
handler.tags = ['fun']
handler.command = /^angka$/i

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}