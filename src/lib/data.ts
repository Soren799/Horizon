export type Track = {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover: string;
};

export const tracks: Track[] = [
  {
    id: 1,
    title: "Is There Someone Else",
    artist: "The Weeknd",
    src: "/music/Is There Someone Else_ - The Weeknd.mp3",
    cover: "/covers/cover-1.jpg",
  },
  {
    id: 2,
    title: "Popular",
    artist: "The Weeknd, Playboi Carti, Madonna",
    src: "/music/Popular (Music from the HBO Original Series) - The Weeknd、Playboi Carti、Madonna.mp3",
    cover: "/covers/cover-2.jpg",
  },
  {
    id: 3,
    title: "Blinding Lights",
    artist: "The Weeknd",
    src: "/music/Blinding Lights - The Weeknd.mp3",
    cover: "/covers/cover-3.jpg",
  },
  {
    id: 4,
    title: "Call You Tonight",
    artist: "Whitney Houston",
    src: "/music/Call You Tonight - Whitney Houston.mp3",
    cover: "/covers/cover-4.jpg",
  },
  {
    id: 5,
    title: "Come Around Me",
    artist: "Justin Bieber",
    src: "/music/Come Around Me - Justin Bieber.mp3",
    cover: "/covers/cover-5.jpg",
  },
  {
    id: 6,
    title: "Fallin' Out",
    artist: "Keyshia Cole",
    src: "/music/Fallin' Out - Keyshia Cole.mp3",
    cover: "/covers/cover-6.jpg",
  },
  {
    id: 7,
    title: "HEARTBREAK ANNIVERSARY",
    artist: "GIVĒON",
    src: "/music/HEARTBREAK ANNIVERSARY - GIVēON.mp3",
    cover: "/covers/cover-7.jpg",
  },
  {
    id: 8,
    title: "If I Ain't Got You",
    artist: "Alicia Keys",
    src: "/music/If I Ain't Got You - Alicia Keys.mp3",
    cover: "/covers/cover-8.jpg",
  },
  {
    id: 9,
    title: "Lonely",
    artist: "Nana",
    src: "/music/Lonely - Nana.mp3",
    cover: "/covers/cover-9.jpg",
  },
  {
    id: 10,
    title: "Love",
    artist: "Keyshia Cole",
    src: "/music/Love - Keyshia Cole.mp3",
    cover: "/covers/cover-10.jpg",
  },
  {
    id: 11,
    title: "One Of The Girls",
    artist: "The Weeknd, JENNIE, Lily-Rose Depp",
    src: "/music/One Of The Girls - The Weeknd、JENNIE、Lily-Rose Depp.mp3",
    cover: "/covers/cover-11.jpg",
  },
  {
    id: 12,
    title: "Only One",
    artist: "Kanye West, Paul McCartney",
    src: "/music/Only One - Kanye West、Paul McCartney.mp3",
    cover: "/covers/cover-12.jpg",
  },
  {
    id: 13,
    title: "Out of Time",
    artist: "The Weeknd",
    src: "/music/Out of Time - The Weeknd.mp3",
    cover: "/covers/cover-13.jpg",
  },
  {
    id: 14,
    title: "Pull Up",
    artist: "Luh Kel",
    src: "/music/Pull Up - Luh Kel.mp3",
    cover: "/covers/cover-14.jpg",
  },
  {
    id: 15,
    title: "Reminder",
    artist: "The Weeknd",
    src: "/music/Reminder - The Weeknd.mp3",
    cover: "/covers/cover-15.jpg",
  },
  {
    id: 16,
    title: "Secrets",
    artist: "The Weeknd",
    src: "/music/Secrets - The Weeknd.mp3",
    cover: "/covers/cover-16.jpg",
  },
  {
    id: 17,
    title: "Sunflower",
    artist: "Post Malone, Swae Lee",
    src: "/music/Sunflower - Post Malone、Swae Lee.mp3",
    cover: "/covers/cover-17.jpg",
  },
];

export type Work = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  url?: string;
};

export const works: Work[] = [
  { id: 1, title: "空岛火力", description: "三路防守休闲射击 · 竖屏 H5 小游戏", tags: ["H5", "游戏"], url: "/island-shooter/" },
  { id: 2, title: "敬请期待", description: "这里将展示未来的作品。", tags: ["待定"] },
  { id: 3, title: "敬请期待", description: "这里将展示未来的作品。", tags: ["待定"] },
  { id: 4, title: "敬请期待", description: "这里将展示未来的作品。", tags: ["待定"] },
  { id: 5, title: "敬请期待", description: "这里将展示未来的作品。", tags: ["待定"] },
  { id: 6, title: "敬请期待", description: "这里将展示未来的作品。", tags: ["待定"] },
];
