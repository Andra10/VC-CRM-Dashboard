"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { NotificationPopup } from "@/components/notification-popup"
import { BarChart3, Bell, Settings } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [notificationOpen, setNotificationOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 hover:scale-105 transition-transform duration-200"
              asChild
            >
              <a href="/" aria-label="VentureFlow - Go to dashboard">
                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg bg-primary flex items-center justify-center">
                  <BarChart3 className="h-3 w-3 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                <span className="text-base sm:text-lg font-semibold text-foreground">
                  MatchaAI
                </span>
              </a>
            </Button>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-x-1 sm:gap-x-2 md:gap-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative h-8 w-8 sm:h-9 sm:w-9 p-0 hover:scale-105 transition-transform duration-200"
              onClick={() => setNotificationOpen(true)}
              aria-label="View notifications"
            >
              <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-1.5 w-1.5 sm:h-2 sm:w-2 bg-destructive rounded-full animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-1.5 w-1.5 sm:h-2 sm:w-2 bg-destructive rounded-full" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:scale-105 transition-transform duration-200"
              aria-label="Open settings"
            >
              <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Notification popup */}
      <NotificationPopup isOpen={notificationOpen} onClose={() => setNotificationOpen(false)} />
    </div>
  )
}
