let truths = [
  "What is your biggest fear?",
  "What is the most embarrassing thing you've ever done?",
  "Have you ever lied to your best friend?",
  "What is a secret you’ve never told anyone?",
  "Who is your secret crush?",
  "Have you ever broken a law?",
  "What is your guilty pleasure?",
  "Have you ever stolen something?",
  "Who is your celebrity crush?",
  "What is the weirdest dream you’ve ever had?",
  "Have you ever cheated on a test?",
  "What is the worst gift you’ve ever received?",
  "What habit do you wish you could quit?",
  "What is the most childish thing you still do?",
  "Have you ever cried in public?",
  "What’s the most awkward date you’ve been on?",
  "Have you ever lied to your parents?",
  "What’s something you’re scared to tell your friends?",
  "What’s the most trouble you’ve gotten into at school?",
  "Have you ever peeked at someone else's messages?",
  "What is one secret you’re keeping from your family?",
  "Have you ever pretended to be sick to skip school?",
  "What is your most embarrassing social media post?",
  "Have you ever been caught doing something embarrassing?",
  "What’s the worst lie you’ve told?",
  "Who was your first crush?",
  "Have you ever blamed someone else for your mistake?",
  "What is the most embarrassing thing in your room?",
  "What is something you’ve never told anyone?"
]

let dares = [
  "Do 20 push-ups right now.",
  "Sing the chorus of your favorite song.",
  "Dance for 30 seconds without music.",
  "Speak in a funny voice for the next 2 minutes.",
  "Do an impression of someone in the chat.",
  "Eat a spoonful of something spicy.",
  "Text a random friend and say 'I love you'.",
  "Wear socks on your hands for 5 minutes.",
  "Do a silly walk across the room.",
  "Balance a book on your head for 1 minute.",
  "Post a funny selfie to social media.",
  "Try to lick your elbow.",
  "Hold your breath for 15 seconds.",
  "Call a friend and sing 'Happy Birthday'.",
  "Dance like a robot for 30 seconds.",
  "Say the alphabet backwards.",
  "Do 10 jumping jacks.",
  "Talk in an accent for the next 5 minutes.",
  "Make a funny face and hold it for 10 seconds.",
  "Do 5 cartwheels (or as many as you can).",
  "Draw a mustache on your face with marker (washable).",
  "Hop on one foot for 30 seconds.",
  "Imitate a celebrity until someone guesses who it is.",
  "Do your best animal impression for 30 seconds.",
  "Speak in rhyme for the next 3 sentences.",
  "Pretend you are a waiter/waitress and serve someone imaginary food.",
  "Do 15 squats.",
  "Sing the first verse of a song in a funny voice.",
  "Try to touch your toes without bending your knees.",
  "Make up a short rap about something in the room."
]

let handler = async (m, { command }) => {
  try {
    let result
    if (command.toLowerCase() === "truth") {
      result = truths[Math.floor(Math.random() * truths.length)]
      m.reply(`💬 *Truth*\n\n${result}`)
    } else if (command.toLowerCase() === "dare") {
      result = dares[Math.floor(Math.random() * dares.length)]
      m.reply(`🔥 *Dare*\n\n${result}`)
    } else {
      m.reply("❌ Unknown command. Use *truth* or *dare*.")
    }
  } catch (e) {
    console.error(e)
    m.reply("❌ Something went wrong while fetching Truth or Dare.")
  }
}

handler.help = ["truth", "dare"]
handler.tags = ["fun"]
handler.command = /^(truth|dare)$/i
export default handler