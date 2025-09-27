"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DollarSign, Calendar, AlertTriangle, CheckCircle, Plus, MoreHorizontal } from "lucide-react"
import { CompanyDetailSidepanel } from "./company-detail-sidepanel"

const stages = [
  { id: "sourcing", title: "Deal Sourcing", count: 12, color: "bg-muted" },
  { id: "screening", title: "Initial Screen", count: 8, color: "bg-primary/10" },
  { id: "deep-dive", title: "Deep Dive", count: 5, color: "bg-warning/10" },
  { id: "presentation", title: "Partner Presentation", count: 3, color: "bg-success/10" },
  { id: "due-diligence", title: "Final Due Diligence", count: 2, color: "bg-destructive/10" },
]

const deals = [
  {
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
  {
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
  {
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
  {
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
  {
    id: "5",
    company: "EduPlatform",
    stage: "due-diligence",
    value: "$2.9M",
    source: "Referral",
    founder: "Lisa Park",
    pitch:
      "Personalized learning platform for K-12 education using adaptive AI to customize curriculum for each student's learning style and pace. Used by over 200 schools nationwide.",
    flags: { red: 0, green: 4 },
    lastUpdate: "1 hour ago",
    avatar: "/education-founder.jpg",
    url: "https://eduplatform.com",
    socialNetworks: {
      linkedin: "https://linkedin.com/company/eduplatform",
      website: "https://eduplatform.com",
    },
    founders: [{ name: "Lisa Park", role: "CEO & Founder", email: "lisa@eduplatform.com", phone: "+1-555-0131" }],
    contactPeople: [
      { name: "Robert Chen", role: "Head of Education", email: "robert@eduplatform.com", phone: "+1-555-0132" },
    ],
    products: ["EduPlatform Core", "Assessment Tools", "Teacher Dashboard"],
    competitors: ["Khan Academy", "Coursera", "Pearson"],
    industry: "Education Technology",
    category: "K-12 Learning",
  },
]

export function KanbanBoard() {
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<(typeof deals)[0] | null>(null)
  const [isSidepanelOpen, setIsSidepanelOpen] = useState(false)

  const handleDragStart = (dealId: string) => {
    setDraggedDeal(dealId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault()
    // Handle deal stage update here
    console.log(`Moving deal ${draggedDeal} to stage ${stageId}`)
    setDraggedDeal(null)
  }

  const handleCompanyDetails = (deal: (typeof deals)[0]) => {
    console.log("[v0] Opening side panel for company:", deal.company)
    setSelectedCompany(deal)
    setIsSidepanelOpen(true)
  }

  const handleCloseSidepanel = () => {
    console.log("[v0] Closing side panel")
    setIsSidepanelOpen(false)
    setSelectedCompany(null)
  }

  const getDealsByStage = (stageId: string) => {
    return deals.filter((deal) => deal.stage === stageId)
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Deal Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="flex-shrink-0 w-80"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color.replace("/10", "")} animate-pulse`} />
                    <h3 className="font-medium text-sm">{stage.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {stage.count}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  {getDealsByStage(stage.id).map((deal) => (
                    <Card
                      key={deal.id}
                      className="cursor-move hover:shadow-lg hover:scale-[1.02] transition-all duration-200 bg-background border-border"
                      draggable
                      onDragStart={() => handleDragStart(deal.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6 hover:scale-110 transition-transform duration-200">
                              <AvatarImage src={deal.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {deal.founder
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-sm text-foreground">{deal.company}</h4>
                              <p className="text-xs text-muted-foreground">{deal.founder}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:scale-110 transition-transform duration-200"
                            onClick={() => handleCompanyDetails(deal)}
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>

                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{deal.pitch}</p>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <DollarSign className="h-3 w-3" />
                            <span>{deal.value}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs hover:scale-105 transition-transform duration-200"
                          >
                            {deal.source}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {deal.flags.red > 0 && (
                              <div className="flex items-center space-x-1">
                                <AlertTriangle className="h-3 w-3 text-destructive animate-bounce" />
                                <span className="text-xs text-destructive">{deal.flags.red}</span>
                              </div>
                            )}
                            {deal.flags.green > 0 && (
                              <div className="flex items-center space-x-1">
                                <CheckCircle className="h-3 w-3 text-success animate-pulse" />
                                <span className="text-xs text-success">{deal.flags.green}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{deal.lastUpdate}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedCompany && (
        <CompanyDetailSidepanel isOpen={isSidepanelOpen} onClose={handleCloseSidepanel} company={selectedCompany} />
      )}
    </>
  )
}
