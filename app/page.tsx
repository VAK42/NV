import VideoFeed from "@/components/VideoFeed";
import { videos } from "@/data/videos";
export default function Home() {
  return <VideoFeed videos={videos} />;
}