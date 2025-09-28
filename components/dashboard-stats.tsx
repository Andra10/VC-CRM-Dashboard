import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Building2, Clock, Target } from "lucide-react"

const stats = [
  {
    title: "Active Deals",
    value: "47",
    change: "+12%",
    trend: "up",
    icon: Building2,
    description: "vs last month",
  },
  {
    title: "Total Pipeline Value",
    value: "$24.8M",
    change: "+8.2%",
    trend: "up",
    icon: DollarSign,
    description: "across all stages",
  },
  {
    title: "Avg. Deal Size",
    value: "$527K",
    change: "-3.1%",
    trend: "down",
    icon: Target,
    description: "median deal value",
  },
  {
    title: "Time to Close",
    value: "89 days",
    change: "-12%",
    trend: "up",
    icon: Clock,
    description: "average cycle time",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="bg-card border-border hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground hover:scale-110 transition-transform duration-200" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200">
              {stat.value}
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-success animate-pulse" />
                ) : (
                  <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-destructive animate-pulse" />
                )}
                <span className={stat.trend === "up" ? "text-success" : "text-destructive"}>{stat.change}</span>
              </div>
              <span className="hidden sm:inline">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
