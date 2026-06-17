import fs from 'fs';
import mime from 'mime-types';

const handler = async (m, { text, conn, qmsg, quoted, mime: qMime }) => {
  if (!text) return m.reply('Example: .jpmht Your message here');

  let mediaPath;
  if (/image/.test(qMime)) {
    mediaPath = await conn.downloadAndSaveMediaMessage(qmsg);
  }

  const allGroups = await conn.groupFetchAllParticipating();
  const groupIds = Object.keys(allGroups);
  let successCount = 0;

  const senderChat = m.chat;
  const messageType = mediaPath ? 'text & image HT' : 'text HT';

  await m.reply(`Processing ${messageType} to ${groupIds.length} groups...`);

  for (const groupId of groupIds) {
    const groupData = allGroups[groupId];
    if (!groupData || !groupData.participants) {
      console.warn(`Skipping invalid group ID: ${groupId}`);
      continue;
    }

    const participants = groupData.participants.map(p => p.id);

    const messageContent = mediaPath
      ? {
          image: fs.readFileSync(mediaPath),
          caption: text,
          mentions: participants
        }
      : {
          text,
          mentions: participants
        };

    try {
      await conn.sendMessage(groupId, messageContent, { quoted });
      successCount++;
    } catch (err) {
      console.error(`Failed to send to group ${groupId}:`, err);
    }

    // Delay between groups (anti-spam safety)
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  if (mediaPath) fs.unlinkSync(mediaPath);

  await conn.sendMessage(senderChat, {
    text: `JPM ${messageType} successfully sent to ${successCount} groups.`,
  }, { quoted: m });
};

handler.help = ['jpmht <text>'];
handler.tags = ['store'];
handler.command = /^jpmht$/i;
handler.owner = true;

export default handler;