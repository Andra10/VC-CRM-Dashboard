"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface ExpandableTextProps {
  text: string
  maxLength?: number
  className?: string
}

export function ExpandableText({ text, maxLength = 200, className = "" }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldTruncate = text.length > maxLength
  const displayText = shouldTruncate && !isExpanded ? text.slice(0, maxLength) + "..." : text

  if (!shouldTruncate) {
    return <p className={`text-sm text-muted-foreground leading-relaxed ${className}`}>{text}</p>
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.p
          key={isExpanded ? "expanded" : "collapsed"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="text-sm text-muted-foreground leading-relaxed"
        >
          {displayText}
        </motion.p>
      </AnimatePresence>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 p-0 h-auto text-xs hover:bg-transparent"
        aria-label={isExpanded ? "Show less" : "Show more"}
      >
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="mr-1">
          <ChevronDown className="h-3 w-3" />
        </motion.div>
        {isExpanded ? "Show less" : "Show more"}
      </Button>
    </div>
  )
}
