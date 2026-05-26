"use client";
import { useState, type FormEvent } from "react";
import { CircleUserRound, SendHorizontal, X } from "lucide-react";
import type { VideoComment, VideoPost } from "../data/videos";
type CommentsPanelProps = {
  isDark: boolean;
  username: string;
  video: VideoPost;
  comments: VideoComment[];
  onClose: () => void;
  onSubmit: (message: string) => void;
};
export default function CommentsPanel({ isDark, username, video, comments, onClose, onSubmit }: CommentsPanelProps) {
  const [message, setMessage] = useState("");
  const submitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = message.trim();
    if (!text) {
      return;
    }
    onSubmit(text);
    setMessage("");
  };
  return (
    <div className="fixed inset-0 z-40 flex items-end bg-black/45 lg:items-stretch lg:justify-end" onClick={onClose}>
      <section onClick={(event) => event.stopPropagation()} className={`flex h-[66dvh] w-full flex-col rounded border-t lg:h-full lg:w-[390px] lg:border-l lg:border-t-0 ${isDark ? "border-zinc-700 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-950"}`}>
        <header className={`flex items-center justify-between border-b px-5 py-4 ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>
          <div>
            <h2 className="text-base font-medium">Comments</h2>
            <p className="text-xs text-zinc-500">{video.commentsCount + comments.length - video.comments.length} Conversations</p>
          </div>
          <button type="button" onClick={onClose} className={`rounded border p-2 ${isDark ? "border-zinc-700 hover:bg-zinc-900" : "border-zinc-200 hover:bg-zinc-100"}`} aria-label="Close Comments">
            <X size={18} />
          </button>
        </header>
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          {comments.map((comment) => (
            <article key={comment.id} className="flex gap-3">
              <CircleUserRound size={27} strokeWidth={1.3} className={`shrink-0 ${isDark ? "text-white" : "text-green-950"}`} />
              <div className="min-w-0">
                <p className="text-xs text-zinc-500">@{comment.authorName} <span className="ml-2">{comment.createdAt}</span></p>
                <p className="mt-1 text-sm leading-6">{comment.message}</p>
              </div>
            </article>
          ))}
        </div>
        <form onSubmit={submitComment} className={`flex items-center gap-3 border-t p-4 ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>
          <CircleUserRound size={27} strokeWidth={1.3} className={`shrink-0 ${isDark ? "text-white" : "text-green-950"}`} aria-label={`Comment As ${username}`} />
          <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder={`Comment As @${username}`} className={`h-11 min-w-0 flex-1 rounded border bg-transparent px-3 text-sm outline-none ${isDark ? "border-zinc-700 focus:border-white" : "border-zinc-300 focus:border-green-950"}`} />
          <button type="submit" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded border ${isDark ? "border-zinc-700 text-white hover:bg-zinc-900" : "border-green-950 text-green-950 hover:bg-zinc-100"}`} aria-label="Post Comment">
            <SendHorizontal size={18} />
          </button>
        </form>
      </section>
    </div>
  )
}