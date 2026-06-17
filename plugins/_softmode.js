import fetch from 'node-fetch';

// Anti-link regex patterns
const linkPatterns = {
  tiktok: /tiktok.com/i,
  youtube: /youtube.com|youtu.be/i,
  telegram: /telegram.com|t.me/i,
  facebook: /facebook.com|fb.me/i,
  instagram: /instagram.com/i,
  twitter: /twitter.com|x.com/i,
  discord: /discord.com|discord.gg/i,
  threads: /threads.net/i,
  twitch: /twitch.tv/i,
};

// Warning messages
const warningMessages = {
  tiktok: "Warning: Tiktok link detected and will be deleted",
  youtube: "Warning: Youtube link detected and will be deleted",
  telegram: "Warning: Telegram link detected and will be deleted",
  facebook: "Warning: Facebook link detected and will be deleted",
  instagram: "Warning: Instagram link detected and will be deleted",
  twitter: "Warning: Twitter link detected and will be deleted",
  discord: "Warning: Discord link detected and will be deleted",
  threads: "Warning: Threads link detected and will be deleted",
  twitch: "Warning: Twitch link detected and will be deleted",
};

// Anti-commands list
const antiCmds = [
  'ban', 'kick', 'promote', 'demote', 'delete', 'song', 'sc',
  'modapk', 'status', 'ping', 'menu', 'play', 'repo', 'tagall'
];

// Capitalize helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Unified before handler
export async function before(message, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (!message.isGroup || isOwner || isROwner) return false;

  const chatSettings = global.db.data.chats?.[message.chat];
  if (!chatSettings) return false;

  const senderId = message.sender.split('@')[0];
  const senderTag = `@${senderId}`;
  const text = message.text || '';

  // --- Anti-command check ---
  if (chatSettings.anticmds && !isAdmin) {
    const isForbiddenCmd = antiCmds.some(cmd =>
      text.toLowerCase().includes(`.${cmd}`) || text.toLowerCase().includes(`,${cmd}`)
    );

    if (isForbiddenCmd) {
      if (isBotAdmin) {
        await conn.sendMessage(message.chat, {
          text: `*❌ RULE VIOLATION DETECTED BY BOT* ${senderTag}`,
          mentions: [message.sender]
        }, { quoted: message });

        // Optionally delete the message
        await conn.sendMessage(message.chat, {
          delete: { remoteJid: message.chat, fromMe: false, id: message.key.id, participant: message.sender }
        });

        try {
          await conn.groupParticipantsUpdate(message.chat, [message.sender], 'remove');
        } catch (err) {
          console.error("Error while removing participant:", err);
        }
      } else {
        await conn.sendMessage(message.chat, {
          text: "I don't have admin rights to enforce anti-command rules."
        }, { quoted: message });
      }
      return true;
    }
  }

  // --- Anti-link check ---
  if (!isAdmin && !message.fromMe && isBotAdmin) {
    for (const [platform, regex] of Object.entries(linkPatterns)) {
      if (chatSettings[`anti${capitalize(platform)}`] && regex.test(text)) {
        if (chatSettings.delete) {
          await conn.sendMessage(message.chat, { text: warningMessages[platform], mentions: [message.sender] }, { quoted: message });
        }

        // Delete message
        await conn.sendMessage(message.chat, { delete: { remoteJid: message.chat, fromMe: false, id: message.key.id, participant: message.sender } });

        try {
          // Kick participant
          await conn.groupParticipantsUpdate(message.chat, [message.sender], 'remove');
        } catch (err) {
          console.error(`Error while removing participant for ${platform}:`, err);
        }
        return true;
      }
    }
  }

  return false;
}