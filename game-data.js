/* Edit this file to customize the game. Keep every category and clue ID unique
   and stable during play. Each clue has a numeric value, clue, answer, and an
   optional reference. The optional finale has an ID, clue, answer, reference. */
window.GAME_DATA = {
  title: "Knowing God",
  subtitle: "A relaxed Bible study game for Montco midweek.",
  categories: [
    { id: "word", name: "Knowing God & His Word", clues: [
      { id: "word-100", value: 100, clue: "Jesus says to love God with all your heart, soul, mind and ____.", answer: "Strength.", reference: "Mark 12:30" },
      { id: "word-200", value: 200, clue: "James says not just to listen to the Word, but to do this with it.", answer: "Do it / put it into practice / obey it.", reference: "James 1:22" },
      { id: "word-300", value: 300, clue: "James compares someone who hears but does not act to a person looking into this household object.", answer: "A mirror.", reference: "James 1:23–24" },
      { id: "word-400", value: 400, clue: "Hebrews 4:12 calls God’s Word living and ____.", answer: "Active / powerful.", reference: "Hebrews 4:12" },
      { id: "word-500", value: 500, clue: "In John 8, holding to Jesus’ teaching lets us know this, which sets us free.", answer: "The truth.", reference: "John 8:31–32" }
    ] },
    { id: "call", name: "The Call to Follow", clues: [
      { id: "call-100", value: 100, clue: "In Luke 11, a disciple asked Jesus to teach them to do this.", answer: "Pray.", reference: "Luke 11:1" },
      { id: "call-200", value: 200, clue: "Jesus told fishermen to follow him, and he would send them to fish for these.", answer: "People / men.", reference: "Mark 1:17" },
      { id: "call-300", value: 300, clue: "In Matthew 28, Jesus sent his followers to make these among all nations.", answer: "Disciples.", reference: "Matthew 28:19" },
      { id: "call-400", value: 400, clue: "Jesus promised, ‘I am with you.’ For how long?", answer: "Always / to the end of the age.", reference: "Matthew 28:20" },
      { id: "call-500", value: 500, clue: "Following Jesus includes counting this before making a commitment.", answer: "The cost.", reference: "Luke 14:28–33" }
    ] },
    { id: "light", name: "From Darkness to Light", clues: [
      { id: "light-100", value: 100, clue: "Romans 3:23 says this many people have sinned and fallen short of God’s glory.", answer: "All / everyone.", reference: "Romans 3:23" },
      { id: "light-200", value: 200, clue: "James says to confess sins to one another and do this for one another.", answer: "Pray.", reference: "James 5:16" },
      { id: "light-300", value: 300, clue: "God calls his people out of darkness into his wonderful ____.", answer: "Light.", reference: "1 Peter 2:9" },
      { id: "light-400", value: 400, clue: "James 1:15 says that sin, when fully grown, gives birth to this.", answer: "Death.", reference: "James 1:15" },
      { id: "light-500", value: 500, clue: "In Isaiah 59, this separates people from God.", answer: "Sin / iniquity / wrongdoing.", reference: "Isaiah 59:1–2" }
    ] },
    { id: "plan", name: "God’s Plan & Pentecost", clues: [
      { id: "plan-100", value: 100, clue: "This apostle addressed the crowd about Jesus at Pentecost.", answer: "Peter.", reference: "Acts 2:14, 22–36" },
      { id: "plan-200", value: 200, clue: "In Romans 10:17, faith comes from doing this to the message about Christ.", answer: "Hearing / listening.", reference: "Romans 10:17" },
      { id: "plan-300", value: 300, clue: "When the crowd asked what to do, Peter named these two responses.", answer: "Repent and be baptized.", reference: "Acts 2:37–38" },
      { id: "plan-400", value: 400, clue: "Peter named forgiveness and this gift in Acts 2:38.", answer: "The Holy Spirit.", reference: "Acts 2:38" },
      { id: "plan-500", value: 500, clue: "Romans 6 connects baptism with Jesus’ death, burial and this new-life event.", answer: "Resurrection / being raised to new life.", reference: "Romans 6:3–4" }
    ] },
    { id: "family", name: "Jesus & His Family", clues: [
      { id: "family-100", value: 100, clue: "Colossians names this person head of the body, the church.", answer: "Christ / Jesus.", reference: "Colossians 1:18" },
      { id: "family-200", value: 200, clue: "Paul compares the church to this human structure with many parts.", answer: "A body.", reference: "1 Corinthians 12:12–27" },
      { id: "family-300", value: 300, clue: "In Gethsemane, Jesus prayed that not his own will but whose will be done?", answer: "The Father’s / God’s.", reference: "Matthew 26:39" },
      { id: "family-400", value: 400, clue: "Hebrews encourages believers not to give up doing this together.", answer: "Meeting / gathering together.", reference: "Hebrews 10:25" },
      { id: "family-500", value: 500, clue: "In 2 Corinthians, God loves this kind of giver.", answer: "A cheerful giver.", reference: "2 Corinthians 9:7" }
    ] }
  ],
  finale: {
    id: "finale",
    clue: "In Matthew 28:19–20, what mission did Jesus give and what did he promise?",
    answer: "Make disciples of all nations; he is with them always / to the end of the age. Baptizing and teaching are valid elaboration; partial credit is welcome.",
    reference: "Matthew 28:19–20"
  }
};
