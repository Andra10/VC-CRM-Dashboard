"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, FileText, UserPlus, TrendingUp, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { generateValidationFlags } from "./validation-engine"
import { CompanyDetailSidepanel } from "./company-detail-sidepanel"

// Company data (should be kept in sync with Kanban board)
const mockCompanyData = {
  "TechFlow AI": {
    id: "1",
    company: "TechFlow AI",
    stage: "sourcing",
    value: "$2.5M",
    source: "Cold Outreach",
    founder: "Sarah Chen",
    pitch:
      "Hi there! We're building something revolutionary in the AI space that will completely transform how enterprises work. Our AI-powered platform is years ahead of the competition and we're already getting interest from major companies like Microsoft and Google. We've been working on this evolutionary prototype for over a year and it's truly groundbreaking. We're looking for pre-seed funding to scale this incredible opportunity. The market is huge - we're talking about capturing just 1% of a $50B market. We can send you our executive summary and additional documents before our meeting. Our founders are siblings who have been collaborating on this technical project, which shows our strong team cohesion and shared vision. We're confident this will be a 10x return for investors!",
    flags: { red: 3, green: 3 },
    lastUpdate: "2 hours ago",
    avatar: "/tech-founder.jpg",
    url: "https://techflow-ai.com",
    socialNetworks: {
      linkedin: undefined,
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
      "We've built a comprehensive digital health platform that's truly revolutionary in the healthcare space. Our AI-powered diagnosis system is years ahead of competitors and we're already seeing incredible traction with over 50,000 patients across 12 states. The healthcare market is enormous - we're looking at a $50B+ opportunity and we're confident we can capture significant market share. Our team has been working on this evolutionary prototype for over a year, demonstrating sustained execution and technical progress. We have strong interest from major healthcare companies for partnerships. We're seeking Series A funding to scale this incredible opportunity. We can provide detailed financial projections and our executive summary before any meeting. Our founders are siblings who have been collaborating on this technical project, showing strong team cohesion and shared vision.",
    flags: { red: 3, green: 3 },
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
    value: "$800K",
    source: "Cold Outreach",
    founder: "Mike Rodriguez",
    pitch:
      "We're developing an AI-based algorithm for sustainable energy solutions that will revolutionize smart cities. Our evolutionary prototype has been in development for over a year and shows incredible potential. We're seeking pre-seed funding to bring this technology to market. The clean energy market is massive and we're confident we can capture significant market share. We have interest from several major companies for potential partnerships. Our team is small but dedicated - just me as the founder working on this groundbreaking technology. We can provide additional information and our executive summary before any meeting. The external market conditions have been challenging, but our technology is so advanced that we're years ahead of competitors like Tesla Energy.",
    flags: { red: 3, green: 3 },
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
      "Our AI financial advisor is absolutely revolutionary and will completely transform how small businesses handle their finances. We've been working on this evolutionary prototype for over a year and it's truly groundbreaking. The fintech market is massive - we're talking about a $50B+ opportunity and we're confident we can capture significant market share. We're already getting incredible interest from major companies for partnerships. Our technology is so advanced that we're years ahead of competitors like QuickBooks and Xero. We're seeking Series A funding to scale this incredible opportunity. We can provide our executive summary and additional financial details before any meeting. The external market conditions have been challenging, but our AI algorithm is so sophisticated that we're confident this will be a 10x return for investors!",
    flags: { red: 3, green: 3 },
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
            {activities.map((activity, index) => {
              const company = mockCompanyData[activity.company as keyof typeof mockCompanyData]
              const flags = company ? generateValidationFlags(company) : []
              const redCount = flags.filter((f) => f.type === "red").length
              const greenCount = flags.filter((f) => f.type === "green").length
              return (
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
                  {/* Inline synced flag counts */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-destructive" />
                      <span>{redCount} Issues</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-success" />
                      <span>{greenCount} Validated</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
              )
            })}
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
