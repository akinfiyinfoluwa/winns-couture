import { Dashboard } from "@/components/admin/Dashboard/Dashboard";
import { Sidebar } from "@/components/admin/Sidebar/Sidebar";


export default function DashHome() {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
      <Sidebar />
      <Dashboard />
    </main>
  );
}