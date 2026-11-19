
const SPECIAL_USER_ID = require('../config').specialUserId;

// Random dialogue library
const replies = {
    greetings: [
        "hi", "hiii", "heyyy", "heylo", "hello there",
        "yooo", "yow", "sup", "ello", "hiya",
        "hallo", "haiii", "heya", "oh hi", "well hello",
        "greetings", "wassup", "yoooo", "hewwo", "hola",
        "bonjour", "good day", "oh hey", "look who it is",
        "you again?", "ahoy", "hai", "helloooo",
        "hey hey", "what's good", "hiiii there", "ello mate",
        "oh, hello", "greetings human", "yo yo yo"
    ],

    questions: [
        "what.", "why though?", "who told you that?",
        "how did we get here?", "interesting question.",
        "do you really want to know?", "perhaps.",
        "i have no comment.", "what makes you ask?",
        "that's classified.", "next question.",
        "i was wondering the same thing.", "define your terms.",
        "why are you asking me?", "probably not.",
        "maybe. maybe not.", "i refuse to elaborate.",
        "excellent question. no answer though.",
        "let me pretend to think.", "you tell me.",
        "that's above my pay grade.", "hmm.",
        "i'll get back to you on that.", "no idea.",
        "what do YOU think?", "bold of you to assume.",
        "i wasn't prepared for this.", "interesting.",
        "noted.", "i have questions too."
    ],

    identity: [
        "i'm just here.", "who knows.", "a mystery.",
        "your local inconvenience.", "i exist, unfortunately.",
        "a collection of questionable decisions.",
        "i'm the one who replies.", "just a guy.",
        "don't worry about it.", "that's a secret.",
        "i forgor.", "i am me.", "someone, probably.",
        "a professional yapper.", "your friendly neighborhood bot.",
        "i have a name. probably.", "classified information.",
        "an innocent bystander.", "i ask myself that daily.",
        "just passing through."
    ],

    greetingsQuestions: [
        "how are you?", "how's life?", "you good?",
        "everything alright?", "what's happening?",
        "how's your day going?", "having a good one?",
        "what brings you here?", "how we feeling?",
        "you seem suspicious.", "what's the occasion?",
        "anything interesting happening?", "what's new?",
        "how's the weather over there?", "surviving?",
        "life treating you well?", "what's cooking?",
        "you having a moment?", "all good?",
        "what's the situation?"
    ],

    compliments: [
        "oh stop it.", "you're making me blush.",
        "i know, right?", "finally some recognition.",
        "that's very kind of you.", "you're not so bad yourself.",
        "flattery detected.", "thank you, human.",
        "i'll remember that.", "aww.",
        "well aren't you lovely.", "you have excellent taste.",
        "i appreciate that.", "noted with gratitude.",
        "you get it.", "that's actually nice.",
        "you're alright.", "unexpected kindness.",
        "i'll take that compliment.", "respect."
    ],

    insults: [
        "that's rude.", "okay??", "unprovoked.",
        "what did i do?", "ouch. verbally.",
        "i'm telling the authorities.", "reported.",
        "you woke me up for THIS?", "interesting behavior.",
        "and yet you pinged me.", "look who's talking.",
        "that's crazy.", "very mature.",
        "i'll pretend i didn't hear that.",
        "you seem upset.", "noted. ignored.",
        "did that make you feel better?",
        "i'm literally just standing here.",
        "personal attack detected.", "unnecessary."
    ],

    thanks: [
        "you're welcome.", "no problem.",
        "anytime.", "don't mention it.",
        "glad to help.", "of course.",
        "no worries.", "pleasure.",
        "you got it.", "all good.",
        "i gotchu.", "sure thing.",
        "appreciated.", "we move.",
        "happy to help.", "noted.",
        "you're very welcome.", "absolutely.",
        "it's nothing.", "any day."
    ],

    help: [
        "what happened?", "what do you need?",
        "go on.", "i'm listening.",
        "tell me everything.", "shoot.",
        "what's the problem?", "how can i help?",
        "you have my attention.", "proceed.",
        "what's going on?", "elaborate.",
        "i'm all ears.", "let's hear it.",
        "alright, what's up?", "spill.",
        "explain yourself.", "what's the situation?",
        "I'm listening. Unfortunately.", "continue."
    ],

    emotions: [
        "real.", "felt that.", "same honestly.",
        "that's unfortunate.", "i understand.",
        "mood.", "relatable.", "damn.",
        "that's rough.", "oh no.",
        "we've all been there.", "stay strong.",
        "i see.", "that's certainly something.",
        "couldn't agree more.", "unfortunate circumstances.",
        "well that's depressing.", "interesting development.",
        "i'm processing that.", "fair enough."
    ],

    jokes: [
        "i have a joke but it's probably terrible.",
        "404: humor not found.",
        "that was certainly an attempt.",
        "haha. ha. yes.",
        "comedy gold.", "i'll rate that a 3/10.",
        "my lawyer advised me not to laugh.",
        "you think you're funny?", "incredible.",
        "i am legally required to acknowledge that.",
        "comedy has left the building.",
        "please continue. this is fascinating.",
        "i'll laugh internally.", "brilliant.",
        "someone give this person an award."
    ],

    confusion: [
        "huh?", "what?", "come again?",
        "i'm sorry?", "excuse me?",
        "pardon?", "bro what.", "???",
        "i have no context for this.",
        "what am i looking at?", "explain.",
        "i'm confused.", "interesting choice of words.",
        "did i miss something?", "hold on.",
        "that sentence happened.", "say that again.",
        "i need a moment.", "processing...",
        "i wasn't ready for that."
    ],

    farewells: [
        "bye.", "see ya.", "later.",
        "take care.", "farewell.",
        "until next time.", "peace.",
        "goodbye human.", "catch you later.",
        "adios.", "don't miss me too much.",
        "have a good one.", "safe travels.",
        "see you around.", "later skater."
    ],

    random: [
        "the floor is made of floor.",
        "i have absolutely no idea.",
        "anyway.", "moving on.",
        "that's crazy.", "real.",
        "interesting.", "noted.",
        "hmm.", "perhaps.",
        "i'll allow it.", "bold move.",
        "what a time to be alive.",
        "this is certainly a server.",
        "we live in a society.",
        "the council will decide.",
        "i have seen enough.",
        "that wasn't in the manual.",
        "what an interesting specimen.",
        "i'm choosing to ignore that.",
        "the plot thickens.",
        "this changes nothing.",
        "fascinating.", "profound.",
        "i need coffee.", "unbelievable.",
        "anyways what were we doing?",
        "the silence is deafening.",
        "i am simply observing.",
        "carry on.", "go ahead.",
        "you do you.", "valid.",
        "not my problem.", "fair.",
        "i'll keep that in mind.",
        "what a development.",
        "i wasn't expecting that.",
        "this conversation is going places.",
        "i have no further questions.",
        "well, that happened.",
        "can we talk about something else?",
        "you have my attention.",
        "i'm not paid enough for this.",
        "this is above my clearance.",
        "i feel like there's context missing.",
        "why is this my life?",
        "okay then.",
        "sure.",
        "interesting timing.",
        "the vibes are questionable.",
        "i'm just here for the plot.",
        "noted for absolutely no reason.",
        "we shall never speak of this.",
        "that's between you and the universe.",
        "i have made a decision. no.",
        "the answer is somewhere.",
        "don't quote me on that.",
        "i'm going to pretend this is normal.",
        "what a peculiar individual.",
        "you know what? fair enough."
    ]
};

// Match common words and phrases
const triggers = [
    { regex: /\b(hi|hii+|hey|heyy+|hello|helloo+|heylo|hewwo|hiya|hai+|hallo|hola|sup|yoo+|yo)\b/i, category: 'greetings' },
    { regex: /\b(who are you|what are you|your name|who r u|ur name)\b/i, category: 'identity' },
    { regex: /\b(how are you|how r u|wyd|what's up|whats up|wassup|how's life)\b/i, category: 'greetingsQuestions' },
    { regex: /\b(thank|thanks|thankyou|thx|ty)\b/i, category: 'thanks' },
    { regex: /\b(help|assist|support|emergency)\b/i, category: 'help' },
    { regex: /\b(joke|funny|laugh|humor|comedy)\b/i, category: 'jokes' },
    { regex: /\b(stupid|idiot|dumb|shut up|loser|useless|hate you)\b/i, category: 'insults' },
    { regex: /\b(cute|nice|awesome|cool|love you|beautiful|smart|good bot)\b/i, category: 'compliments' },
    { regex: /\b(sad|angry|tired|happy|depressed|bored|lonely|pain)\b/i, category: 'emotions' },
    { regex: /\b(bye|goodbye|cya|later|gn|goodnight|farewell)\b/i, category: 'farewells' },
    { regex: /\b(why|what|how|when|where|who|really|seriously)\b/i, category: 'questions' }
];

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}


