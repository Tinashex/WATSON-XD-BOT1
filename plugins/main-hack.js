const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let handler = async (m, { conn }) => {

  // Store sent message keys for auto-delete
  let sentMessages = [];

  // Helper function
  const sendMsg = async (text) => {
    let msg = await conn.sendMessage(m.chat, { text }, { quoted: m });
    sentMessages.push(msg.key);
    return msg;
  };

  await sendMsg("⚠️ WARNING: Initiating system override...");
  await sleep(1000);

  const steps = [
    "█▒▒▒▒▒▒▒▒ 10% - Accessing system files...",
    "██▒▒▒▒▒▒▒ 20% - Breaching firewall...",
    "███▒▒▒▒▒▒ 30% - Extracting user data...",
    "████▒▒▒▒▒ 40% - Injecting tracking scripts...",
    "█████▒▒▒▒ 50% - Locating sensitive files...",
    "██████▒▒▒ 60% - Encrypting logs...",
    "███████▒▒ 70% - Masking digital footprint...",
    "████████▒ 80% - Simulating server hijack...",
    "█████████ 90% - Completing data extraction...",
    "██████████ 100% - System override complete"
  ];

  const randomWarnings = [
    "⚠️ ERROR: Firewall detected unusual activity...",
    "⚠️ WARNING: Connection unstable...",
    "❌ ALERT: Permission denied on /etc/config...",
    "⚠️ ERROR: Temporary server timeout...",
    "⚠️ WARNING: Data packet loss detected..."
  ];

  for (const step of steps) {

    await sendMsg(step);

    await sleep(500 + Math.floor(Math.random() * 500));

    // Random warning
    if (Math.random() < 0.3) {

      const warning =
        randomWarnings[
          Math.floor(Math.random() * randomWarnings.length)
        ];

      await sendMsg(warning);

      await sleep(400 + Math.floor(Math.random() * 400));
    }
  }

  await sendMsg("💻 Connecting to external server...");
  await sleep(1000 + Math.floor(Math.random() * 500));

  if (Math.random() < 0.5) {

    await sendMsg("⚠️ ERROR: Server response delayed...");

    await sleep(700 + Math.floor(Math.random() * 500));
  }

  await sendMsg("📡 Data transfer in progress...");
  await sleep(800 + Math.floor(Math.random() * 600));

  await sendMsg("✅ All target data extracted (simulation).");
  await sleep(800);

  if (Math.random() < 0.4) {

    await sendMsg(
      "⚠️ WARNING: Suspicious activity detected, masking logs..."
    );

    await sleep(600);
  }

  await sendMsg("🧹 Cleaning logs and hiding traces...");
  await sleep(1000 + Math.floor(Math.random() * 500));

  await sendMsg(
    "🔒 Hack simulation completed successfully. All actions are virtual."
  );

  await sleep(1000);

  await sendMsg("💾 Simulation session ended.");

  // ================= DELETE AFTER 1 MINUTE =================

  setTimeout(async () => {

    for (const key of sentMessages) {

      try {

        await conn.sendMessage(m.chat, {
          delete: key
        });

      } catch (e) {
        console.log(e);
      }
    }

  }, 60000); // 60 seconds

};

handler.help = ["hack", "prankhack"];
handler.tags = ["fun", "main"];
handler.command = /^(shockhack|hack|fakehack)$/i;

export default handler;