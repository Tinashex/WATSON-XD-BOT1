let handler = async (m, { conn, text }) => {

  // Check input
  if (!text) {
    throw `Please enter a channel link + text.

Example:
.reactch https://whatsapp.com/channel/abc123/456 i love you`
  }

  // Match WhatsApp channel URL
  const regex =
    /https:\/\/whatsapp\.com\/channel\/(\w+)(?:\/(\d+))?/

  const match = text.match(regex)

  // Invalid URL
  if (!match) {
    throw `Invalid URL.

Correct format:
https://whatsapp.com/channel/ID/MessageID`
  }

  const channelId = match[1]
  const chatId = match[2]

  // Message ID missing
  if (!chatId) {
    throw 'Message ID was not found in the URL.'
  }

  // Get text after URL
  const afterUrlText =
    text.replace(regex, '').trim()

  // Convert text to emoji font
  const emojiText =
    emojiFontFormatted(afterUrlText || 'HI')

  try {

    // Get channel metadata
    const data =
      await conn.newsletterMetadata(
        "invite",
        channelId
      )

    if (!data) {
      throw 'Failed to get channel metadata.'
    }

    // Send reaction
    await conn.newsletterReactMessage(
      data.id,
      chatId,
      emojiText
    )

    m.reply(
`Successfully sent reaction:

${emojiText}`
    )

  } catch (err) {

    console.error(err)

    m.reply(
      'An error occurred while sending the reaction.'
    )
  }
}

// Convert sentence into emoji style
const emojiFontFormatted = (text) => {

  const separator = '🅭'

  return text
    .split(' ')
    .map(word => emojiFont(word))
    .join(separator)
}

// Emoji font map
const emojiFont = (text) => {

  const map = {

    a: '🅐', b: '🅑', c: '🅒',
    d: '🅓', e: '🅔', f: '🅕',
    g: '🅖', h: '🅗', i: '🅘',
    j: '🅙', k: '🅚', l: '🅛',
    m: '🅜', n: '🅝', o: '🅞',
    p: '🅟', q: '🅠', r: '🅡',
    s: '🅢', t: '🅣', u: '🅤',
    v: '🅥', w: '🅦', x: '🅧',
    y: '🅨', z: '🅩',

    A: '🅐', B: '🅑', C: '🅒',
    D: '🅓', E: '🅔', F: '🅕',
    G: '🅖', H: '🅗', I: '🅘',
    J: '🅙', K: '🅚', L: '🅛',
    M: '🅜', N: '🅝', O: '🅞',
    P: '🅟', Q: '🅠', R: '🅡',
    S: '🅢', T: '🅣', U: '🅤',
    V: '🅥', W: '🅦', X: '🅧',
    Y: '🅨', Z: '🅩',

    ' ': ' '
  }

  return [...text]
    .map(c => map[c] || c)
    .join('')
}

handler.help = [
  'reactch <channel link> <text>'
]

handler.tags = ['tool']

handler.command = /^reactch$/i

export default handler