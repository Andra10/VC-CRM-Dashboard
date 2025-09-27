"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Upload, Link, FileText } from "lucide-react"

interface ImportLeadsPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function ImportLeadsPopup({ isOpen, onClose }: ImportLeadsPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in-0 duration-200" onClick={onClose} />
      <Card className="w-full max-w-lg bg-card border-border shadow-lg animate-in zoom-in-95 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Import Leads
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Import multiple leads at once from a CSV or integrate directly from your lead sources to quickly populate
            your pipeline.
          </p>

          <Tabs defaultValue="csv" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="csv">CSV Upload</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
            </TabsList>

            <TabsContent value="csv" className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-200">
                <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">Drop your CSV file here</p>
                <p className="text-xs text-muted-foreground mb-3">or click to browse</p>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                CSV should include columns: Company Name, Founder, Email, Industry, Stage
              </p>
            </TabsContent>

            <TabsContent value="integration" className="space-y-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Link className="h-4 w-4 mr-2" />
                  Connect LinkedIn Sales Navigator
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Link className="h-4 w-4 mr-2" />
                  Connect Crunchbase
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Link className="h-4 w-4 mr-2" />
                  Connect AngelList
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-primary text-primary-foreground">Import</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
