"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { X, Users, Building2, Target, Globe, Linkedin, Twitter, Mail, Phone, Plus, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, FileText } from "lucide-react"
import { generateValidationFlags } from "./validation-engine"
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

  const [expandedFlags, setExpandedFlags] = useState(new Set<number>())

  const toggleFlag = (index: number) => {
    const newExpanded = new Set(expandedFlags)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedFlags(newExpanded)
  }

  if (!company) {
    console.log("[v0] No company data provided to side panel")
    return null
  }

  const getValidationFlags = () => generateValidationFlags(company)

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

                  {/* Investment Analysis Report */}
                  <Separator />
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    {/* Header with Overall Score */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                          <Target className="h-5 w-5 mr-2" />
                          Investment Analysis Report
                        </h2>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          validationFlags.filter(f => f.type === 'green').length > validationFlags.filter(f => f.type === 'red').length 
                            ? 'bg-green-100 text-green-600' 
                            : validationFlags.filter(f => f.type === 'red').length > validationFlags.filter(f => f.type === 'green').length
                            ? 'bg-red-100 text-red-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {validationFlags.filter(f => f.type === 'green').length > validationFlags.filter(f => f.type === 'red').length 
                            ? 'Good' 
                            : validationFlags.filter(f => f.type === 'red').length > validationFlags.filter(f => f.type === 'green').length
                            ? 'Needs Review'
                            : 'Moderate'
                          }
                        </div>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span>{validationFlags.filter(f => f.type === 'red').length} Issues</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{validationFlags.filter(f => f.type === 'green').length} Validated</span>
                        </div>
                      </div>
                    </div>

                    {/* Validation Flags */}
                    <div className="space-y-3">
                      {validationFlags.map((flag, index) => {
                        const isExpanded = expandedFlags.has(index);
                        const IconComponent = flag.type === 'red' ? AlertTriangle : flag.type === 'green' ? CheckCircle : FileText;
                        
                        const getStatusColor = (type: string) => {
    switch (type) {
      case 'red': return 'border-red-200 bg-red-50';
      case 'green': return 'border-green-200 bg-green-50';
      case 'neutral': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

                        const getIconColor = (type: string) => {
    switch (type) {
      case 'red': return 'text-red-500';
      case 'green': return 'text-green-500';
      case 'neutral': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

                        const getSeverityBadge = (severity: string, type: string) => {
                          const colors: Record<string, Record<string, string>> = {
      red: {
        high: 'bg-red-100 text-red-800 border-red-200',
        medium: 'bg-orange-100 text-orange-800 border-orange-200',
        low: 'bg-yellow-100 text-yellow-800 border-yellow-200'
      },
      green: {
        high: 'bg-green-100 text-green-800 border-green-200',
        medium: 'bg-blue-100 text-blue-800 border-blue-200',
        low: 'bg-gray-100 text-gray-800 border-gray-200'
      },
      neutral: {
                              high: 'bg-blue-100 text-blue-800 border-blue-200',
                              medium: 'bg-blue-100 text-blue-800 border-blue-200',
                              low: 'bg-blue-100 text-blue-800 border-blue-200'
      }
    };

    return colors[type]?.[severity] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
                          <motion.div
              key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65 + index * 0.1, duration: 0.3 }}
              className={`border rounded-lg transition-all duration-200 hover:shadow-sm ${getStatusColor(flag.type)}`}
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => toggleFlag(index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <IconComponent className={`w-5 h-5 mt-0.5 flex-shrink-0 ${getIconColor(flag.type)}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{flag.title}</h3>
                        {flag.severity && (
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getSeverityBadge(flag.severity, flag.type)}`}>
                            {flag.severity}
                          </span>
                        )}
                        {flag.confidenceScore && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full border bg-gray-100 text-gray-800">
                            Confidence: {flag.confidenceScore}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{flag.description}</p>
                    </div>
                  </div>
                  <button className="ml-2 p-1 hover:bg-white/50 rounded">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Expanded Details with Bullet Points */}
              {isExpanded && (
                <div className="px-4 pb-4">
                  <div className="border-t pt-3 mt-1">
                    <ul className="space-y-2">
                      {Array.isArray(flag.details) ? (
                        flag.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-sm text-gray-700 leading-relaxed">{detail}</span>
                          </li>
                        ))
                      ) : (
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-sm text-gray-700 leading-relaxed">{flag.details}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
                          </motion.div>
          );
        })}
      </div>

      {/* Action Buttons */}
                    {validationFlags.some(f => f.type === 'red') && (
        <div className="mt-6 flex gap-3">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Request Additional Info
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Mark as Reviewed
          </button>
        </div>
      )}
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
