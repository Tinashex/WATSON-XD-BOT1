let handler = async (m, { conn, text, command }) => {
    if (!text) return m.reply('❌ Please provide a name! Example: .flirt Alex');

    const messages = {
        flirt: [
            `💖 Hey ${text}, someone has a secret crush on you! 😏 They think your smile is magical.`,
            `✨ ${text}, your charm is so contagious that everyone smiles around you!`,
            `😍 ${text}, someone thinks you’re absolutely irresistible today!`,
            `😉 ${text}, rumor has it that someone keeps daydreaming about you!`,
            `💌 ${text}, your laugh is so cute it makes hearts skip a beat!`,
            `🌟 ${text}, just seeing your name brightens my day!`,
            `💫 ${text}, your energy is like sunshine on a cloudy day!`,
            `😎 ${text}, you’ve got that spark that makes people curious!`,
            `❤️ ${text}, someone secretly thinks you’re amazing!`,
            `🌈 ${text}, you’re basically a walking happiness generator!`,
            `🥰 ${text}, your smile could start a trend of joy!`,
            `🌞 ${text}, your vibes are pure gold today!`,
            `💛 ${text}, you’re so charming that even emojis get jealous!`,
            `🔥 ${text}, your aura is hotter than the summer sun!`,
            `🎉 ${text}, your presence is a party wherever you go!`,
            `✨ ${text}, magical things seem to happen around you!`,
            `💫 ${text}, someone is definitely thinking about you right now!`,
            `😏 ${text}, your charm is dangerously addictive!`,
            `🌹 ${text}, you’re a rare gem that makes everyone smile!`,
            `🎈 ${text}, you have the kind of energy people envy!`,
            `🌟 ${text}, your laugh is contagious like the best meme!`,
            `❤️ ${text}, your smile is basically legendary!`,
            `💌 ${text}, someone wishes they could hang out with you today!`,
            `🌞 ${text}, you shine brighter than the morning sun!`,
            `✨ ${text}, your aura makes everything better!`,
            `🥳 ${text}, you’re a vibe everyone wants around!`,
            `😍 ${text}, your charm should be patented!`,
            `💖 ${text}, your energy is a magnet for happiness!`,
            `🎉 ${text}, you’re the highlight of everyone’s day!`,
            `🌈 ${text}, you inspire smiles without even trying!`
        ],
        compliment: [
            `🌟 ${text}, you're amazing! Keep shining! ✨`,
            `💫 ${text}, your positivity brightens everyone’s day!`,
            `👍 ${text}, you’re doing a great job, keep it up!`,
            `😊 ${text}, never forget how awesome you are!`,
            `💛 ${text}, you have a heart of gold!`,
            `🌸 ${text}, your kindness is inspiring!`,
            `🎨 ${text}, your creativity amazes everyone!`,
            `🔥 ${text}, your confidence is admirable!`,
            `💌 ${text}, you make people happy just by existing!`,
            `✨ ${text}, your determination is impressive!`,
            `🥰 ${text}, your smile can light up the darkest room!`,
            `🌞 ${text}, your energy motivates others to do better!`,
            `🌈 ${text}, your vibes are refreshing!`,
            `🎉 ${text}, you always bring joy to those around you!`,
            `🌟 ${text}, you’re truly one of a kind!`,
            `💖 ${text}, your aura inspires positivity!`,
            `💫 ${text}, your support makes a huge difference to others!`,
            `😊 ${text}, your personality is magnetic!`,
            `💛 ${text}, your words uplift people every day!`,
            `🔥 ${text}, your passion is contagious!`,
            `🎨 ${text}, you make creativity look effortless!`,
            `🥳 ${text}, you have a way of making life fun!`,
            `✨ ${text}, you radiate positivity like the sun!`,
            `🌸 ${text}, your presence is calming and uplifting!`,
            `💌 ${text}, your dedication is inspiring!`,
            `🌞 ${text}, your smile can solve half the problems!`,
            `🌈 ${text}, you have the magic of a true friend!`,
            `🎉 ${text}, your energy makes everything more fun!`,
            `🌟 ${text}, you’re capable of amazing things!`,
            `💖 ${text}, your charm leaves a lasting impression!`
        ],
        fan: [
            `🎨 ${text} is the ultimate fan favorite! 😎`,
            `👏 Everyone admires ${text}'s style and energy!`,
            `🔥 ${text} is on top of everyone’s mind today!`,
            `🎉 ${text} is simply unforgettable!`,
            `🌈 ${text} brings fun wherever they go!`,
            `🥳 ${text}, the crowd goes wild for you!`,
            `💫 ${text}, fans can’t get enough of your vibes!`,
            `✨ ${text}, your style is iconic!`,
            `😍 ${text}, your charm is legendary!`,
            `💖 ${text}, you inspire creativity everywhere!`,
            `🌟 ${text}, your energy is magnetic!`,
            `🌞 ${text}, everyone looks up to you!`,
            `🎈 ${text}, you brighten up any room you enter!`,
            `💌 ${text}, your personality is unforgettable!`,
            `🎶 ${text}, you’re music to everyone’s eyes!`,
            `🥰 ${text}, fans can’t stop admiring you!`,
            `💛 ${text}, your confidence is inspiring!`,
            `🌈 ${text}, you make life more colorful!`,
            `🎉 ${text}, your energy is infectious!`,
            `✨ ${text}, everyone secretly wishes they were like you!`,
            `🔥 ${text}, you’re the highlight of every event!`,
            `💫 ${text}, your presence makes a difference!`,
            `🌟 ${text}, everyone loves your vibe!`,
            `🎨 ${text}, you set the trend wherever you go!`,
            `🥳 ${text}, you turn ordinary days into parties!`,
            `💖 ${text}, you radiate happiness everywhere!`,
            `🌈 ${text}, your aura is pure joy!`,
            `🎉 ${text}, your fans can’t get enough!`,
            `✨ ${text}, you are truly iconic!`,
            `💌 ${text}, your charm is unstoppable!`
        ]
    };

    // Pick a random message
    const list = messages[command];
    if (!list) return m.reply('❌ Unknown command!');
    const message = list[Math.floor(Math.random() * list.length)];

    await m.reply(message);
};

handler.command = handler.help = ['flirt', 'compliment', 'fan'];
handler.tags = ['fun'];

export default handler;