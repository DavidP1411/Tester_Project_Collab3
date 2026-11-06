export const GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
];

export const GENRE_MAP = GENRES.reduce((acc, g) => {
  acc[g.id] = g.name;
  return acc;
}, {});

export const FALLBACK_MOVIES = [
  {
    id: 693134,
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.",
    release_date: "2024-02-27",
    vote_average: 8.4,
    vote_count: 5420,
    runtime: 167,
    genre_ids: [878, 12, 28],
    poster_path: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    trailerKey: "Way9Dexny3w",
    director: "Denis Villeneuve",
    cast: [
      { id: 1, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: "https://image.tmdb.org/t/p/w185/BE2sdjpgsa2rNTFa66f7upkaOP.jpg" },
      { id: 2, name: "Zendaya", character: "Chani", profile_path: "https://image.tmdb.org/t/p/w185/3WdOloHpjtjL96uVOhFRRCcYSwq.jpg" },
      { id: 3, name: "Rebecca Ferguson", character: "Lady Jessica", profile_path: "https://image.tmdb.org/t/p/w185/lJloTOheuQSirSLXNA3JHsrMNfH.jpg" },
      { id: 4, name: "Javier Bardem", character: "Stilgar", profile_path: "https://image.tmdb.org/t/p/w185/eCBiiPvBfIY7exDQwH0vEM6Bf3c.jpg" },
      { id: 5, name: "Austin Butler", character: "Feyd-Rautha", profile_path: "https://image.tmdb.org/t/p/w185/rU32N4fbm6I5bfU35k27H7tP72D.jpg" }
    ]
  },
  {
    id: 872585,
    title: "Oppenheimer",
    tagline: "The world forever changes.",
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II, exploring the moral complexities, scientific breakthroughs, and political fallout that reshaped human history.",
    release_date: "2023-07-19",
    vote_average: 8.6,
    vote_count: 8910,
    runtime: 181,
    genre_ids: [18, 53],
    poster_path: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    trailerKey: "uYPbbksJxIg",
    director: "Christopher Nolan",
    cast: [
      { id: 11, name: "Cillian Murphy", character: "J. Robert Oppenheimer", profile_path: "https://image.tmdb.org/t/p/w185/dm6V24JJJVKB7syz9L6K8v7hA9I.jpg" },
      { id: 12, name: "Emily Blunt", character: "Kitty Oppenheimer", profile_path: "https://image.tmdb.org/t/p/w185/5nCSG5TL1bP1geD8aaBfaLnLLCD.jpg" },
      { id: 13, name: "Matt Damon", character: "Leslie Groves", profile_path: "https://image.tmdb.org/t/p/w185/At3JgvaNeEN4Z4ESKlhhes85Xo3.jpg" },
      { id: 14, name: "Robert Downey Jr.", character: "Lewis Strauss", profile_path: "https://image.tmdb.org/t/p/w185/im9SAqJPZKEbVZGmjXuLI4O7RvM.jpg" }
    ]
  },
  {
    id: 569094,
    title: "Spider-Man: Across the Spider-Verse",
    tagline: "It's how you wear the mask that matters.",
    overview: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse's very existence.",
    release_date: "2023-05-31",
    vote_average: 8.7,
    vote_count: 6820,
    runtime: 140,
    genre_ids: [16, 28, 12, 878],
    poster_path: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    trailerKey: "shW9i6k8cB0",
    director: "Joaquim Dos Santos",
    cast: [
      { id: 21, name: "Shameik Moore", character: "Miles Morales (voice)", profile_path: "https://image.tmdb.org/t/p/w185/uJNaSTsfBOvtFWsPP23zNthknsB.jpg" },
      { id: 22, name: "Hailee Steinfeld", character: "Gwen Stacy (voice)", profile_path: "https://image.tmdb.org/t/p/w185/dxSDWkiVaC6JYjrV3XRAZI7HOSS.jpg" },
      { id: 23, name: "Oscar Isaac", character: "Miguel O'Hara (voice)", profile_path: "https://image.tmdb.org/t/p/w185/dW5U5yrIIPmMjRThR9KT2xH6nTz.jpg" }
    ]
  },
  {
    id: 157336,
    title: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    release_date: "2014-11-05",
    vote_average: 8.7,
    vote_count: 35100,
    runtime: 169,
    genre_ids: [12, 18, 878],
    poster_path: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    trailerKey: "zSWdZVtXT7E",
    director: "Christopher Nolan",
    cast: [
      { id: 31, name: "Matthew McConaughey", character: "Cooper", profile_path: "https://image.tmdb.org/t/p/w185/e9ZHRY5toiBZCIPEEyvOG9A8ers.jpg" },
      { id: 32, name: "Anne Hathaway", character: "Brand", profile_path: "https://image.tmdb.org/t/p/w185/s6tflSD20MGz04ZR2R1lZvhmC4Y.jpg" },
      { id: 33, name: "Jessica Chastain", character: "Murph", profile_path: "https://image.tmdb.org/t/p/w185/bXFXy557232E3A4hD1wAE3dJq6z.jpg" }
    ]
  },
  {
    id: 414906,
    title: "The Batman",
    tagline: "Unmask the truth.",
    overview: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    release_date: "2022-03-01",
    vote_average: 7.8,
    vote_count: 10200,
    runtime: 176,
    genre_ids: [80, 9648, 53, 28],
    poster_path: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    trailerKey: "mqqft2x_Aa4",
    director: "Matt Reeves",
    cast: [
      { id: 41, name: "Robert Pattinson", character: "Bruce Wayne / The Batman", profile_path: "https://image.tmdb.org/t/p/w185/6RVx9N98NrxU2P0vBSkQ2810t2e.jpg" },
      { id: 42, name: "Zoë Kravitz", character: "Selina Kyle / Catwoman", profile_path: "https://image.tmdb.org/t/p/w185/tiQ7a42c6tC62T4b6c6137i0F2J.jpg" },
      { id: 43, name: "Paul Dano", character: "Edward Nashton / The Riddler", profile_path: "https://image.tmdb.org/t/p/w185/t2fE7qP6pD1n1wG3K5D9kO3aG9Y.jpg" }
    ]
  },
  {
    id: 545611,
    title: "Everything Everywhere All at Once",
    tagline: "The universe is so much bigger than you realize.",
    overview: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what's important to her by connecting with the lives she could have led in other universes.",
    release_date: "2022-03-24",
    vote_average: 7.9,
    vote_count: 6410,
    runtime: 139,
    genre_ids: [28, 12, 878, 35],
    poster_path: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg",
    trailerKey: "wxN1T1uxQ2g",
    director: "Daniel Kwan & Daniel Scheinert",
    cast: [
      { id: 51, name: "Michelle Yeoh", character: "Evelyn Wang", profile_path: "https://image.tmdb.org/t/p/w185/nrbHNzSMydpWK9um5VqWIFJihB5.jpg" },
      { id: 52, name: "Ke Huy Quan", character: "Waymond Wang", profile_path: "https://image.tmdb.org/t/p/w185/5PfYVcNLs1gGKIo0qwJrvyc2UOZ.jpg" },
      { id: 53, name: "Stephanie Hsu", character: "Joy Wang / Jobu Tupaki", profile_path: "https://image.tmdb.org/t/p/w185/8m3p1l5A9Y4e8b7C8X5J6A7E2D4.jpg" }
    ]
  },
  {
    id: 496243,
    title: "Parasite",
    tagline: "Act like you own the place.",
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    release_date: "2019-05-30",
    vote_average: 8.5,
    vote_count: 18120,
    runtime: 133,
    genre_ids: [35, 53, 18],
    poster_path: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    trailerKey: "5xH0HfJHsaY",
    director: "Bong Joon-ho",
    cast: [
      { id: 61, name: "Song Kang-ho", character: "Kim Ki-taek", profile_path: "https://image.tmdb.org/t/p/w185/7Y2kdcqH8B8T5R6S4g2H7K9L0M1.jpg" },
      { id: 62, name: "Lee Sun-kyun", character: "Park Dong-ik", profile_path: "https://image.tmdb.org/t/p/w185/c2F5A8H9K0L2N4P6Q8R0S2T4U6V.jpg" },
      { id: 63, name: "Cho Yeo-jeong", character: "Choi Yeon-gyo", profile_path: "https://image.tmdb.org/t/p/w185/d3E5G7H9J1K3L5M7N9P1Q3R5S7T.jpg" }
    ]
  },
  {
    id: 335984,
    title: "Blade Runner 2049",
    tagline: "The key to the future is finally unearthed.",
    overview: "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.",
    release_date: "2017-10-04",
    vote_average: 7.6,
    vote_count: 13490,
    runtime: 164,
    genre_ids: [878, 18, 9648],
    poster_path: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/ilRyazdMJwN05exqhwK4tMKBYZs.jpg",
    trailerKey: "gCcx85zbxz4",
    director: "Denis Villeneuve",
    cast: [
      { id: 71, name: "Ryan Gosling", character: "K", profile_path: "https://image.tmdb.org/t/p/w185/lyUyVARQKhGxaxy0FbPJCQRpiaW.jpg" },
      { id: 72, name: "Harrison Ford", character: "Rick Deckard", profile_path: "https://image.tmdb.org/t/p/w185/zVnHagUvXkR2StdOtquEwsiwSVt.jpg" },
      { id: 73, name: "Ana de Armas", character: "Joi", profile_path: "https://image.tmdb.org/t/p/w185/3vxvsmYLTf4jnr163SUlBIw51ee.jpg" }
    ]
  },
  {
    id: 792307,
    title: "Poor Things",
    tagline: "She's like nothing you've ever seen.",
    overview: "Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.",
    release_date: "2023-12-07",
    vote_average: 7.8,
    vote_count: 3910,
    runtime: 141,
    genre_ids: [878, 10749, 35],
    poster_path: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg",
    trailerKey: "RlbR5N6veqw",
    director: "Yorgos Lanthimos",
    cast: [
      { id: 81, name: "Emma Stone", character: "Bella Baxter", profile_path: "https://image.tmdb.org/t/p/w185/3UaYw9S6fG2W5s8c9A2K4E6R8T0.jpg" },
      { id: 82, name: "Mark Ruffalo", character: "Duncan Wedderburn", profile_path: "https://image.tmdb.org/t/p/w185/z3dvKqMNDQWk3QLxzumloQVR0pv.jpg" },
      { id: 83, name: "Willem Dafoe", character: "Dr. Godwin Baxter", profile_path: "https://image.tmdb.org/t/p/w185/ui8e4sgZAwMPi3hzEO53jyBJF9B.jpg" }
    ]
  },
  {
    id: 1022789,
    title: "Inside Out 2",
    tagline: "Make room for new emotions.",
    overview: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who've long been running a successful operation by all accounts, aren't sure how to feel when Anxiety shows up.",
    release_date: "2024-06-11",
    vote_average: 7.7,
    vote_count: 4210,
    runtime: 96,
    genre_ids: [16, 10751, 12, 35],
    poster_path: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
    trailerKey: "LEjhY15eCx0",
    director: "Kelsey Mann",
    cast: [
      { id: 91, name: "Amy Poehler", character: "Joy (voice)", profile_path: "https://image.tmdb.org/t/p/w185/rwmvRonpluV6dCPiQissYrchvSD.jpg" },
      { id: 92, name: "Maya Hawke", character: "Anxiety (voice)", profile_path: "https://image.tmdb.org/t/p/w185/ab3F9I8N7K6L5M4P3Q2R1S0T9U8.jpg" }
    ]
  },
  {
    id: 27205,
    title: "Inception",
    tagline: "Your mind is the scene of the crime.",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: 'inception', the implantation of another person's idea into a target's subconscious.",
    release_date: "2010-07-15",
    vote_average: 8.4,
    vote_count: 36000,
    runtime: 148,
    genre_ids: [28, 878, 12],
    poster_path: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    trailerKey: "YoHD9XEInc0",
    director: "Christopher Nolan",
    cast: [
      { id: 101, name: "Leonardo DiCaprio", character: "Dom Cobb", profile_path: "https://image.tmdb.org/t/p/w185/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg" },
      { id: 102, name: "Joseph Gordon-Levitt", character: "Arthur", profile_path: "https://image.tmdb.org/t/p/w185/4U9G4YwTlIEbAymBaseltS38eH4.jpg" },
      { id: 103, name: "Cillian Murphy", character: "Robert Fischer", profile_path: "https://image.tmdb.org/t/p/w185/dm6V24JJJVKB7syz9L6K8v7hA9I.jpg" }
    ]
  },
  {
    id: 940721,
    title: "Godzilla Minus One",
    tagline: "Postwar Japan. From zero to minus.",
    overview: "In postwar Japan, a new terror rises. Will the devastated people be able to survive... let alone fight back?",
    release_date: "2023-11-03",
    vote_average: 8.1,
    vote_count: 2350,
    runtime: 125,
    genre_ids: [878, 27, 28],
    poster_path: "https://image.tmdb.org/t/p/w500/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/fY3lD0jM5AoHJMunjGWqJ0hRteI.jpg",
    trailerKey: "r7DqccP1Q_4",
    director: "Takashi Yamazaki",
    cast: [
      { id: 111, name: "Ryunosuke Kamiki", character: "Koichi Shikishima", profile_path: "https://image.tmdb.org/t/p/w185/p2K9L8M7N6P5Q4R3S2T1U0V9W8X.jpg" },
      { id: 112, name: "Minami Hamabe", character: "Noriko Oishi", profile_path: "https://image.tmdb.org/t/p/w185/q1W2E3R4T5Y6U7I8O9P0A1S2D3F.jpg" }
    ]
  }
];

export const INITIAL_REVIEWS = {
  693134: [
    {
      id: 'rev-1',
      author: 'Alex Rivera',
      rating: 5,
      date: '2026-10-14',
      comment: 'An absolute triumph of sci-fi filmmaking. The sound design and desert cinematography are unmatched.'
    },
    {
      id: 'rev-2',
      author: 'Elena Vance',
      rating: 5,
      date: '2026-10-20',
      comment: 'Austin Butler as Feyd-Rautha stole every scene he was in. Can’t wait for Messiah!'
    }
  ],
  872585: [
    {
      id: 'rev-3',
      author: 'Marcus Chen',
      rating: 5,
      date: '2026-09-28',
      comment: 'A three-hour biographical drama that feels like a high-stakes thriller. Ludwig Göransson’s score is phenomenal.'
    }
  ]
};
