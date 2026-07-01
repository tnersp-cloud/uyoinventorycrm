import Link from "next/link";
import { 
  LayoutDashboard, 
  ClipboardList, 
  CalendarDays, 
  Users, 
  LogOut,
  Building2
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-neutral-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 bg-neutral-900 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-neutral-800">
          <Building2 className="w-6 h-6 mr-3 text-yellow-500" />
          <span className="font-bold text-lg tracking-tight">Arise Estate</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Overview
          </Link>
          <Link href="/dashboard/inventory" className="flex items-center px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
            <ClipboardList className="w-5 h-5 mr-3" />
            Inventory
          </Link>
          <Link href="/dashboard/program" className="flex items-center px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
            <CalendarDays className="w-5 h-5 mr-3" />
            Program of Works
          </Link>
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <button className="flex w-full items-center justify-start text-neutral-400 border border-neutral-700 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-neutral-800 bg-neutral-900 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-neutral-400">Project Manager</div>
            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
              PM
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8 bg-neutral-950">
          {children}
        </div>
      </main>
    </div>
  );
}
