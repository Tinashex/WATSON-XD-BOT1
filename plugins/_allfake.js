import fs from 'fs'
import moment from 'moment-timezone'

let handler = m => m

handler.all = async function (m) {
  global.wm = 'Watson Xd Multi Device'

  let thumb
  try {
    thumb = fs.readFileSync('./thumbnail.jpg')
  } catch (e) {
    thumb = await (await fetch("https://i.imgur.com/QxeVvOc.jpeg")).buffer()
  }

  global.adReply = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterName: `WATSON-XD | 2022-2026`,
        newsletterJid: "120363421521882437@newsletter"
      },
      externalAdReply: {
        title: `*Watson Xd Multi Device*`,
        body: `${momentGreeting()}`,
        previewType: "PHOTO",
        thumbnail: thumb
      }
    }
  }
}

export default handler

function momentGreeting() {
  const hour = moment.tz('Africa/Harare').hour()
  if (hour >= 18) return 'Good Evening 🍃'
  if (hour >= 15) return 'Good Afternoon 🌾'
  if (hour > 10) return 'Good Noon 🍂'
  if (hour >= 4) return 'Good Morning 🌿'
  return 'Good Night 🪷'
}