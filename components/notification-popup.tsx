"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Clock, User, Building2, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationPopupProps {
  isOpen: boolean
  onClose: () => void
}

const recentActivities = [
  {
    id: 1,
    type: "deal_update",
    title: "TechFlow moved to Due Diligence",
    description: "Deal stage updated by Sarah Chen",
    time: "2 minutes ago",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    id: 2,
    type: "new_lead",
    title: "New lead: GreenEnergy Solutions",
    description: "Added from LinkedIn outreach",
    time: "15 minutes ago",
    icon: Building2,
    color: "text-green-600",
  },
  {
    id: 3,
    type: "meeting",
    title: "Meeting scheduled with HealthTech Inc",
    description: "Pitch meeting set for tomorrow 2 PM",
    time: "1 hour ago",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    id: 4,
    type: "team_update",
    title: "John added notes to DataCorp deal",
    description: "Updated competitive analysis section",
    time: "3 hours ago",
    icon: User,
    color: "text-purple-600",
  },
]

export function NotificationPopup({ isOpen, onClose }: NotificationPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in-0 duration-200" onClick={onClose} />
      <Card className="w-96 bg-card border-border shadow-lg animate-in slide-in-from-right-5 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4 max-h-96 overflow-y-auto">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200"
            >
              <div className={cn("p-2 rounded-full bg-accent", activity.color)}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
