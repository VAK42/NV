import { Bell, X } from "lucide-react";
export type SessionNotification = {
  id: number;
  videoId: number;
  message: string;
};
type NotificationsPanelProps = {
  isDark: boolean;
  notifications: SessionNotification[];
  onClose: () => void;
  onOpenVideo: (id: number) => void;
};
export default function NotificationsPanel({ isDark, notifications, onClose, onOpenVideo }: NotificationsPanelProps) {
  return (
    <section className={`absolute right-4 top-[76px] z-30 w-[min(calc(100vw-2rem),360px)] rounded border p-4 shadow-xl lg:right-6 ${isDark ? "border-zinc-700 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-950"}`}>
      <header className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-medium"><Bell size={17} strokeWidth={1.5} /> Notifications</h2>
        <button type="button" onClick={onClose} className="rounded border p-2" aria-label="Close Notifications"><X size={15} /></button>
      </header>
      {notifications.length === 0 && <p className="py-6 text-center text-sm text-zinc-500">No Notifications Yet</p>}
      <div className="space-y-2">
        {notifications.map((notification) => (
          <button key={notification.id} type="button" onClick={() => onOpenVideo(notification.videoId)} className={`w-full rounded border p-3 text-left text-sm transition-colors ${isDark ? "border-zinc-800 hover:border-zinc-600" : "border-zinc-200 hover:border-green-950"}`}>
            <p>{notification.message}</p>
            <p className="mt-1 text-xs text-zinc-500">View Video</p>
          </button>
        ))}
      </div>
    </section>
  )
}