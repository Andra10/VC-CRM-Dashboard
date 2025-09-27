"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, FileText, UserPlus, TrendingUp, Clock } from "lucide-react"
import { CompanyDetailSidepanel } from "./company-detail-sidepanel"

// Company data matching exactly with Kanban board
const mockCompanyData = {
  "TechFlow AI": {
    id: "1",
    company: "TechFlow AI",
    stage: "sourcing",
    value: "$2.5M",
    source: "Referral",
    founder: "Sarah Chen",
    pitch:
      "AI-powered workflow automation for enterprises that reduces manual tasks by 80% and increases productivity across teams. Our platform integrates with existing tools and provides intelligent automation suggestions.",
    flags: { red: 0, green: 2 },
    lastUpdate: "2 hours ago",
    avatar: "/tech-founder.jpg",
    url: "https://techflow-ai.com",
    socialNetworks: {
      linkedin: "https://linkedin.com/company/techflow-ai",
      twitter: "https://twitter.com/techflowai",
      website: "https://techflow-ai.com",
    },
    founders: [
      { name: "Sarah Chen", role: "CEO & Co-founder", email: "sarah@techflow-ai.com", phone: "+1-555-0123" },
      { name: "David Kim", role: "CTO & Co-founder", email: "david@techflow-ai.com", phone: "+1-555-0124" },
    ],
    contactPeople: [
      { name: "Jennifer Walsh", role: "VP of Sales", email: "jennifer@techflow-ai.com", phone: "+1-555-0125" },
    ],
    products: ["TechFlow Automation", "TechFlow Analytics", "TechFlow API"],
    competitors: ["Zapier", "Microsoft Power Automate", "UiPath"],
    industry: "Enterprise Software",
    category: "Workflow Automation",
  },
  "HealthSync": {
    id: "3",
    company: "HealthSync",
    stage: "deep-dive",
    value: "$3.2M",
    source: "Network",
    founder: "Dr. Emily Watson",
    pitch:
      "Digital health platform connecting patients and providers through telemedicine, health monitoring, and AI-powered diagnosis assistance. Serving over 50,000 patients across 12 states.",
    flags: { red: 0, green: 3 },
    lastUpdate: "3 hours ago",
    avatar: "/healthcare-founder.jpg",
    url: "https://healthsync.com",
    socialNetworks: {
      linkedin: "https://linkedin.com/company/healthsync",
      twitter: "https://twitter.com/healthsync",
      website: "https://healthsync.com",
    },
    founders: [
      { name: "Dr. Emily Watson", role: "CEO & Co-founder", email: "emily@healthsync.com", phone: "+1-555-0127" },
      { name: "James Liu", role: "CTO & Co-founder", email: "james@healthsync.com", phone: "+1-555-0128" },
    ],
    contactPeople: [
      { name: "Maria Santos", role: "Head of Partnerships", email: "maria@healthsync.com", phone: "+1-555-0129" },
    ],
    products: ["HealthSync Platform", "AI Diagnosis Assistant", "Patient Portal"],
    competitors: ["Teladoc", "Amwell", "MDLive"],
    industry: "Healthcare Technology",
    category: "Digital Health",
  },
  "GreenTech Solutions": {
    id: "2",
    company: "GreenTech Solutions",
    stage: "screening",
    value: "$1.8M",
    source: "Cold Outreach",
    founder: "Mike Rodriguez",
    pitch:
      "Sustainable energy solutions for smart cities including solar panel optimization, energy storage systems, and grid management software that reduces energy costs by up to 40%.",
    flags: { red: 1, green: 1 },
    lastUpdate: "1 day ago",
    avatar: "/green-energy-founder.jpg",
    url: "https://greentech-solutions.com",
    socialNetworks: {
      linkedin: "https://linkedin.com/company/greentech-solutions",
      website: "https://greentech-solutions.com",
    },
    founders: [{ name: "Mike Rodriguez", role: "CEO", email: "mike@greentech-solutions.com", phone: "+1-555-0126" }],
    products: ["Solar Optimizer", "Energy Storage Pro", "Grid Manager"],
    competitors: ["Tesla Energy", "Sunrun", "Enphase"],
    industry: "Clean Energy",
    category: "Smart City Technology",
  },
  "FinanceBot": {
    id: "4",
    company: "FinanceBot",
    stage: "presentation",
    value: "$4.1M",
    source: "Event",
    founder: "Alex Kim",
    pitch:
      "AI financial advisor for small businesses providing automated bookkeeping, tax optimization, and financial planning. Helps businesses save an average of $15,000 annually on accounting costs.",
    flags: { red: 2, green: 1 },
    lastUpdate: "5 hours ago",
    avatar: "/fintech-founder.jpg",
    url: "https://financebot.ai",
    socialNetworks: {
      linkedin: "https://linkedin.com/company/financebot",
      twitter: "https://twitter.com/financebotai",
      website: "https://financebot.ai",
    },
    founders: [{ name: "Alex Kim", role: "CEO", email: "alex@financebot.ai", phone: "+1-555-0130" }],
    products: ["FinanceBot Pro", "Tax Optimizer", "Business Insights"],
    competitors: ["QuickBooks", "Xero", "FreshBooks"],
    industry: "Financial Technology",
    category: "Small Business Software",
  },
}

const activities = [
  {
    id: "1",
    type: "note",
    title: "Added research notes",
    company: "TechFlow AI",
    user: "Sarah Chen",
    time: "2 hours ago",
    icon: FileText,
    avatar: "/diverse-user-avatars.png",
  },
  {
    id: "2",
    type: "stage",
    title: "Moved to Deep Dive",
    company: "HealthSync",
    user: "Mike Rodriguez",
    time: "4 hours ago",
    icon: TrendingUp,
    avatar: "/diverse-user-avatars.png",
  },
  {
    id: "3",
    type: "contact",
    title: "New contact added",
    company: "GreenTech Solutions",
    user: "Emily Watson",
    time: "1 day ago",
    icon: UserPlus,
    avatar: "/diverse-user-avatars.png",
  },
  {
    id: "4",
    type: "comment",
    title: "Left a comment",
    company: "FinanceBot",
    user: "Alex Kim",
    time: "2 days ago",
    icon: MessageSquare,
    avatar: "/diverse-user-avatars.png",
  },
]

export function RecentActivity() {
  const [selectedCompany, setSelectedCompany] = useState<typeof mockCompanyData[keyof typeof mockCompanyData] | null>(null)
  const [isSidepanelOpen, setIsSidepanelOpen] = useState(false)

  const handleCompanyClick = (companyName: string) => {
    const companyData = mockCompanyData[companyName as keyof typeof mockCompanyData]
    if (companyData) {
      console.log("[v0] Opening side panel for company:", companyName)
      setSelectedCompany(companyData)
      setIsSidepanelOpen(true)
    }
  }

  const handleCloseSidepanel = () => {
    console.log("[v0] Closing side panel")
    setIsSidepanelOpen(false)
    setSelectedCompany(null)
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-all duration-200 group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <activity.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-5 w-5 hover:scale-110 transition-transform duration-200">
                      <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{activity.user}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity.title} for{" "}
                    <button
                      onClick={() => handleCompanyClick(activity.company)}
                      className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 hover:underline cursor-pointer"
                      aria-label={`View details for ${activity.company}`}
                    >
                      {activity.company}
                    </button>
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedCompany && (
        <CompanyDetailSidepanel 
          isOpen={isSidepanelOpen} 
          onClose={handleCloseSidepanel} 
          company={selectedCompany} 
        />
      )}
    </>
  )
}
