"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus } from "lucide-react"

interface AddDealPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function AddDealPopup({ isOpen, onClose }: AddDealPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in-0 duration-200" onClick={onClose} />
      <Card className="w-full max-w-md bg-card border-border shadow-lg animate-in zoom-in-95 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add New Deal
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Add a new deal to your pipeline by filling in the company information, status, and notes.
          </p>

          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input id="company-name" placeholder="Enter company name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="founder">Founder</Label>
            <Input id="founder" placeholder="Founder name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stage">Deal Stage</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sourcing">Sourcing</SelectItem>
                <SelectItem value="initial-contact">Initial Contact</SelectItem>
                <SelectItem value="pitch">Pitch</SelectItem>
                <SelectItem value="due-diligence">Due Diligence</SelectItem>
                <SelectItem value="term-sheet">Term Sheet</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Add any relevant notes..." rows={3} />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-primary text-primary-foreground">Add Deal</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
