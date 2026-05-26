import { Compass, Home, LogOut, Settings, UserRound, type LucideIcon } from "lucide-react";
export type AppView = "home" | "discover" | "profile" | "settings";
type NavigationProps = {
  isDark: boolean;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  onLogOut: () => void;
};
type NavItem = {
  id: AppView;
  label: string;
  icon: LucideIcon;
};
const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "discover", label: "Discover", icon: Compass },
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "settings", label: "Settings", icon: Settings }
];
type NavLinksProps = Omit<NavigationProps, "onLogOut"> & {
  compact?: boolean;
};
function NavLinks({ compact, isDark, activeView, onNavigate }: NavLinksProps) {
  return navItems.map(({ id, label, icon: Icon }) => (
    <button key={id} type="button" onClick={() => onNavigate(id)} className={`flex items-center gap-3 rounded border transition-colors ${compact ? "flex-1 flex-col justify-center gap-1 border-transparent py-2 text-xs" : "w-full px-4 py-3 text-sm"} ${activeView === id ? isDark ? "border-zinc-700 bg-zinc-900 text-white" : "border-green-950 bg-white text-green-950" : isDark ? "border-transparent text-zinc-400 hover:bg-zinc-900 hover:text-white" : "border-transparent text-zinc-500 hover:bg-zinc-100 hover:text-green-950"}`}>
      <Icon size={compact ? 21 : 20} strokeWidth={activeView === id ? 2 : 1.6} />
      <span className="font-medium">{label}</span>
    </button>
  ));
}
export default function Navigation({ isDark, activeView, onNavigate, onLogOut }: NavigationProps) {
  return (
    <>
      <aside className={`fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r p-5 lg:flex ${isDark ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-white"}`}>
        <div className="mb-10 flex items-center gap-3 px-3">
          <span className={`rounded border p-2 ${isDark ? "border-zinc-700 text-white" : "border-green-950 text-green-950"}`}>
            <Compass size={22} strokeWidth={1.6} />
          </span>
          <div>
            <p className={`text-lg font-medium ${isDark ? "text-white" : "text-green-950"}`}>SocialMedia</p>
            <p className="text-xs text-zinc-500">Stories Together</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <NavLinks isDark={isDark} activeView={activeView} onNavigate={onNavigate} />
        </nav>
        <button type="button" onClick={onLogOut} className={`mt-auto flex items-center gap-3 rounded border px-4 py-3 text-sm transition-colors ${isDark ? "border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-white" : "border-zinc-200 text-zinc-500 hover:border-green-950 hover:text-green-950"}`}>
          <LogOut size={18} strokeWidth={1.6} />
          <span className="font-medium">Log Out</span>
        </button>
      </aside>
      <header className="pointer-events-none fixed left-0 right-0 top-0 z-20 flex items-center justify-between p-4 lg:hidden">
        <span className="rounded bg-black/60 px-3 py-2 text-sm font-medium text-white backdrop-blur">SocialMedia</span>
        <button type="button" onClick={() => onNavigate("settings")} className="pointer-events-auto rounded bg-black/60 p-3 text-white backdrop-blur" aria-label="Open Settings">
          <Settings size={19} strokeWidth={1.6} />
        </button>
      </header>
      <nav className={`fixed bottom-0 left-0 right-0 z-20 flex border-t px-4 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden ${isDark ? "border-zinc-800 bg-zinc-950/95 text-white" : "border-zinc-200 bg-white/95 text-zinc-950"}`}>
        <NavLinks compact isDark={isDark} activeView={activeView} onNavigate={onNavigate} />
      </nav>
    </>
  )
}