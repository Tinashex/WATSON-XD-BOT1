let handler = async (m, { conn }) => {
    conn.reply(m.chat, `“${pickRandom(global.funFacts)}”`, m);
}

handler.help = ['funfact'];
handler.tags = ['fun'];
handler.command = /^(funfact|didyouknow)$/i;
handler.limit = true;
handler.fail = null;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

// =========================
// English Fun Facts
// =========================
global.funFacts = [
    "Did you know a dragonfly can fly at speeds up to 40 kph (25 mph)?",
    "Did you know all owls lay white eggs?",
    "Did you know Hawaii officially became part of the USA on June 14, 1900?",
    "Did you know the average person laughs about 10 times per day?",
    "Did you know the diameter of Jupiter is 152,800 km (88,700 miles)?",
    "Did you know the most popular toothbrush color is blue?",
    "Did you know tigers have striped skin as well as striped fur?",
    "Did you know moths do not have stomachs?",
    "Did you know hamburgers were invented around the year 1900?",
    "Did you know aichmophobia is the fear of sharp objects or needles?",
    "Did you know fingernails grow faster than toenails?",
    "Did you know the word 'almost' is the longest English word with letters in alphabetical order?",
    "Did you know iatrophobia is the fear of doctors?",
    "Did you know slamming your car door used to be illegal in Switzerland?",
    "Did you know the smallest mammal in the world is the bumblebee bat from Thailand?",
    "Did you know lions eat every 3 to 4 days?",
    "Did you know a bird’s eggshell makes up about 12% of the egg’s weight?",
    "Did you know an average hedgehog has about 30,000 spines?",
    "Did you know grapefruits get their name because they grow in clusters like grapes?",
    "Did you know 45% of people use mouthwash daily?",
    "Did you know the average lifespan of a squirrel is around 9 years?",
    "Did you know you can tell a horse’s sex by its teeth? (males usually have 40, females 36)",
    "Did you know insects consume about 10% of the world’s food supply?",
    "Did you know clouds fly higher during the day than at night?",
    "Did you know the Empire State Building in New York weighs more than 365,000 tons?",
    "Did you know Antarctica is made of 98% ice and 2% barren rock?",
    "Did you know 90% of people rely on an alarm clock to wake up?",
    "Did you know coffee is the most popular beverage worldwide with over 400 billion cups consumed yearly?",
    "Did you know Earth is struck by lightning more than 100 times every second?",
    "Did you know the average person has around 10,000 taste buds?",
    "Did you know red blood cells are produced in the bone marrow?",
    "Did you know around 11% of people are left-handed?",
    "Did you know the sun loses about 360 million tons of mass every year?",
    "Did you know octopuses have three hearts?",
    "Did you know honey never spoils and can last thousands of years?",
    "Did you know some turtles can breathe through their butts?",
    "Did you know sea otters hold hands while sleeping to keep from drifting apart?",
    "Did you know a group of flamingos is called a 'flamboyance'?",
    "Did you know bananas are berries but strawberries are not?",
    "Did you know wombat poop is cube-shaped?",
    "Did you know a sneeze can travel at over 100 mph?"
];