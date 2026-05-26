"use client";
import { useState, type FormEvent } from "react";
import { CircleUserRound, Eye, Heart, Pencil, X } from "lucide-react";
import type { VideoPost } from "../data/videos";
export type ProfileData = {
  displayName: string;
  username: string;
  bio: string;
  location: string;
};
type ProfileViewProps = {
  isDark: boolean;
  profile: ProfileData;
  onSave: (profile: ProfileData) => void;
  likedVideos: VideoPost[];
  viewedVideos: VideoPost[];
  onOpenVideo: (id: number) => void;
};
type ActivityGridProps = {
  title: string;
  icon: typeof Heart;
  emptyText: string;
  videos: VideoPost[];
  isDark: boolean;
  onOpenVideo: (id: number) => void;
};
function ActivityGrid({ title, icon: Icon, emptyText, videos, isDark, onOpenVideo }: ActivityGridProps) {
  return (
    <section className="mx-auto mt-8 max-w-4xl">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-medium"><Icon size={18} strokeWidth={1.5} /> {title}</h2>
      {videos.length === 0 && <div className={`rounded border px-5 py-8 text-center text-sm text-zinc-500 ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>{emptyText}</div>}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {videos.map((video) => (
          <button key={video.id} type="button" onClick={() => onOpenVideo(video.id)} className={`overflow-hidden rounded border text-left transition-colors ${isDark ? "border-zinc-800 hover:border-zinc-600" : "border-zinc-200 hover:border-green-950"}`}>
            <video src={video.videoUrl} muted playsInline preload="metadata" className="aspect-[3/4] w-full object-cover" />
            <p className="truncate px-3 pt-2 text-xs font-medium">{video.description}</p>
            <p className="truncate px-3 pb-3 pt-1 text-xs text-zinc-500">View Video</p>
          </button>
        ))}
      </div>
    </section>
  );
}
export default function ProfileView({ isDark, profile, onSave, likedVideos, viewedVideos, onOpenVideo }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const openEditor = () => {
    setDraft(profile);
    setIsEditing(true);
  };
  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({ ...draft, username: draft.username.replace(/^@/, "") });
    setIsEditing(false);
  };
  return (
    <main className="h-dvh overflow-y-auto px-5 pb-24 pt-20 lg:ml-60 lg:px-12 lg:pb-10 lg:pt-10">
      <section className={`mx-auto max-w-4xl rounded border p-6 ${isDark ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-white"}`}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <CircleUserRound size={58} strokeWidth={1.15} className={isDark ? "text-white" : "text-green-950"} />
          <div className="flex-1">
            <h1 className="text-2xl font-medium">{profile.displayName}</h1>
            <p className={isDark ? "text-zinc-400" : "text-zinc-500"}>@{profile.username}</p>
            <p className="mt-3 max-w-lg text-sm leading-6">{profile.bio}</p>
            <p className="text-sm text-zinc-500">{profile.location}</p>
          </div>
          <button type="button" onClick={openEditor} className={`flex items-center gap-2 rounded border px-5 py-3 text-sm font-medium ${isDark ? "border-zinc-600 text-white" : "border-green-950 text-green-950"}`}><Pencil size={16} strokeWidth={1.5} /> Edit Profile</button>
        </div>
        <div className={`mt-7 grid grid-cols-3 border-t pt-5 text-center ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>
          <p><span className="block text-xl font-medium">0</span><span className="text-xs text-zinc-500">Posts</span></p>
          <p><span className="block text-xl font-medium">0</span><span className="text-xs text-zinc-500">Followers</span></p>
          <p><span className="block text-xl font-medium">0</span><span className="text-xs text-zinc-500">Following</span></p>
        </div>
      </section>
      <section className="mx-auto mt-8 max-w-4xl">
        <h2 className="mb-4 text-lg font-medium">My Posts</h2>
        <div className={`rounded border px-5 py-8 text-center text-sm text-zinc-500 ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>No Posts Yet</div>
      </section>
      <ActivityGrid title="Recently Watched" icon={Eye} emptyText="Watch A Feed Video To See It Here" videos={viewedVideos} isDark={isDark} onOpenVideo={onOpenVideo} />
      <ActivityGrid title="Liked Videos" icon={Heart} emptyText="No Liked Videos In This Session" videos={likedVideos} isDark={isDark} onOpenVideo={onOpenVideo} />
      {isEditing && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-5" onClick={() => setIsEditing(false)}>
          <form onSubmit={saveProfile} onClick={(event) => event.stopPropagation()} className={`w-full max-w-md rounded border p-5 ${isDark ? "border-zinc-700 bg-zinc-950" : "border-zinc-200 bg-white"}`}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-medium">Edit Profile</h2>
              <button type="button" onClick={() => setIsEditing(false)} className="rounded border p-2" aria-label="Close Editor"><X size={17} /></button>
            </div>
            <label className="mb-4 block text-sm">Display Name<input value={draft.displayName} onChange={(event) => setDraft({ ...draft, displayName: event.target.value })} className={`mt-2 block w-full rounded border bg-transparent px-3 py-3 outline-none ${isDark ? "border-zinc-700" : "border-zinc-300"}`} /></label>
            <label className="mb-4 block text-sm">Username<input value={draft.username} onChange={(event) => setDraft({ ...draft, username: event.target.value })} className={`mt-2 block w-full rounded border bg-transparent px-3 py-3 outline-none ${isDark ? "border-zinc-700" : "border-zinc-300"}`} /></label>
            <label className="mb-4 block text-sm">Bio<textarea value={draft.bio} onChange={(event) => setDraft({ ...draft, bio: event.target.value })} rows={3} className={`mt-2 block w-full rounded border bg-transparent px-3 py-3 outline-none ${isDark ? "border-zinc-700" : "border-zinc-300"}`} /></label>
            <label className="mb-5 block text-sm">Location<input value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} className={`mt-2 block w-full rounded border bg-transparent px-3 py-3 outline-none ${isDark ? "border-zinc-700" : "border-zinc-300"}`} /></label>
            <button type="submit" className={`w-full rounded border py-3 text-sm font-medium ${isDark ? "border-white text-white" : "border-green-950 text-green-950"}`}>Save Profile</button>
          </form>
        </div>
      )}
    </main>
  )
}