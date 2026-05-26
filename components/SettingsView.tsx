import { Eye, Heart, MessageCircle, MoonStar, Share2, Sun, type LucideIcon } from "lucide-react";
import type { VideoPost } from "@/data/videos";
type SettingsViewProps = {
  isDark: boolean;
  onThemeChange: (isDark: boolean) => void;
  viewedVideos: VideoPost[];
  likedVideos: VideoPost[];
  commentedVideos: VideoPost[];
  sharedVideos: VideoPost[];
  onOpenVideo: (id: number) => void;
};
type HistoryListProps = {
  title: string;
  emptyText: string;
  videos: VideoPost[];
  icon: LucideIcon;
  isDark: boolean;
  onOpenVideo: (id: number) => void;
};
function HistoryList({ title, emptyText, videos, icon: Icon, isDark, onOpenVideo }: HistoryListProps) {
  return (
    <section className={`rounded border p-5 ${isDark ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-white"}`}>
      <h2 className="mb-4 flex items-center gap-2 text-sm font-medium"><Icon size={18} strokeWidth={1.6} /> {title}</h2>
      {videos.length === 0 && <p className="text-sm text-zinc-500">{emptyText}</p>}
      <div className="space-y-3">
        {videos.map((video) => (
          <button key={video.id} type="button" onClick={() => onOpenVideo(video.id)} className={`flex w-full items-center gap-3 rounded border p-2 text-left transition-colors ${isDark ? "border-zinc-800 hover:border-zinc-600" : "border-zinc-200 hover:border-green-950"}`}>
            <video src={video.videoUrl} muted playsInline preload="metadata" className="h-12 w-10 rounded object-cover" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{video.description}</p>
              <p className="text-xs text-zinc-500">Open Video By @{video.authorName.toLowerCase().replaceAll(" ", "")}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
export default function SettingsView({ isDark, onThemeChange, viewedVideos, likedVideos, commentedVideos, sharedVideos, onOpenVideo }: SettingsViewProps) {
  return (
    <main className="h-dvh overflow-y-auto px-5 pb-24 pt-20 lg:ml-60 lg:px-12 lg:pb-10 lg:pt-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-medium">Settings</h1>
        <p className="mt-2 text-sm text-zinc-500">Appearance & Session Activity</p>
        <section className={`mt-7 rounded border p-5 ${isDark ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-white"}`}>
          <h2 className="mb-4 text-base font-medium">Appearance</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => onThemeChange(false)} className={`flex items-center gap-3 rounded border p-4 text-sm ${!isDark ? "border-green-950 text-green-950" : "border-zinc-700 text-zinc-400"}`}>
              <Sun size={19} strokeWidth={1.6} />
              <span className="font-medium">Light Mode</span>
            </button>
            <button type="button" onClick={() => onThemeChange(true)} className={`flex items-center gap-3 rounded border p-4 text-sm ${isDark ? "border-white text-white" : "border-zinc-200 text-zinc-500"}`}>
              <MoonStar size={19} strokeWidth={1.6} />
              <span className="font-medium">Dark Mode</span>
            </button>
          </div>
        </section>
        <h2 className="mb-4 mt-8 text-lg font-medium">Activity History</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <HistoryList title="Watched Videos" emptyText="No Viewed Videos In This Session" videos={viewedVideos} icon={Eye} isDark={isDark} onOpenVideo={onOpenVideo} />
          <HistoryList title="Liked Videos" emptyText="No Liked Videos In This Session" videos={likedVideos} icon={Heart} isDark={isDark} onOpenVideo={onOpenVideo} />
          <HistoryList title="Commented Videos" emptyText="No Commented Videos In This Session" videos={commentedVideos} icon={MessageCircle} isDark={isDark} onOpenVideo={onOpenVideo} />
          <HistoryList title="Shared Links" emptyText="No Shared Links In This Session" videos={sharedVideos} icon={Share2} isDark={isDark} onOpenVideo={onOpenVideo} />
        </div>
      </div>
    </main>
  )
}