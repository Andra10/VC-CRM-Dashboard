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
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 p-2 hover:scale-105 transition-transform duration-200"
              asChild
            >
              <a href="/" aria-label="VentureFlow - Go to dashboard">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold text-foreground hidden sm:block">
                  MatchaAI
                </span>
              </a>
            </Button>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-x-2 sm:gap-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:scale-105 transition-transform duration-200"
              onClick={() => setNotificationOpen(true)}
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:scale-105 transition-transform duration-200"
              aria-label="Open settings"
            >
              <Settings className="h-4 w-4" />
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
