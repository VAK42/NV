export type VideoPost = {
  id: number;
  videoUrl: string;
  authorName: string;
  description: string;
  likesCount: number;
  commentsCount: number;
  comments: VideoComment[];
};
export type VideoComment = {
  id: number;
  authorName: string;
  message: string;
  createdAt: string;
};
export const videos: VideoPost[] = [
  {
    id: 1,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "Nguyen Van A",
    description: "A Quiet Afternoon, Framed One Moment At A Time!",
    likesCount: 12840,
    commentsCount: 198,
    comments: [
      { id: 11, authorName: "linh.nguyen", message: "The Timing Of This Shot Is So Clean!", createdAt: "2h" },
      { id: 12, authorName: "minh.nguyen", message: "Saved This Mood For My Weekend Playlist!", createdAt: "5h" }
    ]
  },
  {
    id: 2,
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "Nguyen Van B",
    description: "Friday Light Makes Every Route Feel New!",
    likesCount: 9630,
    commentsCount: 126,
    comments: [
      { id: 21, authorName: "lan.nguyen", message: "This Feels Like A Perfect Reset!", createdAt: "1h" },
      { id: 22, authorName: "thao.nguyen", message: "The Colors Look Amazing Here!", createdAt: "8h" }
    ]
  },
  {
    id: 3,
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    authorName: "Nguyen Van C",
    description: "Every Journey Begins With A Scene Worth Replaying!",
    likesCount: 24510,
    commentsCount: 442,
    comments: [
      { id: 31, authorName: "huy.nguyen", message: "This Deserves A Full Screen Replay!", createdAt: "4h" },
      { id: 32, authorName: "mai.nguyen", message: "The Atmosphere Is Incredible!", createdAt: "9h" }
    ]
  }
]