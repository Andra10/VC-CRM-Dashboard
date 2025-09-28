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
      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button
          className="bg-primary text-primary-foreground hover:scale-105 transition-transform duration-200 text-xs sm:text-sm"
          onClick={() => setAddDealOpen(true)}
        >
          <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Add Deal</span>
          <span className="sm:hidden">Add</span>
        </Button>

        <Button
          variant="outline"
          className="hover:scale-105 transition-transform duration-200 bg-transparent text-xs sm:text-sm"
          onClick={() => setImportLeadsOpen(true)}
        >
          <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Import Leads</span>
          <span className="sm:hidden">Import</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="hover:scale-105 transition-transform duration-200 bg-transparent h-8 w-8 sm:h-9 sm:w-auto sm:px-3"
            >
              <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline sm:ml-2">More</span>
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
