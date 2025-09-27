"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface SocialButtonProps {
  href: string
  icon: LucideIcon
  label: string
  className?: string
}

export function SocialButton({ href, icon: Icon, label, className = "" }: SocialButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.1 }}>
      <Button
        variant="outline"
        size="lg"
        asChild
        className={`h-12 w-12 p-0 hover:bg-primary hover:text-primary-foreground transition-colors ${className}`}
        aria-label={`Visit ${label}`}
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          <Icon className="h-5 w-5" />
        </a>
      </Button>
    </motion.div>
  )
}
