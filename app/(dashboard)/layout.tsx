import { Sidebar } from "@/components/dashboard/sidebar";
import { BottomNav } from "@/components/dashboard/bottom-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <BottomNav />
      <main className="md:ml-64">
        <div className="container mx-auto px-4 py-5 pb-24 sm:px-6 md:py-8 md:pb-8 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
