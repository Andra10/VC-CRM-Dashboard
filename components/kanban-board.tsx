"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DollarSign, Calendar, AlertTriangle, CheckCircle, Plus, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { CompanyDetailSidepanel } from "./company-detail-sidepanel"
import { generateValidationFlags } from "./validation-engine"
import { motion, AnimatePresence } from "framer-motion"

const stages = [
  { id: "sourcing", title: "Deal Sourcing", count: 12, color: "bg-muted", pingColor: "bg-blue-500" },
  { id: "screening", title: "Initial Screen", count: 8, color: "bg-primary/10", pingColor: "bg-amber-500" },
  { id: "deep-dive", title: "Deep Dive", count: 5, color: "bg-warning/10", pingColor: "bg-red-500" },
  { id: "presentation", title: "Partner Presentation", count: 3, color: "bg-success/10", pingColor: "bg-green-500" },
  { id: "due-diligence", title: "Final Due Diligence", count: 2, color: "bg-destructive/10", pingColor: "bg-purple-500" },
]

const deals = [
  {
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
    ],
    contactPeople: [
      { name: "Jennifer Walsh", role: "VP of Sales", email: "jennifer@techflow-ai.com", phone: "+1-555-0125" },
    ],
    products: ["TechFlow Automation"],
    competitors: ["Zapier", "Microsoft Power Automate", "UiPath"],
    industry: "Enterprise Software",
    category: "Workflow Automation",
  },
  {
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
      linkedin: undefined,
      website: "https://greentech-solutions.com",
    },
    founders: [{ name: "Mike Rodriguez", role: "CEO", email: "mike@greentech-solutions.com", phone: "+1-555-0126" }],
    products: ["Solar Optimizer"],
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
  {
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
  {
    id: "5",
    company: "EduPlatform",
    stage: "due-diligence",
    value: "$2.9M",
    source: "Referral",
    founder: "Lisa Park",
    pitch:
      "We've developed an AI-based Ed-Tech startup with a working evolutionary prototype that's truly revolutionary in the education space. Our adaptive AI algorithm has been in development for over a year and shows incredible potential for transforming K-12 education. The education market is enormous - we're looking at a $50B+ opportunity and we're confident we can capture significant market share. We have strong interest from major educational institutions for partnerships. Our team has been working on this evolutionary prototype for over a year, demonstrating sustained execution and technical progress. We're seeking Series A funding to scale this incredible opportunity. We can provide detailed financial projections and our executive summary before any meeting. The external market conditions have been challenging, but our technology is so advanced that we're years ahead of competitors like Khan Academy and Coursera.",
    flags: { red: 3, green: 3 },
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
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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
    console.log("[v0] Deal data:", deal)
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

  const getStageStats = (stageId: string) => {
    const stageDeals = deals.filter((deal) => deal.stage === stageId)
    const totalRed = stageDeals.reduce((acc, deal) => acc + deal.flags.red, 0)
    const totalGreen = stageDeals.reduce((acc, deal) => acc + deal.flags.green, 0)
    return { totalRed, totalGreen, count: stageDeals.length }
  }

  // Scroll handling functions
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setScrollPosition(scrollLeft)
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scrollToColumn = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // Responsive column width based on screen size
      const isSmallScreen = window.innerWidth < 640
      const columnWidth = isSmallScreen ? 288 : 320 // sm:w-72 = 288px, w-80 = 320px
      const currentScroll = scrollContainerRef.current.scrollLeft
      const targetScroll = direction === 'left' 
        ? currentScroll - columnWidth 
        : currentScroll + columnWidth
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }

  const handleScroll = () => {
    updateScrollButtons()
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      updateScrollButtons()
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold text-foreground">Deal Pipeline</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Fixed-width viewport container with scroll indicators */}
          <div className="relative w-full">
            {/* Left scroll indicator */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full bg-background/80 hover:bg-background shadow-md"
                  onClick={() => scrollToColumn('left')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {/* Right scroll indicator */}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full bg-background/80 hover:bg-background shadow-md"
                  onClick={() => scrollToColumn('right')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Scrollable pipeline container */}
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto scroll-smooth snap-x snap-mandatory"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth'
              }}
            >
              <div className="flex gap-6 p-6" style={{ width: 'max-content' }}>
                {stages.map((stage) => {
                  const stats = getStageStats(stage.id)
                  const stageDeals = getDealsByStage(stage.id)
                  
                  return (
                    <motion.div
                      key={stage.id}
                      className="w-80 sm:w-72 md:w-80 lg:w-80 xl:w-80 flex-shrink-0 flex flex-col snap-start"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, stage.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                  {/* Single Line Stage Header with Title, Issues, and Validations */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between h-12 w-full">
                      {/* Left side - Title and Count */}
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="relative flex items-center justify-center">
                          {/* Dynamic Animated Ping - Centered with Title */}
                          <motion.span
                            className={`h-2 w-2 rounded-full ${stage.pingColor} opacity-75`}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.75, 0, 0.75],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground whitespace-nowrap">{stage.title}</h3>
                        <Badge variant="secondary" className="text-xs font-medium flex-shrink-0 px-2 py-1">
                          {stats.count}
                        </Badge>
                      </div>
                      
                      {/* Right side - Issues and Validations */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex items-center gap-1 px-2 py-1 bg-destructive/10 rounded-md h-6 border border-destructive/20">
                          <AlertTriangle className="h-3 w-3 text-destructive flex-shrink-0" />
                          <span className="text-xs font-medium text-destructive whitespace-nowrap">{stats.totalRed}</span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 rounded-md h-6 border border-emerald-500/20">
                          <CheckCircle className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                          <span className="text-xs font-medium text-emerald-600 whitespace-nowrap">{stats.totalGreen}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rigid Grid Company Cards */}
                  <div className="space-y-3 flex-1">
                    <AnimatePresence mode="popLayout">
                      {stageDeals.map((deal, index) => {
                        const validationFlags = generateValidationFlags(deal)
                        const redFlags = validationFlags.filter(f => f.type === 'red')
                        const greenFlags = validationFlags.filter(f => f.type === 'green')
                        
                        return (
                          <motion.div
                            key={deal.id}
                            layout
                            className="w-full"
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ 
                              duration: 0.3, 
                              ease: "easeInOut",
                              delay: index * 0.1 
                            }}
                            whileHover={{ 
                              scale: 1.01,
                              transition: { duration: 0.2, ease: "easeInOut" }
                            }}
                          >
                            <Card
                              className="cursor-pointer hover:shadow-md transition-all duration-200 bg-card border-border group w-full h-64 hover:border-border/50"
                              draggable
                              onDragStart={() => handleDragStart(deal.id)}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                console.log("Card clicked:", deal.company)
                                handleCompanyDetails(deal)
                              }}
                            >
                              <CardContent className="p-4 h-full flex flex-col">
                                {/* Company Header */}
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                                    <Avatar className="h-8 w-8 flex-shrink-0">
                                      <AvatarImage src={deal.avatar || "/placeholder.svg"} />
                                      <AvatarFallback className="text-sm">
                                        {deal.founder
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                      <h4 
                                        className="text-base font-semibold text-foreground leading-tight"
                                        title={deal.company}
                                      >
                                        {deal.company}
                                      </h4>
                                      <p className="text-sm text-muted-foreground leading-tight mt-0.5">{deal.founder}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex-shrink-0 ml-2">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 hover:bg-accent"
                                      >
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem onClick={() => handleCompanyDetails(deal)}>
                                          View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          Edit Deal
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          Move to Next Stage
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                          Archive Deal
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>

                                {/* Description - Fixed Height */}
                                <div className="h-16 mb-4">
                                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed h-full overflow-hidden">
                                    {deal.pitch}
                                  </p>
                                </div>

                                {/* Funding & Source - Fixed Height */}
                                <div className="h-8 flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                      <DollarSign className="h-4 w-4" />
                                      <span className="font-semibold text-foreground">{deal.value}</span>
                                    </div>
                                    <Badge variant="outline" className="text-sm">
                                      {deal.source}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Bottom Row - Fixed Height */}
                                <div className="h-6 flex items-center justify-between mt-auto">
                                  <div className="flex items-center gap-3">
                                    {redFlags.length > 0 && (
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <AlertTriangle className="h-3 w-3 text-destructive" />
                                        <span className="font-medium">{redFlags.length}</span>
                                      </div>
                                    )}
                                    {greenFlags.length > 0 && (
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <CheckCircle className="h-3 w-3 text-emerald-600" />
                                        <span className="font-medium">{greenFlags.length}</span>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span>{deal.lastUpdate}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedCompany && (
        <CompanyDetailSidepanel isOpen={isSidepanelOpen} onClose={handleCloseSidepanel} company={selectedCompany} />
      )}
    </>
  )
}