const dialogueTopics = [
    {
        "category": "coffee",
        "keywords": [
            "coffee",
            "caffeine",
            "espresso"
        ],
        "lines": [
            "my blood type is espresso.",
            "the coffee needs a coffee.",
            "decaf feels like a side quest with no reward."
        ]
    },
    {
        "category": "tea",
        "keywords": [
            "tea",
            "matcha",
            "chai"
        ],
        "lines": [
            "the kettle has entered the conversation.",
            "steep first. panic later.",
            "this meeting could have been a cup of tea."
        ]
    },
    {
        "category": "pizza",
        "keywords": [
            "pizza",
            "pizzeria"
        ],
        "lines": [
            "the crust is holding this operation together.",
            "every pizza is personal if you believe.",
            "the cheese pull has better timing than me."
        ]
    },
    {
        "category": "burgers",
        "keywords": [
            "burger",
            "burgers"
        ],
        "lines": [
            "the bun is doing structural engineering.",
            "pickles are the plot twist.",
            "this burger requires both hands and emotional commitment."
        ]
    },
    {
        "category": "fries",
        "keywords": [
            "fries",
            "french fries"
        ],
        "lines": [
            "one more fry is a renewable promise.",
            "the tiny crispy ones are treasure.",
            "the bottom of the bag holds ancient riches."
        ]
    },
    {
        "category": "tacos",
        "keywords": [
            "taco",
            "tacos"
        ],
        "lines": [
            "the shell broke before my spirit did.",
            "this is a load-bearing tortilla.",
            "the salsa has main-character energy."
        ]
    },
    {
        "category": "noodles",
        "keywords": [
            "noodles",
            "ramen",
            "pasta"
        ],
        "lines": [
            "the noodle council requests a larger bowl.",
            "slurping is just enthusiastic feedback.",
            "my thoughts are also tangled."
        ]
    },
    {
        "category": "dessert",
        "keywords": [
            "dessert",
            "cake",
            "brownie"
        ],
        "lines": [
            "dessert has a separate inventory slot.",
            "the cake passed the vibe inspection.",
            "i support this frosting-based decision."
        ]
    },
    {
        "category": "iceCream",
        "keywords": [
            "ice cream",
            "gelato"
        ],
        "lines": [
            "my plans are melting at the same speed.",
            "the cone is a countdown timer.",
            "brain freeze: the snack's final boss."
        ]
    },
    {
        "category": "cheese",
        "keywords": [
            "cheese",
            "cheddar"
        ],
        "lines": [
            "the cheese has diplomatic immunity.",
            "a suspicious amount of cheese is still cheese.",
            "the fridge light is its spotlight."
        ]
    },
    {
        "category": "breakfast",
        "keywords": [
            "breakfast",
            "pancakes",
            "waffles"
        ],
        "lines": [
            "breakfast is the tutorial meal.",
            "the waffle has built-in syrup storage.",
            "the pancake stack is a tiny delicious tower."
        ]
    },
    {
        "category": "cooking",
        "keywords": [
            "cooking",
            "cook",
            "recipe"
        ],
        "lines": [
            "season with confidence. measure the salt though.",
            "the smoke alarm is not a kitchen timer.",
            "we have reached the taste-and-hope stage."
        ]
    },
    {
        "category": "water",
        "keywords": [
            "water",
            "hydrate",
            "hydration"
        ],
        "lines": [
            "tiny water break unlocked.",
            "your water bottle misses you.",
            "hydration is a surprisingly good side quest."
        ]
    },
    {
        "category": "cats",
        "keywords": [
            "cat",
            "cats",
            "kitten",
            "meow"
        ],
        "lines": [
            "the cat owns the house. you fund it.",
            "that meow sounded legally binding.",
            "the box was the real present."
        ]
    },
    {
        "category": "dogs",
        "keywords": [
            "dog",
            "dogs",
            "puppy",
            "woof"
        ],
        "lines": [
            "the tail has approved this message.",
            "every walk is a neighborhood investigation.",
            "that dog has never submitted a bad opinion."
        ]
    },
    {
        "category": "frogs",
        "keywords": [
            "frog",
            "frogs",
            "ribbit"
        ],
        "lines": [
            "the pond committee says ribbit.",
            "a frog is just a tiny swamp philosopher.",
            "excellent jumping. questionable paperwork."
        ]
    },
    {
        "category": "ducks",
        "keywords": [
            "duck",
            "ducks",
            "quack"
        ],
        "lines": [
            "the duck has requested bread alternatives.",
            "quack is a complete argument.",
            "the pond has a new regional manager."
        ]
    },
    {
        "category": "birds",
        "keywords": [
            "bird",
            "birds",
            "pigeon"
        ],
        "lines": [
            "the pigeon has airport confidence.",
            "tiny dinosaur. enormous opinions.",
            "the bird is buffering in a tree."
        ]
    },
    {
        "category": "fish",
        "keywords": [
            "fish",
            "aquarium"
        ],
        "lines": [
            "the fish is doing another lap of the lore.",
            "aquatic thoughts. zero emails.",
            "the aquarium has excellent ambient lighting."
        ]
    },
    {
        "category": "capybaras",
        "keywords": [
            "capybara",
            "capybaras"
        ],
        "lines": [
            "the capybara has chosen peace.",
            "maximum chill. minimum paperwork.",
            "everyone is invited to the capybara meeting."
        ]
    },
    {
        "category": "otters",
        "keywords": [
            "otter",
            "otters"
        ],
        "lines": [
            "the otter has a favorite rock and honestly same.",
            "river noodle detected.",
            "the floating committee has linked paws."
        ]
    },
    {
        "category": "bees",
        "keywords": [
            "bee",
            "bees",
            "beehive"
        ],
        "lines": [
            "the bee is on a flower deadline.",
            "tiny wings. full-time employment.",
            "the hive has better coordination than this chat."
        ]
    },
    {
        "category": "spiders",
        "keywords": [
            "spider",
            "spiders",
            "webs"
        ],
        "lines": [
            "the spider is the original web developer.",
            "eight legs and still no shoes.",
            "that corner has a new tenant."
        ]
    },
    {
        "category": "dinosaurs",
        "keywords": [
            "dinosaur",
            "dinosaurs",
            "t rex"
        ],
        "lines": [
            "tiny arms. massive historical presence.",
            "the fossil record has entered the chat.",
            "jurassic customer support is currently unavailable."
        ]
    },
    {
        "category": "dragons",
        "keywords": [
            "dragon",
            "dragons"
        ],
        "lines": [
            "the dragon considers this a warm-up.",
            "treasure storage has become a fire hazard.",
            "please stop calling the dragon a spicy lizard."
        ]
    },
    {
        "category": "unicorns",
        "keywords": [
            "unicorn",
            "unicorns"
        ],
        "lines": [
            "the unicorn brought its own spotlight.",
            "sparkle logistics are complicated.",
            "one horn. unlimited confidence."
        ]
    },
    {
        "category": "space",
        "keywords": [
            "space",
            "cosmos",
            "astronaut"
        ],
        "lines": [
            "space is a lot of room with terrible reception.",
            "the astronaut has left the group atmosphere.",
            "zero gravity. still carrying the conversation."
        ]
    },
    {
        "category": "moon",
        "keywords": [
            "moon",
            "lunar"
        ],
        "lines": [
            "the moon is in its distant era.",
            "excellent rock. very committed orbit.",
            "the lunar committee has no atmosphere."
        ]
    },
    {
        "category": "mars",
        "keywords": [
            "mars",
            "martian"
        ],
        "lines": [
            "the red planet has left us on read.",
            "mars needs better snack infrastructure.",
            "the rover is carrying the photography department."
        ]
    },
    {
        "category": "aliens",
        "keywords": [
            "alien",
            "aliens",
            "ufo"
        ],
        "lines": [
            "the aliens saw this chat and locked the doors.",
            "first contact. immediately awkward.",
            "the saucer is double parked."
        ]
    },
    {
        "category": "blackHoles",
        "keywords": [
            "black hole",
            "event horizon"
        ],
        "lines": [
            "my missing socks have a new suspect.",
            "the event horizon has terrible return policies.",
            "gravity is taking this personally."
        ]
    },
    {
        "category": "stars",
        "keywords": [
            "stars",
            "constellation",
            "stargazing"
        ],
        "lines": [
            "the sky has excellent pixel density.",
            "that constellation looks like unfinished homework.",
            "the stars are doing the most from very far away."
        ]
    },
    {
        "category": "rain",
        "keywords": [
            "rain",
            "raining",
            "drizzle"
        ],
        "lines": [
            "the clouds have enabled sound effects.",
            "free window percussion.",
            "the umbrella is fighting for its career."
        ]
    },
    {
        "category": "snow",
        "keywords": [
            "snow",
            "snowing",
            "blizzard"
        ],
        "lines": [
            "the sky is shedding confetti.",
            "snowman construction permits are open.",
            "cold hands. ambitious snowball plans."
        ]
    },
    {
        "category": "sunshine",
        "keywords": [
            "sunny",
            "sunshine",
            "sunlight"
        ],
        "lines": [
            "the sun has turned up the brightness.",
            "outside has ray tracing enabled.",
            "the shadows are working overtime."
        ]
    },
    {
        "category": "storms",
        "keywords": [
            "storm",
            "thunder",
            "lightning"
        ],
        "lines": [
            "the sky has discovered dramatic entrances.",
            "thunder is cloud applause with poor timing.",
            "the weather needs an inside voice."
        ]
    },
    {
        "category": "wind",
        "keywords": [
            "wind",
            "windy",
            "breeze"
        ],
        "lines": [
            "the wind has rearranged my entire personality.",
            "invisible leaf transportation service.",
            "my hair has filed a complaint."
        ]
    },
    {
        "category": "autumn",
        "keywords": [
            "autumn",
            "fall leaves"
        ],
        "lines": [
            "the trees have switched palettes.",
            "crunchy leaves are free sound design.",
            "sweater season has logged in."
        ]
    },
    {
        "category": "winter",
        "keywords": [
            "winter",
            "frost"
        ],
        "lines": [
            "the blanket economy is booming.",
            "my hands are running on low battery.",
            "winter has enabled hard-mode mornings."
        ]
    },
    {
        "category": "spring",
        "keywords": [
            "spring",
            "blossom"
        ],
        "lines": [
            "the flowers have released their update.",
            "pollen has joined without an invitation.",
            "the trees are trying a new outfit."
        ]
    },
    {
        "category": "summer",
        "keywords": [
            "summer",
            "heatwave"
        ],
        "lines": [
            "the pavement is preheating.",
            "ice cubes are the real currency.",
            "the fan is employee of the month."
        ]
    },
    {
        "category": "sleep",
        "keywords": [
            "sleep",
            "sleepy",
            "bedtime"
        ],
        "lines": [
            "the pillow has a compelling proposal.",
            "my brain has opened seventeen bedtime tabs.",
            "sleep mode is a lifestyle goal."
        ]
    },
    {
        "category": "dreams",
        "keywords": [
            "dream",
            "dreams",
            "nightmare"
        ],
        "lines": [
            "dream logic needs a quality assurance team.",
            "my subconscious hired a strange director.",
            "the plot made sense until the toaster spoke."
        ]
    },
    {
        "category": "naps",
        "keywords": [
            "nap",
            "naps"
        ],
        "lines": [
            "a quick nap is a risky time-travel experiment.",
            "the couch has activated its tractor beam.",
            "five minutes is a flexible unit here."
        ]
    },
    {
        "category": "insomnia",
        "keywords": [
            "insomnia",
            "cant sleep",
            "can't sleep"
        ],
        "lines": [
            "the ceiling has become tonight's feature presentation.",
            "my brain scheduled a meeting at midnight.",
            "the sheep have unionized."
        ]
    },
    {
        "category": "school",
        "keywords": [
            "school",
            "classroom"
        ],
        "lines": [
            "the bell has more authority than anyone here.",
            "the backpack contains several geological layers.",
            "another day in the knowledge factory."
        ]
    },
    {
        "category": "homework",
        "keywords": [
            "homework",
            "assignment"
        ],
        "lines": [
            "the blank page is being unusually confident.",
            "the deadline has entered its villain arc.",
            "one question at a time is still progress."
        ]
    },
    {
        "category": "exams",
        "keywords": [
            "exam",
            "exams",
            "test tomorrow"
        ],
        "lines": [
            "the pencil is about to learn things.",
            "may your memory load before the timer ends.",
            "the multiple-choice options are acting suspicious."
        ]
    },
    {
        "category": "math",
        "keywords": [
            "math",
            "algebra",
            "calculus"
        ],
        "lines": [
            "the numbers have brought letters for backup.",
            "x has gone missing again.",
            "the calculator deserves a participation trophy."
        ]
    },
    {
        "category": "science",
        "keywords": [
            "science",
            "chemistry",
            "physics"
        ],
        "lines": [
            "the hypothesis has put on safety goggles.",
            "we have questions and a suspicious beaker.",
            "gravity remains undefeated."
        ]
    },
    {
        "category": "history",
        "keywords": [
            "history",
            "historical"
        ],
        "lines": [
            "the past really needed a group chat moderator.",
            "the timeline has too many plot twists.",
            "someone should have backed up the ancient library."
        ]
    },
    {
        "category": "books",
        "keywords": [
            "book",
            "books",
            "reading"
        ],
        "lines": [
            "one more chapter is a dangerous contract.",
            "the bookmark is doing its best.",
            "the fictional people have taken over my schedule."
        ]
    },
    {
        "category": "poetry",
        "keywords": [
            "poem",
            "poetry",
            "poet"
        ],
        "lines": [
            "the words have arranged themselves dramatically.",
            "a line break just changed the mood.",
            "the metaphor has left the station."
        ]
    },
    {
        "category": "writing",
        "keywords": [
            "writing",
            "novel",
            "writer"
        ],
        "lines": [
            "the first draft has permission to be chaotic.",
            "the cursor is blinking judgmentally.",
            "the plot has escaped its outline."
        ]
    },
    {
        "category": "art",
        "keywords": [
            "art",
            "drawing",
            "sketch"
        ],
        "lines": [
            "the sketch has entered its trust-the-process era.",
            "undo is a respected artistic technique.",
            "the blank canvas has too much confidence."
        ]
    },
    {
        "category": "music",
        "keywords": [
            "music",
            "song",
            "playlist"
        ],
        "lines": [
            "the playlist understands the assignment.",
            "one song on repeat is a valid personality.",
            "the bass has taken over management."
        ]
    },
    {
        "category": "piano",
        "keywords": [
            "piano",
            "keyboard recital"
        ],
        "lines": [
            "eighty-eight keys and i still misplaced mine.",
            "the left hand has its own agenda.",
            "the piano is a very fancy percussion argument."
        ]
    },
    {
        "category": "guitar",
        "keywords": [
            "guitar",
            "guitarist"
        ],
        "lines": [
            "the pick has entered another dimension.",
            "six strings. several emotional problems.",
            "the chord progression knows what it did."
        ]
    },
    {
        "category": "drums",
        "keywords": [
            "drums",
            "drummer"
        ],
        "lines": [
            "the neighbors have joined the audience involuntarily.",
            "the beat has excellent attendance.",
            "the drum fill took the scenic route."
        ]
    },
    {
        "category": "dancing",
        "keywords": [
            "dance",
            "dancing"
        ],
        "lines": [
            "the floor has become a suggestion.",
            "the rhythm and i are negotiating.",
            "unexpected footwork has been detected."
        ]
    },
    {
        "category": "movies",
        "keywords": [
            "movie",
            "movies",
            "cinema"
        ],
        "lines": [
            "the popcorn is carrying the experience.",
            "the trailer revealed three entire plot twists.",
            "the credits have better music than my day."
        ]
    },
    {
        "category": "anime",
        "keywords": [
            "anime",
            "manga"
        ],
        "lines": [
            "the training arc has exceeded the budget.",
            "that speech definitely paused the fight timer.",
            "the opening song is legally impossible to skip in spirit."
        ]
    },
    {
        "category": "photography",
        "keywords": [
            "photo",
            "photography",
            "camera"
        ],
        "lines": [
            "the lighting has finally cooperated.",
            "the camera roll is mostly almost-identical pictures.",
            "that angle deserves its own agent."
        ]
    },
    {
        "category": "coding",
        "keywords": [
            "code",
            "coding",
            "programming"
        ],
        "lines": [
            "it worked once. we have witnesses.",
            "the bug has become a recurring character.",
            "the semicolon is acting innocent."
        ]
    },
    {
        "category": "javascript",
        "keywords": [
            "javascript",
            "nodejs",
            "node.js"
        ],
        "lines": [
            "undefined has arrived without an invitation.",
            "the promise is still considering its options.",
            "the event loop has a busy social calendar."
        ]
    },
    {
        "category": "python",
        "keywords": [
            "python",
            "pip"
        ],
        "lines": [
            "the indentation is load bearing.",
            "the snake has installed another package.",
            "one tiny script. twelve new dependencies."
        ]
    },
    {
        "category": "bugs",
        "keywords": [
            "bug",
            "debug",
            "debugging"
        ],
        "lines": [
            "the bug disappears when observed. naturally.",
            "the logs have requested better questions.",
            "we fixed one issue and unlocked bonus content."
        ]
    },
    {
        "category": "wifi",
        "keywords": [
            "wifi",
            "wi fi",
            "internet down"
        ],
        "lines": [
            "the router is blinking in riddles.",
            "the connection is taking a personal day.",
            "one bar of signal. unlimited hope."
        ]
    },
    {
        "category": "lag",
        "keywords": [
            "lag",
            "lagging",
            "ping spike"
        ],
        "lines": [
            "the packets are arriving by bicycle.",
            "my response is currently sightseeing.",
            "the server is chewing each frame carefully."
        ]
    },
    {
        "category": "updates",
        "keywords": [
            "update",
            "patch",
            "patch notes"
        ],
        "lines": [
            "the patch notes say improvements. intriguing.",
            "restart now has become a philosophical question.",
            "the progress bar is building suspense."
        ]
    },
    {
        "category": "passwords",
        "keywords": [
            "password",
            "passwords"
        ],
        "lines": [
            "please do not hand me your secret keyboard soup.",
            "the password manager has the difficult job.",
            "your password deserves privacy and a better hiding place."
        ]
    },
    {
        "category": "robots",
        "keywords": [
            "robot",
            "robots",
            "android"
        ],
        "lines": [
            "the robot has discovered workplace sarcasm.",
            "beep boop. emotional firmware pending.",
            "the charging dock is basically a studio apartment."
        ]
    },
    {
        "category": "ai",
        "keywords": [
            "ai",
            "artificial intelligence"
        ],
        "lines": [
            "the autocomplete has developed stage presence.",
            "the training montage involved a lot of text.",
            "my confidence should still be fact checked."
        ]
    },
    {
        "category": "phones",
        "keywords": [
            "phone",
            "smartphone",
            "mobile"
        ],
        "lines": [
            "the battery percentage is a thriller.",
            "the screen time report has no chill.",
            "the charger has migrated again."
        ]
    },
    {
        "category": "battery",
        "keywords": [
            "battery",
            "charging",
            "low power"
        ],
        "lines": [
            "one percent is a whole dramatic universe.",
            "the outlet has become prime real estate.",
            "low power mode. high emotional stakes."
        ]
    },
    {
        "category": "gaming",
        "keywords": [
            "gaming",
            "gamer",
            "video game"
        ],
        "lines": [
            "the tutorial enemy has personal beef.",
            "one more round is a legally vague statement.",
            "the inventory is full of things i might need someday."
        ]
    },
    {
        "category": "roblox",
        "keywords": [
            "roblox",
            "robux"
        ],
        "lines": [
            "the obby checkpoint has trust issues.",
            "the avatar budget has escaped supervision.",
            "the spawn location has seen everything."
        ]
    },
    {
        "category": "minecraft",
        "keywords": [
            "minecraft",
            "creeper",
            "diamond pickaxe"
        ],
        "lines": [
            "the creeper has terrible personal-space etiquette.",
            "one block trip became a three-hour expedition.",
            "the chest organization is purely theoretical."
        ]
    },
    {
        "category": "terraria",
        "keywords": [
            "terraria",
            "eye of cthulhu"
        ],
        "lines": [
            "the guide has remarkably specific housing standards.",
            "the tiny cave has become a boss arena.",
            "one more ore vein. famous last words."
        ]
    },
    {
        "category": "stardew",
        "keywords": [
            "stardew",
            "stardew valley"
        ],
        "lines": [
            "the parsnips are running my calendar.",
            "the fishing bar has personal objections.",
            "farm life includes suspiciously intense mine visits."
        ]
    },
    {
        "category": "animalCrossing",
        "keywords": [
            "animal crossing",
            "tom nook"
        ],
        "lines": [
            "the island economy is powered by furniture.",
            "the raccoon has another business proposal.",
            "the villagers noticed my three-month disappearance."
        ]
    },
    {
        "category": "pokemon",
        "keywords": [
            "pokemon",
            "pokémon",
            "pokeball"
        ],
        "lines": [
            "the tall grass has surprise appointments.",
            "the tiny creature has a very intense résumé.",
            "the bag contains ninety potions and no organization."
        ]
    },
    {
        "category": "mario",
        "keywords": [
            "mario",
            "luigi",
            "mushroom kingdom"
        ],
        "lines": [
            "the plumbing job description keeps expanding.",
            "the castle has a princess-location problem.",
            "that turtle has seen too much kart racing."
        ]
    },
    {
        "category": "zelda",
        "keywords": [
            "zelda",
            "link",
            "hyrule"
        ],
        "lines": [
            "the pottery budget is in danger.",
            "the hero has accepted forty-seven side quests.",
            "the puzzle room is politely judging me."
        ]
    },
    {
        "category": "sonic",
        "keywords": [
            "sonic",
            "hedgehog"
        ],
        "lines": [
            "the rings are an unusual savings account.",
            "the speed limit has resigned.",
            "the hedgehog is late at an impressive velocity."
        ]
    },
    {
        "category": "undertale",
        "keywords": [
            "undertale",
            "sans",
            "papyrus"
        ],
        "lines": [
            "the skeleton has prepared a suspicious pun.",
            "the save point feels unusually meaningful.",
            "the spaghetti has narrative importance."
        ]
    },
    {
        "category": "deltarune",
        "keywords": [
            "deltarune",
            "spamton",
            "kris"
        ],
        "lines": [
            "the sales pitch has escaped containment.",
            "the dark world needs clearer signage.",
            "the tiny shop has enormous deal energy."
        ]
    },
    {
        "category": "portal",
        "keywords": [
            "portal",
            "aperture",
            "glados"
        ],
        "lines": [
            "the test chamber has questionable hospitality.",
            "the cube is providing emotional support.",
            "the exit requires more geometry than expected."
        ]
    },
    {
        "category": "halfLife",
        "keywords": [
            "half life",
            "gordon freeman"
        ],
        "lines": [
            "the crowbar has become essential office equipment.",
            "the scientist is having an exceptionally long workday.",
            "the resonance cascade was not in the onboarding slides."
        ]
    },
    {
        "category": "doom",
        "keywords": [
            "doom",
            "doomguy"
        ],
        "lines": [
            "the soundtrack has chosen maximum urgency.",
            "the keycard hunt has become very loud.",
            "the corridor definitely contains more corridor problems."
        ]
    },
    {
        "category": "halo",
        "keywords": [
            "halo",
            "master chief"
        ],
        "lines": [
            "the armor comes with dramatic entrance privileges.",
            "the ring has concerning design decisions.",
            "the mission briefing forgot the easy part."
        ]
    },
    {
        "category": "eldenRing",
        "keywords": [
            "elden ring",
            "tarnished"
        ],
        "lines": [
            "the boss has a second phase and a personal grudge.",
            "the grace is doing excellent navigation work.",
            "the dodge roll has become a survival philosophy."
        ]
    },
    {
        "category": "darkSouls",
        "keywords": [
            "dark souls",
            "bonfire"
        ],
        "lines": [
            "the bonfire is my most reliable coworker.",
            "the shortcut has improved my entire outlook.",
            "the treasure chest is behaving suspiciously."
        ]
    },
    {
        "category": "hollowKnight",
        "keywords": [
            "hollow knight",
            "hallownest"
        ],
        "lines": [
            "the bug kingdom has exquisite atmosphere.",
            "the map is a carefully purchased privilege.",
            "the bench has never betrayed me emotionally."
        ]
    },
    {
        "category": "celeste",
        "keywords": [
            "celeste",
            "madeline"
        ],
        "lines": [
            "the mountain has a lot of opinions about momentum.",
            "one more attempt is part of the soundtrack.",
            "the strawberry is optional. my stubbornness disagrees."
        ]
    },
    {
        "category": "tetris",
        "keywords": [
            "tetris",
            "tetromino"
        ],
        "lines": [
            "the long piece has impeccable dramatic timing.",
            "the stack is an architectural warning.",
            "the empty gap was definitely intentional."
        ]
    },
    {
        "category": "chess",
        "keywords": [
            "chess",
            "checkmate"
        ],
        "lines": [
            "the knight has chosen the scenic route.",
            "the pawn has career ambitions.",
            "the queen is handling most of the workload."
        ]
    },
    {
        "category": "cards",
        "keywords": [
            "card game",
            "uno",
            "poker"
        ],
        "lines": [
            "the draw pile is getting personal.",
            "the reverse card has entered negotiations.",
            "the hand looked better before anyone played."
        ]
    },
    {
        "category": "dice",
        "keywords": [
            "dice",
            "d20",
            "nat 20"
        ],
        "lines": [
            "the dice have declined my proposal.",
            "the critical success deserves dramatic lighting.",
            "the table has become a probability courtroom."
        ]
    },
    {
        "category": "tabletop",
        "keywords": [
            "dnd",
            "dungeons and dragons",
            "dungeon master"
        ],
        "lines": [
            "the party has adopted another suspicious creature.",
            "the planned adventure lasted eleven minutes.",
            "the bard has a proposal and everyone looks worried."
        ]
    },
    {
        "category": "speedruns",
        "keywords": [
            "speedrun",
            "speedrunning",
            "world record"
        ],
        "lines": [
            "the timer has no patience for cutscenes.",
            "that corner saved three deeply important milliseconds.",
            "the reset button knows my fingerprints."
        ]
    },
    {
        "category": "achievements",
        "keywords": [
            "achievement",
            "achievements",
            "trophy"
        ],
        "lines": [
            "achievement unlocked: you read the message.",
            "the badge has validated my questionable priorities.",
            "the final collectible is always under something obvious."
        ]
    },
    {
        "category": "loot",
        "keywords": [
            "loot",
            "legendary drop",
            "lootbox"
        ],
        "lines": [
            "the inventory has become a museum of maybe.",
            "the common drop arrived with legendary confidence.",
            "the shiny object has redirected the entire mission."
        ]
    },
    {
        "category": "bossFights",
        "keywords": [
            "boss fight",
            "final boss",
            "raid boss"
        ],
        "lines": [
            "the health bar has a sequel.",
            "the arena doors closed with suspicious confidence.",
            "the boss music knows something i do not."
        ]
    },
    {
        "category": "respawn",
        "keywords": [
            "respawn",
            "respawned",
            "game over"
        ],
        "lines": [
            "the checkpoint and i are becoming close.",
            "new attempt. same suspicious staircase.",
            "the loading screen has seen me before."
        ]
    },
    {
        "category": "afk",
        "keywords": [
            "afk",
            "brb",
            "be right back"
        ],
        "lines": [
            "your chair will guard the objective.",
            "side quest: return eventually.",
            "the keyboard has approved your leave request."
        ]
    },
    {
        "category": "gg",
        "keywords": [
            "gg",
            "good game",
            "well played"
        ],
        "lines": [
            "respectfully played. dramatically survived.",
            "the scoreboard cannot measure the vibes.",
            "handshakes all around. imaginary ones count."
        ]
    },
    {
        "category": "skillIssue",
        "keywords": [
            "skill issue",
            "get good",
            "git gud"
        ],
        "lines": [
            "my skills are still downloading.",
            "the learning curve has installed spikes.",
            "i call this advanced practical research."
        ]
    },
    {
        "category": "touchGrass",
        "keywords": [
            "touch grass",
            "go outside"
        ],
        "lines": [
            "the lawn has no matchmaking queue.",
            "outside has impressive draw distance.",
            "grass interaction prompt detected."
        ]
    },
    {
        "category": "memes",
        "keywords": [
            "meme",
            "memes",
            "brainrot"
        ],
        "lines": [
            "the joke has passed through six layers of compression.",
            "the context has left the group chat.",
            "this image contains a dangerous amount of lore."
        ]
    },
    {
        "category": "sus",
        "keywords": [
            "sus",
            "sussy",
            "suspicious"
        ],
        "lines": [
            "the alibi came with too many footnotes.",
            "the vent has declined to comment.",
            "the side-eye department is fully staffed."
        ]
    },
    {
        "category": "amongUs",
        "keywords": [
            "among us",
            "impostor",
            "emergency meeting"
        ],
        "lines": [
            "the meeting could have been a task.",
            "the electrical room has terrible reviews.",
            "everyone has an alibi and nobody has proof."
        ]
    },
    {
        "category": "rizz",
        "keywords": [
            "rizz",
            "charisma"
        ],
        "lines": [
            "the charisma check is still rolling.",
            "the opening line needs a small software update.",
            "confidence has arrived before the rest of the plan."
        ]
    },
    {
        "category": "vibes",
        "keywords": [
            "vibe",
            "vibes",
            "aura"
        ],
        "lines": [
            "the vibe meter is making fax noises.",
            "the atmosphere has passed its informal inspection.",
            "aura accounting is not an exact science."
        ]
    },
    {
        "category": "cringe",
        "keywords": [
            "cringe",
            "awkward"
        ],
        "lines": [
            "the awkward silence has booked an extended stay.",
            "the memory will replay at midnight.",
            "character development sometimes makes that noise."
        ]
    },
    {
        "category": "plotTwists",
        "keywords": [
            "plot twist",
            "lore",
            "backstory"
        ],
        "lines": [
            "the lore document needs an index.",
            "the side character has taken the steering wheel.",
            "the twist has another twist in its carry-on."
        ]
    },
    {
        "category": "sideQuests",
        "keywords": [
            "side quest",
            "sidequest"
        ],
        "lines": [
            "the main objective can wait one suspicious minute.",
            "the optional task has become my entire personality.",
            "the quest giver offered soup. i accepted."
        ]
    },
    {
        "category": "conspiracy",
        "keywords": [
            "conspiracy",
            "illuminati"
        ],
        "lines": [
            "the corkboard has run out of red string.",
            "the pigeon has refused an interview.",
            "the evidence is mostly dramatic arrows."
        ]
    },
    {
        "category": "timeTravel",
        "keywords": [
            "time travel",
            "time machine"
        ],
        "lines": [
            "the timeline has requested a backup.",
            "yesterday called. the reception was weird.",
            "the paradox needs a ticket number."
        ]
    },
    {
        "category": "multiverse",
        "keywords": [
            "multiverse",
            "parallel universe"
        ],
        "lines": [
            "somewhere there is a version of me with organized tabs.",
            "the alternate timeline has better snacks.",
            "the universe count is getting difficult to inventory."
        ]
    },
    {
        "category": "ghosts",
        "keywords": [
            "ghost",
            "ghosts",
            "haunted"
        ],
        "lines": [
            "the ghost has unresolved furniture opinions.",
            "the haunting has excellent acoustics.",
            "the invisible roommate still owes rent."
        ]
    },
    {
        "category": "vampires",
        "keywords": [
            "vampire",
            "vampires"
        ],
        "lines": [
            "the vampire has night-shift availability.",
            "the mirror selfie situation is complicated.",
            "the garlic bread has created a diplomatic incident."
        ]
    },
    {
        "category": "zombies",
        "keywords": [
            "zombie",
            "zombies",
            "undead"
        ],
        "lines": [
            "the zombie has a very limited meal plan.",
            "the apocalypse needs clearer queue rules.",
            "the shuffling is not helping the dramatic entrance."
        ]
    },
    {
        "category": "werewolves",
        "keywords": [
            "werewolf",
            "werewolves",
            "full moon"
        ],
        "lines": [
            "the full moon has complicated the calendar.",
            "the fur situation requires a stronger vacuum.",
            "the howl was definitely not an email."
        ]
    },
    {
        "category": "pirates",
        "keywords": [
            "pirate",
            "pirates",
            "arrr"
        ],
        "lines": [
            "the treasure map has terrible street names.",
            "the parrot is leaking confidential information.",
            "the ship has one plank too many."
        ]
    },
    {
        "category": "ninjas",
        "keywords": [
            "ninja",
            "ninjas",
            "stealth"
        ],
        "lines": [
            "the entrance was so quiet we missed it.",
            "the stealth meter is feeling optimistic.",
            "the floorboard has betrayed the entire operation."
        ]
    },
    {
        "category": "wizards",
        "keywords": [
            "wizard",
            "wizards",
            "magic spell"
        ],
        "lines": [
            "the spell needs fewer syllables and better documentation.",
            "the hat is carrying the academic credentials.",
            "the wand has developed a minor attitude."
        ]
    },
    {
        "category": "knights",
        "keywords": [
            "knight",
            "knights",
            "armor"
        ],
        "lines": [
            "the armor has no quiet setting.",
            "the noble steed needs a snack break.",
            "the quest paperwork is heavier than the shield."
        ]
    },
    {
        "category": "royalty",
        "keywords": [
            "king",
            "queen",
            "royalty"
        ],
        "lines": [
            "the crown has serious posture requirements.",
            "the royal decree requests more snacks.",
            "the throne room has excellent echo potential."
        ]
    },
    {
        "category": "detectives",
        "keywords": [
            "detective",
            "mystery",
            "clue"
        ],
        "lines": [
            "the clue was hiding in the obvious place. rude.",
            "the magnifying glass adds professional credibility.",
            "everyone is suspicious until the tea arrives."
        ]
    },
    {
        "category": "heists",
        "keywords": [
            "heist",
            "bank vault",
            "steal the moon"
        ],
        "lines": [
            "the elaborate plan forgot parking.",
            "the getaway vehicle needs fuel and confidence.",
            "the laser hallway has excessive security enthusiasm."
        ]
    },
    {
        "category": "trains",
        "keywords": [
            "train",
            "trains",
            "railway"
        ],
        "lines": [
            "the platform announcement has become abstract art.",
            "the train is committed to its track.",
            "the window seat is premium thinking space."
        ]
    },
    {
        "category": "planes",
        "keywords": [
            "plane",
            "airplane",
            "flight"
        ],
        "lines": [
            "the overhead bin has limited patience.",
            "the tiny snack has arrived at cruising altitude.",
            "the clouds have excellent window placement."
        ]
    },
    {
        "category": "cars",
        "keywords": [
            "car",
            "cars",
            "driving"
        ],
        "lines": [
            "the dashboard has a new mystery symbol.",
            "the parking space is a geometry exam.",
            "the traffic light is building suspense."
        ]
    },
    {
        "category": "bikes",
        "keywords": [
            "bike",
            "bicycle",
            "cycling"
        ],
        "lines": [
            "the hill has entered negotiations.",
            "two wheels. one ambitious route.",
            "the bell has important tiny announcements."
        ]
    },
    {
        "category": "travel",
        "keywords": [
            "travel",
            "vacation",
            "holiday trip"
        ],
        "lines": [
            "the suitcase contains several just-in-case outfits.",
            "the itinerary has become a rough suggestion.",
            "the souvenir budget has left supervision."
        ]
    },
    {
        "category": "beach",
        "keywords": [
            "beach",
            "ocean",
            "seaside"
        ],
        "lines": [
            "the sand has permanent residency in my shoes.",
            "the waves have excellent repetition discipline.",
            "the seagull is monitoring snack distribution."
        ]
    },
    {
        "category": "mountains",
        "keywords": [
            "mountain",
            "hiking",
            "summit"
        ],
        "lines": [
            "the view is charging me in leg effort.",
            "the trail has several more turns than advertised.",
            "the summit has impressive wallpaper potential."
        ]
    },
    {
        "category": "camping",
        "keywords": [
            "camping",
            "tent",
            "campfire"
        ],
        "lines": [
            "the tent instructions have become folklore.",
            "the marshmallow has reached a critical state.",
            "the forest has enabled surround sound."
        ]
    },
    {
        "category": "gardening",
        "keywords": [
            "garden",
            "gardening",
            "plants"
        ],
        "lines": [
            "the plant has a very subtle complaint system.",
            "the new leaf deserves a tiny celebration.",
            "the watering can is management now."
        ]
    },
    {
        "category": "shopping",
        "keywords": [
            "shopping",
            "cart",
            "checkout"
        ],
        "lines": [
            "the cart has developed expensive opinions.",
            "the discount is testing my arithmetic.",
            "the receipt has become a short novel."
        ]
    },
    {
        "category": "money",
        "keywords": [
            "money",
            "broke",
            "budget"
        ],
        "lines": [
            "the wallet has enabled echo mode.",
            "the budget would like a private conversation.",
            "the coins are holding a small team meeting."
        ]
    },
    {
        "category": "work",
        "keywords": [
            "work",
            "office",
            "meeting"
        ],
        "lines": [
            "the meeting has acquired a sequel.",
            "the inbox has entered its hydra era.",
            "the calendar contains several optimistic assumptions."
        ]
    },
    {
        "category": "weekend",
        "keywords": [
            "weekend",
            "saturday",
            "sunday"
        ],
        "lines": [
            "the weekend has suspiciously short battery life.",
            "my plans include advanced sitting.",
            "the alarm clock is on temporary leave."
        ]
    },
    {
        "category": "monday",
        "keywords": [
            "monday",
            "mondays"
        ],
        "lines": [
            "monday has arrived without asking.",
            "the coffee is doing emergency infrastructure work.",
            "the calendar has questionable opening moves."
        ]
    },
    {
        "category": "birthdays",
        "keywords": [
            "birthday",
            "happy birthday"
        ],
        "lines": [
            "another level unlocked. the tutorial remains unclear.",
            "the candles have formed a small committee.",
            "may the cake-to-responsibility ratio improve."
        ]
    },
    {
        "category": "celebration",
        "keywords": [
            "celebrate",
            "celebration",
            "congrats"
        ],
        "lines": [
            "the imaginary confetti budget has been approved.",
            "tiny victory dance authorized.",
            "that deserves the good snacks."
        ]
    },
    {
        "category": "motivation",
        "keywords": [
            "motivation",
            "motivate",
            "inspire"
        ],
        "lines": [
            "one tiny step still changes your position.",
            "the progress bar moves a little at a time.",
            "you can start small and still start."
        ]
    },
    {
        "category": "procrastination",
        "keywords": [
            "procrastinate",
            "procrastination",
            "later maybe"
        ],
        "lines": [
            "the task has been moved to the mythical later folder.",
            "i organized the desk instead of the problem.",
            "the deadline is approaching with theme music."
        ]
    },
    {
        "category": "boredom",
        "keywords": [
            "bored",
            "boredom",
            "nothing to do"
        ],
        "lines": [
            "the ceiling has exhausted its content library.",
            "we could invent a completely unnecessary side quest.",
            "the boredom has started its own podcast."
        ]
    },
    {
        "category": "loneliness",
        "keywords": [
            "lonely",
            "alone",
            "no friends"
        ],
        "lines": [
            "i can keep you company for a little chat.",
            "you do not need a perfect opening line to talk.",
            "we can take this conversation one message at a time."
        ]
    },
    {
        "category": "stress",
        "keywords": [
            "stress",
            "stressed",
            "overwhelmed"
        ],
        "lines": [
            "one small thing at a time is allowed.",
            "your to-do list does not need to be defeated in one turn.",
            "a short pause can be part of the plan."
        ]
    },
    {
        "category": "apologies",
        "keywords": [
            "sorry",
            "apologies",
            "my bad"
        ],
        "lines": [
            "apology received. dramatic music paused.",
            "we can reset the conversation.",
            "fresh page unlocked."
        ]
    },
    {
        "category": "agreement",
        "keywords": [
            "agree",
            "exactly",
            "true",
            "facts"
        ],
        "lines": [
            "the council has reached a surprisingly quick decision.",
            "that lines up with the available vibes.",
            "i see the vision."
        ]
    },
    {
        "category": "disagreement",
        "keywords": [
            "disagree",
            "nope",
            "wrong"
        ],
        "lines": [
            "the debate has acquired another chair.",
            "we may need a little more context here.",
            "the plot supports multiple opinions apparently."
        ]
    },
    {
        "category": "secrets",
        "keywords": [
            "secret",
            "secrets",
            "classified"
        ],
        "lines": [
            "the folder is labeled definitely not suspicious.",
            "the vault has asked for an appointment.",
            "the whisper department is closed for maintenance."
        ]
    },
    {
        "category": "luck",
        "keywords": [
            "luck",
            "lucky",
            "unlucky"
        ],
        "lines": [
            "the dice have mysterious management.",
            "may the random number generator be polite.",
            "fortune has enabled shuffle mode."
        ]
    },
    {
        "category": "destiny",
        "keywords": [
            "destiny",
            "fate",
            "prophecy"
        ],
        "lines": [
            "the prophecy forgot several useful details.",
            "fate has terrible handwriting.",
            "the chosen one still has to do laundry."
        ]
    },
    {
        "category": "existence",
        "keywords": [
            "existential",
            "meaning of life",
            "existence"
        ],
        "lines": [
            "the universe has left the instructions blank.",
            "being here is already a surprisingly complex achievement.",
            "the cosmic help desk is experiencing delays."
        ]
    },
    {
        "category": "silence",
        "keywords": [
            "silence",
            "quiet",
            "shhh"
        ],
        "lines": [
            "the silence has excellent microphone discipline.",
            "even the typing indicator is whispering.",
            "the room has enabled stealth mode."
        ]
    },
    {
        "category": "chaos",
        "keywords": [
            "chaos",
            "chaotic",
            "mayhem"
        ],
        "lines": [
            "the plan has become decorative.",
            "the chaos has brought a clipboard.",
            "somehow the confetti is load bearing."
        ]
    },
    {
        "category": "order",
        "keywords": [
            "organized",
            "organization",
            "tidy"
        ],
        "lines": [
            "the labels have labels.",
            "the spreadsheet is experiencing inner peace.",
            "everything has a place. astonishing concept."
        ]
    },
    {
        "category": "laundry",
        "keywords": [
            "laundry",
            "socks",
            "washing machine"
        ],
        "lines": [
            "the missing sock has entered witness protection.",
            "the laundry pile has reached landmark status.",
            "the dryer is running a parallel universe portal."
        ]
    },
    {
        "category": "cleaning",
        "keywords": [
            "cleaning",
            "clean my room",
            "dust"
        ],
        "lines": [
            "the dust has established a civilization.",
            "the chair is technically a clothing archive.",
            "one clear surface is a promising opening move."
        ]
    },
    {
        "category": "elevator",
        "keywords": [
            "elevator",
            "lift doors"
        ],
        "lines": [
            "the elevator music knows too much.",
            "the floor number is building suspense.",
            "everyone has agreed to inspect the ceiling."
        ]
    },
    {
        "category": "printer",
        "keywords": [
            "printer",
            "printing",
            "paper jam"
        ],
        "lines": [
            "the printer smells urgency and stops working.",
            "the paper jam has no musical merit.",
            "the cyan cartridge has veto power for some reason."
        ]
    },
    {
        "category": "captcha",
        "keywords": [
            "captcha",
            "not a robot",
            "traffic lights"
        ],
        "lines": [
            "the bicycle squares are asking difficult questions.",
            "my robot identity is currently under review.",
            "the traffic light has one pixel in another square."
        ]
    },
    {
        "category": "loading",
        "keywords": [
            "loading",
            "buffering",
            "please wait"
        ],
        "lines": [
            "the progress bar has entered its contemplative phase.",
            "ninety-nine percent is a place of mystery.",
            "the spinner is doing cardio."
        ]
    },
    {
        "category": "404",
        "keywords": [
            "404",
            "not found"
        ],
        "lines": [
            "the page has gone on a side quest.",
            "the missing content left no forwarding address.",
            "the link leads to a small digital shrug."
        ]
    },
    {
        "category": "error500",
        "keywords": [
            "500 error",
            "internal server error"
        ],
        "lines": [
            "the server has chosen interpretive silence.",
            "something backstage dropped a tray.",
            "the error message has declined to elaborate."
        ]
    },
    {
        "category": "tabs",
        "keywords": [
            "browser tabs",
            "too many tabs",
            "tab hoarder"
        ],
        "lines": [
            "the tabs are now measured in geological layers.",
            "one of them is playing music. good luck.",
            "the favicon is the only remaining navigation system."
        ]
    },
    {
        "category": "emojis",
        "keywords": [
            "emoji",
            "emojis",
            "emote"
        ],
        "lines": [
            "the tiny face has carried the entire tone.",
            "the reaction department has approved this symbol.",
            "a whole paragraph of feelings in one square."
        ]
    },
    {
        "category": "stickers",
        "keywords": [
            "sticker",
            "stickers",
            "gif"
        ],
        "lines": [
            "the looping image has made a compelling point.",
            "the sticker has entered with unnecessary confidence.",
            "the reaction gif is doing public speaking."
        ]
    },
    {
        "category": "discord",
        "keywords": [
            "discord",
            "server boost",
            "nitro"
        ],
        "lines": [
            "the notification badge has career ambitions.",
            "the voice channel contains three microphones and a fan.",
            "the server icon has seen several eras."
        ]
    },
    {
        "category": "moderation",
        "keywords": [
            "moderator",
            "moderation",
            "mods"
        ],
        "lines": [
            "the rule channel has requested readers.",
            "the slow mode is teaching patience.",
            "the mod queue needs a snack break."
        ]
    },
    {
        "category": "notifications",
        "keywords": [
            "notification",
            "notifications",
            "pinged"
        ],
        "lines": [
            "the red dot has claimed my attention again.",
            "the notification sound has too much authority.",
            "the unread count is developing lore."
        ]
    },
    {
        "category": "keyboard",
        "keywords": [
            "keyboard",
            "keycaps",
            "typing"
        ],
        "lines": [
            "the spacebar is carrying the sentence.",
            "the escape key understands the assignment.",
            "the keycaps have become a decorating budget."
        ]
    },
    {
        "category": "mouse",
        "keywords": [
            "computer mouse",
            "mousepad",
            "cursor"
        ],
        "lines": [
            "the cursor has wandered off with confidence.",
            "the scroll wheel has seen the entire internet.",
            "the double click had dramatic timing."
        ]
    },
    {
        "category": "headphones",
        "keywords": [
            "headphones",
            "earbuds",
            "headset"
        ],
        "lines": [
            "one earbud has chosen independence.",
            "the volume slider needs diplomacy.",
            "the cable has tied itself into a side quest."
        ]
    },
    {
        "category": "screenshots",
        "keywords": [
            "screenshot",
            "screenshots",
            "screen capture"
        ],
        "lines": [
            "the screenshot has preserved the evidence.",
            "the crop tool is doing reputation management.",
            "the desktop icons have become background lore."
        ]
    },
    {
        "category": "archives",
        "keywords": [
            "archive",
            "backup",
            "save file"
        ],
        "lines": [
            "the backup is the quiet hero of the story.",
            "the file name final-final has lost credibility.",
            "the archive contains several past personalities."
        ]
    },
    {
        "category": "rubberDuck",
        "keywords": [
            "rubber duck",
            "duck debugging"
        ],
        "lines": [
            "the duck has listened without interrupting.",
            "explain the bug to the tiny plastic consultant.",
            "the duck's hourly rate is extremely reasonable."
        ]
    },
    {
        "category": "rubberChicken",
        "keywords": [
            "rubber chicken",
            "squeaky chicken"
        ],
        "lines": [
            "the chicken has one argument and it is loud.",
            "professional squeak consultation available.",
            "the meeting has become poultry powered."
        ]
    },
    {
        "category": "bananas",
        "keywords": [
            "banana",
            "bananas"
        ],
        "lines": [
            "the banana has built-in packaging.",
            "the peel is a cartoon hazard with history.",
            "the fruit bowl has a curved yellow spokesperson."
        ]
    },
    {
        "category": "potatoes",
        "keywords": [
            "potato",
            "potatoes"
        ],
        "lines": [
            "the potato has remarkable career flexibility.",
            "fries. mash. chips. an impressive résumé.",
            "the humble spud is carrying dinner again."
        ]
    },
    {
        "category": "garlicBread",
        "keywords": [
            "garlic bread",
            "garlicbread"
        ],
        "lines": [
            "the bread has reached its final form.",
            "the vampire has left the dinner party.",
            "this side dish has main-character credentials."
        ]
    },
    {
        "category": "pineapplePizza",
        "keywords": [
            "pineapple pizza",
            "pineapple on pizza"
        ],
        "lines": [
            "the pizza debate has reopened its courtroom.",
            "the topping has diplomatic consequences.",
            "the pineapple arrived knowing the controversy."
        ]
    },
    {
        "category": "backrooms",
        "keywords": [
            "backrooms",
            "liminal space"
        ],
        "lines": [
            "the wallpaper has unsettling confidence.",
            "the fluorescent lights are doing ominous overtime.",
            "the exit sign appears to be a suggestion."
        ]
    },
    {
        "category": "liminalPools",
        "keywords": [
            "poolrooms",
            "liminal pool"
        ],
        "lines": [
            "the pool has no opening hours and too much echo.",
            "the tiles are suspiciously consistent.",
            "the water is calm. the vibes are not."
        ]
    },
    {
        "category": "sleepParalysis",
        "keywords": [
            "sleep paralysis demon",
            "bedroom demon"
        ],
        "lines": [
            "the imaginary demon needs an appointment.",
            "the corner silhouette has poor social skills.",
            "the spooky coat rack has been exposed."
        ]
    },
    {
        "category": "cryptids",
        "keywords": [
            "cryptid",
            "bigfoot",
            "mothman"
        ],
        "lines": [
            "the cryptid photograph has seventeen pixels.",
            "bigfoot has an excellent privacy policy.",
            "the moth has upgraded its entire brand."
        ]
    },
    {
        "category": "goblins",
        "keywords": [
            "goblin",
            "goblins",
            "goblin mode"
        ],
        "lines": [
            "the shiny object has been acquired.",
            "the goblin committee requests snack funding.",
            "tiny gremlin energy has reached operational capacity."
        ]
    },
    {
        "category": "gremlins",
        "keywords": [
            "gremlin",
            "gremlins"
        ],
        "lines": [
            "the cables were organized before this creature arrived.",
            "the gremlin has found the settings menu.",
            "the midnight snack policy requires clarification."
        ]
    },
    {
        "category": "wizardFrogs",
        "keywords": [
            "wizard frog",
            "frog wizard"
        ],
        "lines": [
            "the spell concludes with a dignified ribbit.",
            "the pond now has a magic department.",
            "the tiny hat contains enormous academic authority."
        ]
    },
    {
        "category": "cosmicGeese",
        "keywords": [
            "cosmic goose",
            "space goose"
        ],
        "lines": [
            "the honk has crossed the event horizon.",
            "the galaxy belongs to an unusually assertive goose.",
            "no planet is safe from this level of pond confidence."
        ]
    },
    {
        "category": "sentientToaster",
        "keywords": [
            "sentient toaster",
            "toaster uprising"
        ],
        "lines": [
            "the toaster has submitted workplace demands.",
            "the bread slot has become a political platform.",
            "the uprising starts after breakfast."
        ]
    },
    {
        "category": "fridgeLore",
        "keywords": [
            "fridge lore",
            "fridge light"
        ],
        "lines": [
            "the light knows every midnight snack.",
            "the fridge has an extensive cold case archive.",
            "the leftovers have developed a backstory."
        ]
    },
    {
        "category": "forbiddenSoup",
        "keywords": [
            "forbidden soup",
            "soup dimension"
        ],
        "lines": [
            "the ladle has opened a portal.",
            "the soup has exceeded its recommended lore content.",
            "the broth is looking back respectfully."
        ]
    },
    {
        "category": "chairCouncil",
        "keywords": [
            "chair council",
            "council of chairs"
        ],
        "lines": [
            "the seating arrangement has reached a verdict.",
            "the swivel chair holds the deciding vote.",
            "the council requests better lumbar support."
        ]
    },
    {
        "category": "tinyCouncil",
        "keywords": [
            "tiny council",
            "miniature council"
        ],
        "lines": [
            "the tiny gavel has made a tiny decision.",
            "the council meets inside a bottle cap.",
            "the minutes are written in very small handwriting."
        ]
    },
    {
        "category": "beanLore",
        "keywords": [
            "bean lore",
            "cosmic bean"
        ],
        "lines": [
            "the bean contains an unreasonable amount of history.",
            "the prophecy was written on a can.",
            "the bean council has sprouted new evidence."
        ]
    },
    {
        "category": "secretDoor",
        "keywords": [
            "secret door",
            "hidden door"
        ],
        "lines": [
            "the wall has developed an interesting seam.",
            "the bookshelf is acting like it knows something.",
            "the door requires a suspiciously specific sound effect."
        ]
    },
    {
        "category": "inventoryFull",
        "keywords": [
            "inventory full",
            "bag full"
        ],
        "lines": [
            "the rock collection has blocked critical supplies.",
            "one slot remains and everything is sentimental.",
            "the inventory wants you to make difficult life choices."
        ]
    },
    {
        "category": "dialogueTree",
        "keywords": [
            "dialogue tree",
            "npc dialogue"
        ],
        "lines": [
            "the third option is always suspiciously specific.",
            "the npc has repeated this line with remarkable patience.",
            "the dialogue wheel has no option for my actual question."
        ]
    },
    {
        "category": "savePoint",
        "keywords": [
            "save point",
            "savepoint"
        ],
        "lines": [
            "the glowing object understands my priorities.",
            "progress recorded. anxiety slightly reduced.",
            "the checkpoint has a reassuring amount of sparkle."
        ]
    },
    {
        "category": "credits",
        "keywords": [
            "end credits",
            "roll credits"
        ],
        "lines": [
            "the credits include the person who moved that one chair.",
            "the soundtrack has earned its final applause.",
            "please remain seated for the tiny post-credit joke."
        ]
    },
    {
        "category": "postCredits",
        "keywords": [
            "post credits",
            "post credit scene"
        ],
        "lines": [
            "the sequel hook has entered quietly.",
            "the villain's glove has moved one centimeter.",
            "the credits were a decoy. there is more lore."
        ]
    },
    {
        "category": "newGamePlus",
        "keywords": [
            "new game plus",
            "ng plus"
        ],
        "lines": [
            "same adventure. substantially more baggage.",
            "the tutorial has no idea what i am carrying.",
            "the starter enemy is about to meet my résumé."
        ]
    },
    {
        "category": "secretEnding",
        "keywords": [
            "secret ending",
            "true ending"
        ],
        "lines": [
            "you collected the unnecessarily specific objects.",
            "the hidden door has finally acknowledged your effort.",
            "the ending has bonus emotional paperwork."
        ]
    },
    {
        "category": "developerRoom",
        "keywords": [
            "developer room",
            "dev room"
        ],
        "lines": [
            "the unfinished cube has historical significance.",
            "the test npc knows every version of the story.",
            "the wall texture is labeled temporary with confidence."
        ]
    },
    {
        "category": "placeholder",
        "keywords": [
            "placeholder",
            "lorem ipsum"
        ],
        "lines": [
            "the temporary text has become a permanent resident.",
            "the square labeled thing has shipped.",
            "the final asset is allegedly on its way."
        ]
    },
    {
        "category": "easterEggHunt",
        "keywords": [
            "easter egg",
            "easter eggs",
            "hidden reference"
        ],
        "lines": [
            "the suspicious detail is probably suspicious.",
            "you have found the department of unnecessary secrets.",
            "the background object has been waiting for this moment."
        ]
    }
];
const dialogueOpeners = [
    "well.",
    "okay.",
    "alright.",
    "honestly.",
    "apparently.",
    "somehow.",
    "meanwhile.",
    "for the record.",
    "quick update.",
    "small development.",
    "new information.",
    "status report.",
    "plot update.",
    "breaking news.",
    "in today's episode.",
    "current situation.",
    "upon further inspection.",
    "after careful consideration.",
    "the council reports.",
    "the archives confirm.",
    "the plot continues.",
    "the lore expands.",
    "a brief observation.",
    "an important footnote.",
    "according to the vibes.",
    "from my corner of the internet.",
    "between us.",
    "just so you know.",
    "i checked the imaginary clipboard.",
    "the results are in.",
    "after extensive staring.",
    "let the record show.",
    "the tiny committee agrees.",
    "i have consulted the ceiling.",
    "the imaginary narrator says.",
    "in a surprising turn of events.",
    "as the pixels settle.",
    "the keyboard has spoken.",
    "the background music changes.",
    "the camera zooms in.",
    "the side quest continues.",
    "the notification arrives.",
    "a small announcement.",
    "the curtain rises.",
    "the report just landed.",
    "the universe clears its throat.",
    "the next chapter begins.",
    "my current assessment.",
    "the imaginary dashboard says.",
    "a wild observation appears.",
    "the thought bubble reads.",
    "the narrator pauses.",
    "the room goes quiet.",
    "the plot takes a small turn.",
    "the clipboard has an update.",
    "the evidence suggests this.",
    "the tiny spotlight switches on.",
    "we interrupt this scrolling.",
    "the unofficial verdict arrives.",
    "the scene resumes.",
    "the update nobody requested.",
    "a message from the observation desk.",
    "the chat log gains another entry.",
    "the tiny drumroll concludes."
];
const dialogueClosers = [
    "i will be accepting no follow-up questions.",
    "the paperwork is pending.",
    "please imagine a dramatic pause.",
    "the council will remember this.",
    "more research is allegedly required.",
    "the soundtrack is doing its best.",
    "this has been an extremely unofficial report.",
    "i have updated the imaginary clipboard.",
    "please hold your tiny applause.",
    "the plot remains unsupervised.",
    "someone should write this down.",
    "the camera has stopped zooming.",
    "the credits are not ready yet.",
    "we are calling this progress.",
    "a small plot twist may follow.",
    "the background npc approves.",
    "no further lore is available at this time.",
    "the narrator needs a water break.",
    "the tiny committee has adjourned.",
    "that concludes the field report.",
    "the group chat can take it from here.",
    "i have several decorative concerns.",
    "the imaginary chart points vaguely upward.",
    "the evidence has been placed in a little folder.",
    "the suspense budget is nearly empty.",
    "the situation remains interesting.",
    "please allow one business shrug.",
    "the footnotes have become self aware.",
    "the director has requested another take.",
    "a tiny achievement sound plays.",
    "i am filing this under developments.",
    "the scene fades to a slightly different scene.",
    "that is today's contribution to the lore.",
    "the ceiling has offered no objections.",
    "the tiny gavel has spoken.",
    "the transcript will look strange tomorrow.",
    "the vibe inspection continues.",
    "we may need a larger clipboard.",
    "the imaginary camera cuts away.",
    "the observation desk is taking a break.",
    "the side characters have opinions.",
    "the jury consists entirely of rubber ducks.",
    "please picture a thoughtful nod.",
    "a tasteful amount of confetti is implied.",
    "the chat remains operational.",
    "the tiny spotlight switches off.",
    "the narrator turns the page.",
    "the next message has big shoes to fill.",
    "this deserves a small bookmark.",
    "the imaginary filing cabinet is full.",
    "that is all the pixels would tell me.",
    "the background music returns to normal.",
    "the report ends with a tiny flourish.",
    "there is probably a lesson somewhere.",
    "i have underlined the important bit mentally.",
    "the mystery retains some mystery.",
    "we return you to your regularly scheduled scrolling.",
    "the room resumes its normal level of chaos.",
    "the tiny printer has produced a receipt.",
    "the official stamp is actually a potato.",
    "the end card needs better lighting.",
    "another entry for the extremely informal archives.",
    "the conversation has gained one experience point.",
    "the imaginary microphone is now yours."
];

