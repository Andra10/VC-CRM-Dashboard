import { DashboardLayout } from "@/components/dashboard-layout"
import { KanbanBoard } from "@/components/kanban-board"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Deal Pipeline</h1>
            <p className="text-muted-foreground">Manage your venture capital deal flow and track opportunities</p>
          </div>
          <QuickActions />
        </div>

        <DashboardStats />

        <KanbanBoard />

        <RecentActivity />
      </div>
    </DashboardLayout>
  )
}
