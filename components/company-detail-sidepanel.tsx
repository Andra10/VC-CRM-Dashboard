"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { X, Users, Building2, Target, Globe, Linkedin, Twitter, Mail, Phone, Plus } from "lucide-react"
import { ExpandableText } from "./expandable-text"
import { SocialButton } from "./social-button"
import { ValidationFlag } from "./validation-flag"

interface CompanyDetailSidepanelProps {
  isOpen: boolean
  onClose: () => void
  company: {
    id: string
    company: string
    founder: string
    pitch: string
    value: string
    source: string
    avatar: string
    url?: string
    flags?: {
      red: number
      green: number
    }
    socialNetworks?: {
      linkedin?: string
      twitter?: string
      website?: string
    }
    founders?: Array<{
      name: string
      role: string
      email?: string
      phone?: string
    }>
    contactPeople?: Array<{
      name: string
      role: string
      email?: string
      phone?: string
    }>
    products?: string[]
    competitors?: string[]
    industry?: string
    category?: string
    validationFlags?: Array<{
      type: "red" | "green"
      title: string
      description: string
      details?: string
      mailPreview?: {
        subject: string
        sender: string
        snippet: string
      }
    }>
  }
}

export function CompanyDetailSidepanel({ isOpen, onClose, company }: CompanyDetailSidepanelProps) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        console.log("[v0] Closing side panel via Escape key")
        onClose()
      }
    }

    if (isOpen) {
      console.log("[v0] Side panel opened, adding event listeners")
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!company) {
    console.log("[v0] No company data provided to side panel")
    return null
  }

  // Dynamic validation flags based on company data
  const getValidationFlags = () => {
    const flags = []
    
    // Check for red flags based on company data
    if (company.flags && company.flags.red > 0) {
      // Email domain validation
      if (company.source === "Cold Outreach") {
        flags.push({
          type: "red" as const,
          title: "Cold Outreach Source",
          description: "Company sourced through cold outreach - requires additional verification",
          details: "This company was contacted through cold outreach methods. Additional verification of company legitimacy and founder credentials is recommended before proceeding.",
        })
      }
      
      // Founder information validation
      if (!company.founders || company.founders.length < 2) {
        flags.push({
          type: "red" as const,
          title: "Incomplete Founder Information",
          description: "Limited founder information available",
          details: "Only one founder identified. Most successful startups have multiple co-founders. Additional research into the founding team is recommended.",
        })
      }
      
      // Social media validation
      if (!company.socialNetworks?.linkedin) {
        flags.push({
          type: "red" as const,
          title: "Missing LinkedIn Profile",
          description: "No LinkedIn company page found",
          details: "The company does not have a verified LinkedIn presence, which may indicate a newer company or potential legitimacy concerns.",
        })
      }
    }
    
    // Check for green flags
    if (company.flags && company.flags.green > 0) {
      // Company validation
      if (company.socialNetworks?.linkedin && company.socialNetworks?.website) {
        flags.push({
          type: "green" as const,
          title: "Company Validated",
          description: "Company verified across multiple sources",
          details: "The company has been validated across LinkedIn, official website, and other professional networks. All information appears consistent and legitimate.",
        })
      }
      
      // Founder validation
      if (company.founders && company.founders.length >= 2) {
        flags.push({
          type: "green" as const,
          title: "Complete Founding Team",
          description: "Multiple founders identified with contact information",
          details: "The company has a complete founding team with verified contact information. This indicates a more established and legitimate operation.",
        })
      }
      
      // Industry validation
      if (company.industry && company.category) {
        flags.push({
          type: "green" as const,
          title: "Clear Market Position",
          description: "Well-defined industry and category classification",
          details: "The company has a clear market position with defined industry and category. This indicates good business planning and market understanding.",
        })
      }
    }
    
    // If no flags exist, show a neutral validation state
    if (flags.length === 0) {
      flags.push({
        type: "green" as const,
        title: "Validation Pending",
        description: "Company information is being reviewed",
        details: "The company information is currently under review. No issues have been identified yet, but validation is still in progress.",
      })
    }
    
    return flags
  }

  const validationFlags = getValidationFlags()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => {
              console.log("[v0] Closing side panel via backdrop click")
              onClose()
            }}
            aria-hidden="true"
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-background border-l shadow-2xl z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="company-detail-title"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex items-center justify-between p-6 border-b bg-muted/30 flex-shrink-0"
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={company.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {company.company
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div>
                    <h1 id="company-detail-title" className="text-xl font-semibold">
                      {company.company}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {company.value} • {company.source}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Quick Actions */}
                  {company.url && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.2 }}
                    >
                      <Button variant="outline" size="sm" asChild>
                        <a href={company.url} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, duration: 0.2 }}
                  >
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.2 }}
                  >
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Deal
                    </Button>
                  </motion.div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      console.log("[v0] Closing side panel via close button")
                      onClose()
                    }}
                    className="h-8 w-8 p-0"
                    aria-label="Close panel"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              {/* Content */}
              <ScrollArea className="flex-1 overflow-hidden">
                <div className="p-6 space-y-8 pb-8">
                  {/* Pitch Summary */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <h2 className="font-semibold mb-3 text-base">Pitch Summary</h2>
                    <ExpandableText text={company.pitch} maxLength={200} />
                  </motion.section>

                  <Separator />

                  {/* Source Communication Channel */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                  >
                    <h2 className="font-semibold mb-3 text-base">Source Communication Channel</h2>
                    <Badge variant="outline" className="text-sm">
                      {company.source}
                    </Badge>
                  </motion.section>

                  <Separator />

                  {/* Social Networks */}
                  {company.socialNetworks && (
                    <>
                      <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        <h2 className="font-semibold mb-4 text-base flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          Social Networks
                        </h2>
                        <div className="flex space-x-3">
                          {company.socialNetworks.linkedin && (
                            <SocialButton href={company.socialNetworks.linkedin} icon={Linkedin} label="LinkedIn" />
                          )}
                          {company.socialNetworks.twitter && (
                            <SocialButton href={company.socialNetworks.twitter} icon={Twitter} label="Twitter" />
                          )}
                          {company.socialNetworks.website && (
                            <SocialButton href={company.socialNetworks.website} icon={Globe} label="Website" />
                          )}
                        </div>
                      </motion.section>
                      <Separator />
                    </>
                  )}

                  {/* Founders */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                  >
                    <h2 className="font-semibold mb-4 text-base flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Founders
                    </h2>
                    <div className="space-y-3">
                      {company.founders?.map((founder, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                        >
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-sm">{founder.name}</p>
                                  <p className="text-xs text-muted-foreground">{founder.role}</p>
                                </div>
                                <div className="flex space-x-2">
                                  {founder.email && (
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                      <Button variant="ghost" size="sm" asChild>
                                        <a href={`mailto:${founder.email}`} aria-label={`Email ${founder.name}`}>
                                          <Mail className="h-3 w-3" />
                                        </a>
                                      </Button>
                                    </motion.div>
                                  )}
                                  {founder.phone && (
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                      <Button variant="ghost" size="sm" asChild>
                                        <a href={`tel:${founder.phone}`} aria-label={`Call ${founder.name}`}>
                                          <Phone className="h-3 w-3" />
                                        </a>
                                      </Button>
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )) || (
                        <Card>
                          <CardContent className="p-4">
                            <p className="font-medium text-sm">{company.founder}</p>
                            <p className="text-xs text-muted-foreground">Founder</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </motion.section>

                  {/* Contact People */}
                  {company.contactPeople && company.contactPeople.length > 0 && (
                    <>
                      <Separator />
                      <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        <h2 className="font-semibold mb-4 text-base">Contact People</h2>
                        <div className="space-y-3">
                          {company.contactPeople.map((contact, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.45 + index * 0.1, duration: 0.3 }}
                            >
                              <Card>
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium text-sm">{contact.name}</p>
                                      <p className="text-xs text-muted-foreground">{contact.role}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                      {contact.email && (
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                          <Button variant="ghost" size="sm" asChild>
                                            <a href={`mailto:${contact.email}`} aria-label={`Email ${contact.name}`}>
                                              <Mail className="h-3 w-3" />
                                            </a>
                                          </Button>
                                        </motion.div>
                                      )}
                                      {contact.phone && (
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                          <Button variant="ghost" size="sm" asChild>
                                            <a href={`tel:${contact.phone}`} aria-label={`Call ${contact.name}`}>
                                              <Phone className="h-3 w-3" />
                                            </a>
                                          </Button>
                                        </motion.div>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </motion.section>
                    </>
                  )}

                  {/* Products & Competitors */}
                  {((company.products && company.products.length > 0) ||
                    (company.competitors && company.competitors.length > 0)) && (
                    <>
                      <Separator />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {company.products && company.products.length > 0 && (
                          <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.3 }}
                          >
                            <h2 className="font-semibold mb-3 text-base">Products</h2>
                            <div className="flex flex-wrap gap-2">
                              {company.products.map((product, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.5 + index * 0.05, duration: 0.2 }}
                                >
                                  <Badge variant="secondary">{product}</Badge>
                                </motion.div>
                              ))}
                            </div>
                          </motion.section>
                        )}

                        {company.competitors && company.competitors.length > 0 && (
                          <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                          >
                            <h2 className="font-semibold mb-3 text-base flex items-center">
                              <Target className="h-4 w-4 mr-2" />
                              Competitors
                            </h2>
                            <div className="flex flex-wrap gap-2">
                              {company.competitors.map((competitor, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.55 + index * 0.05, duration: 0.2 }}
                                >
                                  <Badge variant="outline">{competitor}</Badge>
                                </motion.div>
                              ))}
                            </div>
                          </motion.section>
                        )}
                      </div>
                    </>
                  )}

                  {/* Industry & Category */}
                  <Separator />
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.3 }}
                  >
                    <h2 className="font-semibold mb-3 text-base flex items-center">
                      <Building2 className="h-4 w-4 mr-2" />
                      Industry & Category
                    </h2>
                    <div className="flex space-x-2">
                      {company.industry && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6, duration: 0.2 }}
                        >
                          <Badge variant="default">{company.industry}</Badge>
                        </motion.div>
                      )}
                      {company.category && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.65, duration: 0.2 }}
                        >
                          <Badge variant="secondary">{company.category}</Badge>
                        </motion.div>
                      )}
                    </div>
                  </motion.section>

                  {/* Validation Flags */}
                  <Separator />
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    <h2 className="font-semibold mb-4 text-base">Validation Flags</h2>
                    <div className="space-y-3">
                      {validationFlags.map((flag, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.65 + index * 0.1, duration: 0.3 }}
                        >
                          <ValidationFlag {...flag} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
