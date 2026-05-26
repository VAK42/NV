"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bell, CircleUserRound, Search, X } from "lucide-react";
import type { VideoComment, VideoPost } from "../data/videos";
import CommentsPanel from "./CommentsPanel";
import Navigation, { type AppView } from "./Navigation";
import NotificationsPanel, { type SessionNotification } from "./NotificationsPanel";
import ProfileView, { type ProfileData } from "./ProfileView";
import SettingsView from "./SettingsView";
import VideoCard from "./VideoCard";
type VideoFeedProps = {
  videos: VideoPost[];
};
const initialProfile: ProfileData = {
  displayName: "Vu Anh Kiet",
  username: "vak.1412",
  bio: "IT Enthusiast",
  location: "Ha Noi"
};
export default function VideoFeed({ videos }: VideoFeedProps) {
  const [activeView, setActiveView] = useState<AppView>("home");
  const [isDark, setIsDark] = useState(true);
  const [profile, setProfile] = useState(initialProfile);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [viewedIds, setViewedIds] = useState<number[]>([]);
  const [commentedIds, setCommentedIds] = useState<number[]>([]);
  const [sharedIds, setSharedIds] = useState<number[]>([]);
  const viewedIdsRef = useRef<number[]>([]);
  const [targetVideoId, setTargetVideoId] = useState<number | null>(null);
  const [activeCommentsId, setActiveCommentsId] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<SessionNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [comments, setComments] = useState<Record<number, VideoComment[]>>(() => Object.fromEntries(videos.map((video) => [video.id, video.comments])));
  const searchTerm = searchQuery.trim().toLowerCase();
  const filteredVideos = useMemo(() => videos.filter((video) => !searchTerm || `${video.authorName} ${video.description}`.toLowerCase().includes(searchTerm)), [searchTerm, videos]);
  const activeCommentsVideo = videos.find((video) => video.id === activeCommentsId);
  const getVideos = (ids: number[]) => ids.map((id) => videos.find((video) => video.id === id)).filter((video): video is VideoPost => Boolean(video));
  const likedVideos = useMemo(() => getVideos(likedIds), [likedIds, videos]);
  const viewedVideos = useMemo(() => getVideos(viewedIds), [viewedIds, videos]);
  const commentedVideos = useMemo(() => getVideos(commentedIds), [commentedIds, videos]);
  const sharedVideos = useMemo(() => getVideos(sharedIds), [sharedIds, videos]);
  useEffect(() => {
    if (!toast) {
      return;
    }
    const timeout = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);
  useEffect(() => {
    const id = Number(new URLSearchParams(window.location.search).get("video"));
    if (videos.some((video) => video.id === id)) {
      setTargetVideoId(id);
    }
  }, [videos]);
  useEffect(() => {
    if (!targetVideoId || (activeView !== "home" && activeView !== "discover")) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(`video-${targetVideoId}`)?.scrollIntoView({ behavior: "smooth" });
      setTargetVideoId(null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeView, filteredVideos, targetVideoId]);
  const addNotification = useCallback((id: number, action: string) => {
    const video = videos.find((item) => item.id === id);
    if (!video) {
      return;
    }
    setNotifications((current) => [{ id: Date.now() + current.length, videoId: id, message: `${action} ${video.authorName}'s Video` }, ...current]);
    setUnreadCount((current) => current + 1);
  }, [videos]);
  const markViewed = useCallback((id: number) => {
    if (viewedIdsRef.current.includes(id)) {
      return;
    }
    viewedIdsRef.current = [id, ...viewedIdsRef.current];
    setViewedIds(viewedIdsRef.current);
  }, []);
  const openVideo = (id: number) => {
    window.history.replaceState(null, "", `/?video=${id}`);
    setSearchQuery("");
    setTargetVideoId(id);
    setIsNotificationsOpen(false);
    setActiveView("home");
  };
  const toggleLike = (id: number) => {
    const isLiked = likedIds.includes(id);
    setLikedIds((current) => current.includes(id) ? current.filter((value) => value !== id) : [id, ...current]);
    if (!isLiked) {
      addNotification(id, "You Liked");
    }
  };
  const addComment = (id: number, message: string) => {
    const nextComment = { id: Date.now(), authorName: profile.username, message, createdAt: "Now" };
    setComments((current) => ({ ...current, [id]: [...current[id], nextComment] }));
    setCommentedIds((current) => current.includes(id) ? current : [id, ...current]);
    addNotification(id, "You Commented On");
  };
  const shareVideo = async (id: number) => {
    const link = `${window.location.origin}/?video=${id}`;
    try {
      await navigator.clipboard.writeText(link);
      setSharedIds((current) => current.includes(id) ? current : [id, ...current]);
      setToast("Link Copied To Clipboard");
    } catch {
      setToast("Clipboard Is Unavailable");
    }
  };
  const showFeed = activeView === "home" || activeView === "discover";
  return (
    <div className={`h-dvh transition-colors ${isDark ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-950"}`}>
      <Navigation isDark={isDark} activeView={activeView} onNavigate={(view) => { setActiveView(view); setIsNotificationsOpen(false); }} onLogOut={() => undefined} />
      {showFeed && (
        <div className="flex h-dvh flex-col pt-14 lg:ml-60 lg:pt-0">
          <header className={`relative shrink-0 border-b px-4 py-3 lg:px-6 ${isDark ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-zinc-50"}`}>
            <div className="mr-24 max-w-sm lg:mx-auto">
              <label className={`flex w-full items-center gap-2 rounded border px-4 py-3 ${isDark ? "border-zinc-700 bg-zinc-900 text-white" : "border-green-950 bg-white text-green-950"}`}>
                <Search size={18} />
                <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder={activeView === "discover" ? "Discover Videos" : "Search Videos"} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500" />
                {searchQuery && <button type="button" onClick={() => setSearchQuery("")} aria-label="Clear Search"><X size={17} /></button>}
              </label>
            </div>
            <div className="absolute right-4 top-3 flex gap-2 lg:right-6">
              <button type="button" onClick={() => { setIsNotificationsOpen((value) => !value); setUnreadCount(0); }} className={`relative rounded border p-3 ${isDark ? "border-zinc-700 bg-zinc-900 text-white" : "border-green-950 bg-white text-green-950"}`} aria-label="Open Notifications">
                <Bell size={20} strokeWidth={1.5} />
                {unreadCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded bg-green-950 px-1 text-[10px] text-white">{unreadCount}</span>}
              </button>
              <button type="button" onClick={() => { setActiveView("profile"); setIsNotificationsOpen(false); }} className={`rounded border p-3 ${isDark ? "border-zinc-700 bg-zinc-900 text-white" : "border-green-950 bg-white text-green-950"}`} aria-label="Open Profile">
                <CircleUserRound size={20} strokeWidth={1.4} />
              </button>
            </div>
            {isNotificationsOpen && <NotificationsPanel isDark={isDark} notifications={notifications} onClose={() => setIsNotificationsOpen(false)} onOpenVideo={openVideo} />}
          </header>
          <main className="min-h-0 flex-1 snap-y snap-mandatory overflow-y-auto overscroll-y-contain scroll-smooth">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} isLiked={likedIds.includes(video.id)} commentsCount={video.commentsCount + comments[video.id].length - video.comments.length} onViewed={markViewed} onLike={() => toggleLike(video.id)} onOpenComments={() => setActiveCommentsId(video.id)} onShare={() => void shareVideo(video.id)} />
            ))}
            {filteredVideos.length === 0 && <div className="flex h-full items-center justify-center text-sm text-zinc-500">No Videos Match Your Search</div>}
          </main>
        </div>
      )}
      {activeView === "profile" && <ProfileView isDark={isDark} profile={profile} onSave={setProfile} likedVideos={likedVideos} viewedVideos={viewedVideos} onOpenVideo={openVideo} />}
      {activeView === "settings" && <SettingsView isDark={isDark} onThemeChange={setIsDark} viewedVideos={viewedVideos} likedVideos={likedVideos} commentedVideos={commentedVideos} sharedVideos={sharedVideos} onOpenVideo={openVideo} />}
      {activeCommentsVideo && <CommentsPanel isDark={isDark} username={profile.username} video={activeCommentsVideo} comments={comments[activeCommentsVideo.id]} onClose={() => setActiveCommentsId(null)} onSubmit={(message) => addComment(activeCommentsVideo.id, message)} />}
      {toast && <p className={`fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded border px-4 py-3 text-sm lg:bottom-8 ${isDark ? "border-zinc-700 bg-zinc-900 text-white" : "border-green-950 bg-white text-green-950"}`}>{toast}</p>}
    </div>
  )
}