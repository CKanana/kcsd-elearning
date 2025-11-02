import type { EbookChapter } from './types';

export const EBOOK_CHAPTERS: EbookChapter[] = [
  {
    id: 1,
    title: 'Chapter 1: Meeting the Farm Animals',
    theme: 'Introduction to Animals and Their Signs',
    goal: 'Learn the signs for common farm animals and practice counting.',
    badge: 'Farm Explorer Badge',
    summary: [
      'Learned signs for Cow, Sheep, and Chicken.',
      'Practiced counting up to three.',
      'Identified animals by their sounds.',
    ],
    pages: [
      {
        id: 101,
        pageNumber: 1,
        icon: '🐮',
        title: 'The Friendly Cow',
        childText: [
          'Look! A big, friendly cow. It has black and white spots.',
          'The cow says, "Mooooo!" Can you make that sound?',
        ],
        activityPrompt: [
          'Point to the cow on the screen.',
          'Try to make the sign for COW. It looks like a "Y" handshape at your forehead.',
        ],
        signNotes: [
          'Sign for COW: "Y" handshape, thumb on forehead, twist wrist.',
        ],
      },
      {
        id: 102,
        pageNumber: 2,
        icon: '🐑',
        title: 'The Woolly Sheep',
        childText: [
          'Here are two fluffy sheep. Their wool is so soft!',
          'They say, "Baaaaa!"',
        ],
        activityPrompt: [
          'How many sheep do you see? Let\'s count them: One, two!',
          'Practice the sign for SHEEP. It looks like you are shearing wool from your arm.',
        ],
        interactiveElement: [
          'Tap the sheep to hear them "Baaaaa!"',
        ],
        signNotes: [
          'Sign for SHEEP: Non-dominant arm is held out. Dominant hand "shears" the wool off the arm twice.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Chapter 2: Colors of the Rainbow',
    theme: 'Exploring Colors',
    goal: 'Learn the signs for RED, YELLOW, and BLUE.',
    badge: 'Rainbow Artist Badge',
    summary: [
      'Learned signs for RED, YELLOW, and BLUE.',
      'Identified objects with these colors.',
      'Completed a color-matching game.',
    ],
    pages: [
      {
        id: 201,
        pageNumber: 1,
        icon: '🍓',
        title: 'The Color RED',
        childText: [
          'This is a juicy, red strawberry. Red is a bright and happy color!',
          'Can you find something red in your room?',
        ],
        activityPrompt: [
          'Practice the sign for RED. Touch your chin with your index finger and brush downwards.',
        ],
        signNotes: [
          'Sign for RED: Index finger touches lips and moves down.',
        ],
      },
      {
        id: 202,
        pageNumber: 2,
        icon: '☀️',
        title: 'The Color YELLOW',
        childText: [
          'The sun is bright yellow! It keeps us warm.',
          'Yellow is the color of happy feelings.',
        ],
        interactiveElement: [
          'Tap the sun to make it shine brighter!',
        ],
        signNotes: [
          'Sign for YELLOW: Make a "Y" handshape and shake it.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Chapter 3: My Family',
    theme: 'Family Signs',
    goal: 'Learn the signs for MOM, DAD, and SIBLING.',
    badge: 'Family Friend Badge',
    summary: [
      'Learned signs for MOM, DAD, and SIBLING.',
      'Talked about family members.',
      'Shared about our own families.',
    ],
    pages: [
      {
        id: 301,
        pageNumber: 1,
        icon: '👩',
        title: 'Meet Mom',
        childText: [
          'This is Mom. She loves you very much!',
          'Can you give your mom a big hug today?',
        ],
        activityPrompt: [
          'Practice the sign for MOM. Spread your fingers and tap your thumb to your chin.',
        ],
        signNotes: [
          'Sign for MOM: Open hand, thumb taps chin.',
        ],
      },
      {
        id: 302,
        pageNumber: 2,
        icon: '👨',
        title: 'Meet Dad',
        childText: [
          'This is Dad. He likes to play games with you!',
        ],
        activityPrompt: [
          'Practice the sign for DAD. Spread your fingers and tap your thumb to your forehead.',
        ],
        signNotes: [
          'Sign for DAD: Open hand, thumb taps forehead.',
        ],
      },
      {
        id: 303,
        pageNumber: 3,
        icon: '🧒',
        title: 'Meet My Sibling',
        childText: [
          'This is your sibling. Siblings are brothers or sisters.',
        ],
        activityPrompt: [
          'Practice the sign for SIBLING. Make the sign for brother or sister.',
        ],
        signNotes: [
          'Sign for SIBLING: Index fingers tap together.',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Chapter 4: At School',
    theme: 'School Signs',
    goal: 'Learn the signs for SCHOOL, TEACHER, and FRIEND.',
    badge: 'School Star Badge',
    summary: [
      'Learned signs for SCHOOL, TEACHER, and FRIEND.',
      'Talked about what we do at school.',
      'Shared about our favorite school activities.',
    ],
    pages: [
      {
        id: 401,
        pageNumber: 1,
        icon: '🏫',
        title: 'Our School',
        childText: [
          'This is our school. We learn and play here!',
        ],
        activityPrompt: [
          'Practice the sign for SCHOOL. Clap your hands together twice.',
        ],
        signNotes: [
          'Sign for SCHOOL: Flat hands clap together.',
        ],
      },
      {
        id: 402,
        pageNumber: 2,
        icon: '🧑‍🏫',
        title: 'The Teacher',
        childText: [
          'This is the teacher. Teachers help us learn new things.',
        ],
        activityPrompt: [
          'Practice the sign for TEACHER. Make flat hands at your forehead and move them forward.',
        ],
        signNotes: [
          'Sign for TEACHER: Flat hands move from forehead outward.',
        ],
      },
      {
        id: 403,
        pageNumber: 3,
        icon: '🤝',
        title: 'My Friend',
        childText: [
          'This is your friend. Friends play and help each other.',
        ],
        activityPrompt: [
          'Practice the sign for FRIEND. Hook your index fingers together.',
        ],
        signNotes: [
          'Sign for FRIEND: Index fingers hook together.',
        ],
      },
    ],
  },
];