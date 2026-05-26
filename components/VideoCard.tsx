"use client";
import { useEffect, useRef, useState } from "react";
import { CircleUserRound, Heart, MessageCircle, Play, Share2, Volume2, VolumeX } from "lucide-react";
import type { VideoPost } from "../data/videos";
type VideoCardProps = {
  video: VideoPost;
  isLiked: boolean;
  commentsCount: number;
  onViewed: (id: number) => void;
  onLike: () => void;
  onOpenComments: () => void;
  onShare: () => void;
};
function formatCount(value: number) {
  if (value < 1000) {
    return String(value);
  }
  return `${(value / 1000).toFixed(value < 10000 ? 1 : 0)}K`;
}
export default function VideoCard({ video, isLiked, commentsCount, onViewed, onLike, onOpenComments, onShare }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  useEffect(() => {
    const player = videoRef.current;
    if (!player) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
        onViewed(video.id);
        void player.play().catch(() => setIsPlaying(false));
      } else {
        player.pause();
      }
    }, { threshold: [0, 0.7, 1] });
    observer.observe(player);
    return () => observer.disconnect();
  }, [onViewed, video.id]);
  const togglePlayback = () => {
    const player = videoRef.current;
    if (!player) {
      return;
    }
    if (player.paused) {
      void player.play().catch(() => setIsPlaying(false));
      return;
    }
    player.pause();
  };
  const toggleSound = () => {
    const player = videoRef.current;
    if (!player) {
      return;
    }
    player.muted = !player.muted;
    setIsMuted(player.muted);
  };
  const likes = video.likesCount + (isLiked ? 1 : 0);
  return (
    <section id={`video-${video.id}`} className="flex h-full snap-start items-center justify-center lg:px-6 lg:py-4">
      <div className="relative h-full w-full overflow-hidden bg-black lg:aspect-[9/16] lg:h-full lg:w-auto lg:rounded">
        <video ref={videoRef} src={video.videoUrl} muted loop playsInline preload="metadata" onClick={togglePlayback} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} className="h-full w-full cursor-pointer object-cover" aria-label={`Video By ${video.authorName}`} />
        {!isPlaying && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="rounded bg-black/60 p-5 text-white backdrop-blur">
              <Play size={34} fill="currentColor" />
            </span>
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute bottom-20 left-5 right-20 text-white lg:bottom-6">
          <div className="mb-3 flex items-center gap-2">
            <CircleUserRound size={28} className="text-white" />
            <p className="text-sm font-medium">@{video.authorName.toLowerCase().replaceAll(" ", "")}</p>
          </div>
          <p className="max-w-64 text-sm leading-6 text-white">{video.description}</p>
        </div>
        <aside className="absolute bottom-20 right-4 flex flex-col gap-5 text-white lg:bottom-6">
          <button type="button" onClick={onLike} className={`flex flex-col items-center gap-1 transition-colors ${isLiked ? "text-rose-500" : "hover:text-rose-400"}`} aria-label={isLiked ? "Unlike Video" : "Like Video"}>
            <span className="rounded bg-black/55 p-3 backdrop-blur">
              <Heart size={25} fill={isLiked ? "currentColor" : "none"} />
            </span>
            <span className="text-xs font-medium">{formatCount(likes)}</span>
          </button>
          <button type="button" onClick={onOpenComments} className="flex flex-col items-center gap-1 hover:text-zinc-300" aria-label="View Comments">
            <span className="rounded bg-black/55 p-3 backdrop-blur">
              <MessageCircle size={25} />
            </span>
            <span className="text-xs font-medium">{formatCount(commentsCount)}</span>
          </button>
          <button type="button" onClick={onShare} className="flex flex-col items-center gap-1 hover:text-zinc-300" aria-label="Copy Video Link">
            <span className="rounded bg-black/55 p-3 backdrop-blur">
              <Share2 size={25} />
            </span>
            <span className="text-xs font-medium">Share</span>
          </button>
          <button type="button" onClick={toggleSound} className="rounded bg-black/55 p-3 backdrop-blur hover:text-zinc-300" aria-label={isMuted ? "Unmute Video" : "Mute Video"}>
            {isMuted ? <VolumeX size={23} /> : <Volume2 size={23} />}
          </button>
        </aside>
      </div>
    </section>
  )
}