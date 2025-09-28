"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, ChevronDown, Mail, FileText } from "lucide-react"

interface ValidationFlagProps {
  type: "red" | "green" | "neutral"
  title: string
  description: string
  details?: string
  confidenceScore?: number
  mailPreview?: {
    subject: string
    sender: string
    snippet: string
  }
}

export function ValidationFlag({ type, title, description, details, confidenceScore, mailPreview }: ValidationFlagProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const icon = type === "red" ? AlertTriangle : type === "green" ? CheckCircle : FileText
  const IconComponent = icon
  const colorClass =
    type === "red" 
      ? "text-destructive bg-destructive-bg border-destructive/20" 
      : type === "green" 
      ? "text-success bg-success-bg border-success/20"
      : "text-primary bg-primary-bg border-primary/20"

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <Card className={`border ${colorClass}`}>
          <CardContent className="p-4">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto hover:bg-transparent"
                aria-label={`${isExpanded ? "Collapse" : "Expand"} ${title} details`}
              >
                <div className="flex items-start space-x-3 text-left">
                  <IconComponent className={`h-4 w-4 mt-0.5 ${type === "red" ? "text-destructive" : type === "green" ? "text-success" : "text-primary"}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{title}</p>
                      {confidenceScore && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                          {confidenceScore}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{description}</p>
                  </div>
                </div>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </Button>
            </CollapsibleTrigger>

            <AnimatePresence>
              {isExpanded && (
                <CollapsibleContent forceMount>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-current/10">
                      {details && (
                        <div className="mb-4">
                          <h4 className="font-medium text-sm mb-2">Details</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{details}</p>
                        </div>
                      )}

                      {mailPreview && (
                        <div>
                          <h4 className="font-medium text-sm mb-2 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            Email Preview
                          </h4>
                          <div className="bg-background/50 rounded-lg p-3 border">
                            <div className="text-xs space-y-1">
                              <p>
                                <span className="font-medium">From:</span> {mailPreview.sender}
                              </p>
                              <p>
                                <span className="font-medium">Subject:</span> {mailPreview.subject}
                              </p>
                              <p className="text-muted-foreground mt-2">{mailPreview.snippet}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </CollapsibleContent>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </Collapsible>
    </motion.div>
  )
}
