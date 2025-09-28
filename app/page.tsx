import { DashboardLayout } from "@/components/dashboard-layout"
import { KanbanBoard } from "@/components/kanban-board"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">Deal Pipeline</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage your venture capital deal flow and track opportunities</p>
          </div>
          <div className="flex-shrink-0">
            <QuickActions />
          </div>
        </div>

        <DashboardStats />

        <KanbanBoard />

        <RecentActivity />
      </div>
    </DashboardLayout>
  )
}