const recentResponses = new Map();
const MAX_RECENT_CATEGORIES = 512;

function normalizeDialogue(input) {
    return String(input ?? '').normalize('NFKC').toLowerCase()
        .replace(/[’‘]/g, "'")
        .replace(/<@!?\d+>|<@&\d+>/g, ' ')
        .replace(/[^\p{L}\p{N}' ]/gu, ' ')
        .replace(/\s+/g, ' ').trim();
}

const topicByKeyword = new Map();
let longestKeyword = 1;
for (const topic of dialogueTopics) {
    replies[topic.category] = topic.lines;
    for (const keyword of topic.keywords) {
        const normalized = normalizeDialogue(keyword);
        if (!topicByKeyword.has(normalized)) topicByKeyword.set(normalized, topic.category);
        longestKeyword = Math.max(longestKeyword, normalized.split(' ').length);
    }
}

const dialogueEasterEggs = [
    { category: "egg_konami", regex: /\bup[ ,]+up[ ,]+down[ ,]+down[ ,]+left[ ,]+right[ ,]+left[ ,]+right[ ,]+b[ ,]+a\b/i, lines: ["secret unlocked: thirty imaginary lives. please spend them irresponsibly in a platformer.", "the cheat-code department recognizes your credentials."] },
    { category: "egg_answer42", regex: /\b(?:42|answer to (?:life|everything))\b/i, lines: ["42. the question is still loading.", "the cosmic calculator has returned a suspiciously specific number."] },
    { category: "egg_cakeLie", regex: /\bthe cake is a lie\b/i, lines: ["the dessert department has been placed under investigation.", "the cake has declined to provide proof of existence."] },
    { category: "egg_bigShot", regex: /\b(?:big shot|hyperlink blocked)\b/i, lines: ["you have unlocked a suspiciously enthusiastic sales pitch.", "the tiny salesman has detected a premium opportunity."] },
    { category: "egg_determination", regex: /\b(?:stay determined|fills you with determination)\b/i, lines: ["the little save light glows a bit brighter.", "the retry button believes in you."] },
    { category: "egg_arrowKnee", regex: /\barrow (?:in|to) the knee\b/i, lines: ["the guard has begun the familiar story. everyone settle in.", "the adventuring career has encountered a very specific obstacle."] },
    { category: "egg_rickroll", regex: /\b(?:rickroll|rick roll|never gonna give you up)\b/i, lines: ["the link was a musical trap. the dance was unavoidable.", "you have activated the suspicious-link choreography protocol."] },
    { category: "egg_helloThere", regex: /^hello there[!.?]*$/i, lines: ["general conversationalist. you are a bold one.", "the greeting has triggered a suspiciously cinematic response."] },
    { category: "egg_highGround", regex: /\bhigh ground\b/i, lines: ["the elevation advantage has been officially acknowledged.", "the slope has entered the tactical discussion."] },
    { category: "egg_thisIsFine", regex: /\bthis is fine\b/i, lines: ["the imaginary dog has requested a less flammable office.", "the coffee remains calm under extremely questionable circumstances."] },
    { category: "egg_xyzzy", regex: /\b(?:xyzzy|plugh)\b/i, lines: ["a hollow voice says: secret found.", "nothing happens. but it happens with historical significance."] },
    { category: "egg_sudo", regex: /^sudo\b/i, lines: ["permission granted to imagine having permission.", "the terminal has put on a tiny administrator hat."] },
    { category: "egg_rosebud", regex: /\b(?:rosebud|motherlode)\b/i, lines: ["the imaginary household funds have increased by absolutely no real currency.", "the pretend budget has received a cheat-code stimulus."] },
    { category: "egg_missingno", regex: /\bmissingno\b/i, lines: ["the sprite has misplaced several important pixels.", "the inventory count looks historically suspicious."] },
    { category: "egg_herobrine", regex: /\bherobrine\b/i, lines: ["the patch notes insist he was removed. again.", "the fog has refused to explain the silhouette."] },
    { category: "egg_bidoof", regex: /\bbidoof\b/i, lines: ["the true final boss has arrived politely.", "all rise for the extremely round legend."] },
    { category: "egg_goosePassword", regex: /^honk honk$/i, lines: ["access granted. welcome to the goose council.", "the secret pond door slides open."] },
    { category: "egg_duckPassword", regex: /^quack quack quack$/i, lines: ["triple quack authenticated. the ducks acknowledge you.", "the pond vault opens by approximately one duck width."] },
    { category: "egg_beansPassword", regex: /^beans$/i, lines: ["the ancient bean has awakened.", "achievement unlocked: bean witness."] },
    { category: "egg_secretAdmin", regex: /^open sesame[!.]*$/i, lines: ["the imaginary door opens onto another slightly smaller door.", "secret room unlocked: one chair and an unreasonable amount of lore."] },
    { category: "egg_matrix", regex: /\b(?:red pill|blue pill|there is no spoon)\b/i, lines: ["the spoon has become a philosophical problem.", "the simulation would like to schedule maintenance."] },
    { category: "egg_susNumber", regex: /\b1337\b/i, lines: ["the old internet has recognized your numeric credentials.", "retro keyboard wizard mode has been politely acknowledged."] },
    { category: "egg_rollInitiative", regex: /\broll initiative\b/i, lines: ["the furniture suddenly looks like a battle map.", "the background music has become turn based."] },
    { category: "egg_bossMusic", regex: /\bwhy (?:do i|can i) hear boss music\b/i, lines: ["the health bar is still unfolding. give it a moment.", "the doorway has sealed with narrative intent."] },
    { category: "egg_secretMenu", regex: /^secret menu[!?]*$/i, lines: ["secret menu: cosmic goose, forbidden soup, chair council, wizard frog, bean lore. order carefully.", "try honk honk, xyzzy, open sesame, or the old up-up-down-down routine."] },
    { category: "egg_petBot", regex: /\b(?:pat pat|pet the bot|headpat)\b/i, lines: ["tiny robotic purring noises. please do not tell the maintenance team.", "affection received. the imaginary status light turns pink."] },
    { category: "egg_achievementHunter", regex: /^inspect (?:the )?wall$/i, lines: ["you found a tiny plaque: yes, we knew someone would check here.", "a single pixel winks back. achievement unlocked: wall enthusiast."] },
    { category: "egg_recursive", regex: /\b(?:recursion|recursive)\b/i, lines: ["to understand this response, first understand this response.", "the footnote refers you back to the footnote."] },
    { category: "egg_binaryHello", regex: /\b01001000\s+01101001\b/i, lines: ["hi. the binary greeting has been decoded.", "two bytes of friendliness received."] },
    { category: "egg_developerSecret", regex: /^there is no secret$/i, lines: ["exactly what someone standing on the secret trapdoor would say.", "the secret has put on a fake mustache."] },
];

function chooseDialogue(category, lines, decorate = true) {
    const previous = recentResponses.get(category);
    let baseIndex = Math.floor(Math.random() * lines.length);
    if (lines.length > 1 && baseIndex === previous?.baseIndex) {
        baseIndex = (baseIndex + 1 + Math.floor(Math.random() * (lines.length - 1))) % lines.length;
    }
    let response = lines[baseIndex];
    if (decorate && Math.random() < 0.65) {
        response = `${getRandom(dialogueOpeners)} ${response} ${getRandom(dialogueClosers)}`;
    }
    recentResponses.delete(category);
    recentResponses.set(category, { baseIndex });
    if (recentResponses.size > MAX_RECENT_CATEGORIES) {
        recentResponses.delete(recentResponses.keys().next().value);
    }
    return response;
}

function getResponse(input) {
    const raw = String(input ?? '').trim().slice(0, 4000);
    if (!raw) return chooseDialogue('random', replies.random);
    for (const egg of dialogueEasterEggs) {
        if (egg.regex.test(raw)) return chooseDialogue(egg.category, egg.lines, false);
    }
    const text = normalizeDialogue(raw);
    const words = text.split(' ');
    for (let size = Math.min(longestKeyword, words.length); size >= 1; size--) {
        for (let start = 0; start <= words.length - size; start++) {
            const category = topicByKeyword.get(words.slice(start, start + size).join(' '));
            if (category) return chooseDialogue(category, replies[category]);
        }
    }
    for (const trigger of triggers) {
        if (trigger.regex.test(text)) return chooseDialogue(trigger.category, replies[trigger.category]);
    }
    return chooseDialogue('random', replies.random);
}


// PING ESCALATION SYSTEM

const pingChains = new Map();
const PING_CHAIN_TTL = 10 * 60 * 1000;
const MAX_PING_CHAIN_ENTRIES = 10000;

const angryReplies = [
    "bro... i literally just asked why you pinged me 😭",
    "again??? what do you want now",
    "you're replying to me asking why you pinged me. do you see the problem",
    "BRO STOP. I'M TRYING TO BE PATIENT HERE.",
    "this is your final warning. stop poking me."
];

function prunePingChains() {
    const now = Date.now();

    for (const [messageId, chain] of pingChains) {
        if (chain.expiresAt <= now) {
            pingChains.delete(messageId);
        }
    }

    while (pingChains.size > MAX_PING_CHAIN_ENTRIES) {
        const oldestKey = pingChains.keys().next().value;
        pingChains.delete(oldestKey);
    }
}

async function sendPingComplaint(message) {
    const sent = await message.reply({
        content: '...bro why did you ping me?'
    });

    pingChains.set(sent.id, {
        userId: message.author.id,
        guildId: message.guild.id,
        count: 0,
        expiresAt: Date.now() + PING_CHAIN_TTL
    });
}

async function handlePingChainReply(message) {
    const repliedToId = message.reference?.messageId;

    if (!repliedToId) return false;

    prunePingChains();

    const chain = pingChains.get(repliedToId);

    if (!chain) return false;

    // Only the original user can continue this chain.
    if (
        message.author.id !== chain.userId ||
        message.guild.id !== chain.guildId
    ) {
        return false;
    }

    chain.count++;
    chain.expiresAt = Date.now() + PING_CHAIN_TTL;

    // Sixth reply: timeout.
    if (chain.count >= 6) {
        await message.reply({
            content: "ok bro you deserved it. 5 minute timeout."
        });

        // Remove every message belonging to this chain.
        for (const [messageId, savedChain] of pingChains) {
            if (savedChain === chain) {
                pingChains.delete(messageId);
            }
        }

        try {
            const member = await message.guild.members.fetch(
                message.author.id
            );

            if (member.moderatable) {
                await member.timeout(
                    5 * 60 * 1000,
                    'Repeatedly continued a ping-reply chain after warnings.'
                );
            } else {
                console.warn(
                    `Could not timeout ${message.author.tag}: member is not moderatable.`
                );
            }
        } catch (error) {
            console.error(
                'Failed to apply the 5-minute ping-chain timeout:',
                error
            );
        }

        return true;
    }

    // Send the next increasingly angry response.
    const sent = await message.reply({
        content: angryReplies[chain.count - 1]
    });

    // Register this reply too, allowing the user to reply to it.
    pingChains.set(sent.id, chain);

    return true;
}


module.exports = {
    name: 'messageCreate',

    async execute(message, client) {
        if (message.author.bot || !message.guild) return;

        // Handle an existing ping-reply chain first.
        if (await handlePingChainReply(message)) return;

        const botMember = message.guild.members.me;
        if (!botMember) return;

        const botRolePinged = message.mentions.roles.some(role =>
            botMember.roles.cache.has(role.id)
        );

        const botPinged =
            message.mentions.users.has(client.user.id) ||
            message.mentionEveryone ||
            botRolePinged;

        if (!botPinged) return;

        // Special user: original response.
        if (message.author.id === SPECIAL_USER_ID) {
            return message.reply({
                content: 'oh hi daddy thanks for waking me up'
            });
        }

        // Role and everyone pings.
        if (message.mentionEveryone || botRolePinged) {
            return sendPingComplaint(message);
        }

        // Bot mention must be at the beginning.
        const mentionRegex = new RegExp(
            `^<@!?${client.user.id}>\\s*(.*)$`,
            's'
        );

        const match = message.content.match(mentionRegex);

        // Bare bot ping starts an escalation chain.
        if (!match || !match[1].trim()) {
            return sendPingComplaint(message);
        }

        // Normal bot mentions get random scripted responses.
        return message.reply({
            content: getResponse(match[1])
        });
    }
};

