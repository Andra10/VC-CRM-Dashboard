"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Mail, FileText, Bot, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AddDealPopup } from "@/components/add-deal-popup"
import { ImportLeadsPopup } from "@/components/import-leads-popup"

export function QuickActions() {
  const [addDealOpen, setAddDealOpen] = useState(false)
  const [importLeadsOpen, setImportLeadsOpen] = useState(false)

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          className="bg-primary text-primary-foreground hover:scale-105 transition-transform duration-200"
          onClick={() => setAddDealOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Deal
        </Button>

        <Button
          variant="outline"
          className="hover:scale-105 transition-transform duration-200 bg-transparent"
          onClick={() => setImportLeadsOpen(true)}
        >
          <Mail className="h-4 w-4 mr-2" />
          Import Leads
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="hover:scale-105 transition-transform duration-200 bg-transparent"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-popover border-border animate-in slide-in-from-top-2 duration-200"
          >
            <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
              <Bot className="h-4 w-4 mr-2" />
              Trigger Research Agent
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AddDealPopup isOpen={addDealOpen} onClose={() => setAddDealOpen(false)} />
      <ImportLeadsPopup isOpen={importLeadsOpen} onClose={() => setImportLeadsOpen(false)} />
    </>
  )
}
