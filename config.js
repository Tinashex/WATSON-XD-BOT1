import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*
 *        WATSON-XD-BOT CONFIG
 *━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

/*━━━━━━━━━━ CORE OWNER SYSTEM ━━━━━━━━━━*/

// Your original owner format
global.owner = [
  ['263781330745', 'Watsonx', true]
]

// MAIN DEVELOPERS (cannot be removed)
global.developer = [
  '263781330745',
  '263789622747'
]

// Extract owner numbers safely
const ownerNumbers = global.owner.map(x => x[0])

// FINAL MERGE (owner + developer)
global.owner = [...new Set([
  ...ownerNumbers,
  ...global.developer
])]

/*━━━━━━━━━━ HELPERS ━━━━━━━━━━*/

// check owner
global.isOwner = (jid) =>
  global.owner.includes(String(jid))

// check developer (strong admin)
global.isDeveloper = (jid) =>
  global.developer.includes(String(jid))

// optional strict check (developer only commands)
global.isSudo = (jid) =>
  global.developer.includes(String(jid))

/*━━━━━━━━━━ BOT INFO ━━━━━━━━━━*/

global.pairingNumber = '263781330745'

global.namebot = 'WATSON-XD-BOT'
global.author = 'Watson-Xd'

/*━━━━━━━━━━ MESSAGES ━━━━━━━━━━*/

global.wait = '```「▰▰▰▱▱▱▱▱▱▱」Loading...```'
global.eror = '```404 Error```'

/*━━━━━━━━━━ API KEYS ━━━━━━━━━━*/

global.APIKeys = {
  'https://api.fgmods.xyz': 'm2XBbNvz'
}

/*━━━━━━━━━━ APIs ━━━━━━━━━━*/

global.APIs = {
  fgmods: 'https://api.fgmods.xyz',
  faa: 'https://api-faa.my.id',
  deline: 'https://api.deline.web.id'
}

/*━━━━━━━━━━ BOT FEATURES ━━━━━━━━━━*/

global.autotyping = false
global.autorecording = false

/*━━━━━━━━━━ STICKER INFO ━━━━━━━━━━*/

global.stickpack = 'Created By'
global.stickauth = global.namebot

/*━━━━━━━━━━ MENU STYLE ━━━━━━━━━━*/

global.dmenut = '─── ⋆⋅☆⋅⋆ ───'
global.dmenub = '✦ '
global.dmenub2 = '┊ '
global.dmenuf = '┕━━━━━━━━━━━━━ ⬦ •'
global.dashmenu = '─── ⌗ *STATISTICS* ⌗ ───'
global.cmenut = '╭─── ✥ ﹝ '
global.cmenuh = ' ﹞ ───╮'
global.cmenub = '┊ ✧ '
global.cmenuf = '╰───────────── ⧖\n'
global.cmenua = '\n      ─── ˗ˏˋ ❖ ˎˊ˗ ───\n'
global.pmenus = '◈'
global.htki = '☾'
global.htka = '☽'
global.lopr = 'Ⓟ'
global.lolm = 'Ⓛ'
global.htjava = '⫹⫺'
global.hsquere = ['⬢', '⬡', '⟁']

/*━━━━━━━━━━ AUTO RELOAD CONFIG ━━━━━━━━━━*/

let file = fileURLToPath(import.meta.url)

watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js' detected"))
  import(`${file}?update=${Date.now()}`)
})