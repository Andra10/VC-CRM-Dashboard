"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Users, Building2, Target, Globe, Linkedin, Twitter, Mail, Phone } from "lucide-react"

interface CompanyDetailPopupProps {
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
  }
}

export function CompanyDetailPopup({ isOpen, onClose, company }: CompanyDetailPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={company.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {company.company
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-xl font-semibold">{company.company}</DialogTitle>
              <p className="text-sm text-muted-foreground">
                {company.value} • {company.source}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* URL */}
          {company.url && (
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                Website
              </h3>
              <Button variant="outline" size="sm" asChild>
                <a href={company.url} target="_blank" rel="noopener noreferrer">
                  Visit Website
                  <ExternalLink className="h-3 w-3 ml-2" />
                </a>
              </Button>
            </div>
          )}

          {/* Pitch Summary */}
          <div>
            <h3 className="font-medium mb-2">Pitch Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{company.pitch}</p>
          </div>

          {/* Source Communication Channel */}
          <div>
            <h3 className="font-medium mb-2">Source Communication Channel</h3>
            <Badge variant="outline">{company.source}</Badge>
          </div>

          {/* Social Networks */}
          {company.socialNetworks && (
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Social Networks
              </h3>
              <div className="flex space-x-2">
                {company.socialNetworks.linkedin && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={company.socialNetworks.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-3 w-3 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {company.socialNetworks.twitter && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={company.socialNetworks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-3 w-3 mr-2" />
                      Twitter
                    </a>
                  </Button>
                )}
                {company.socialNetworks.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={company.socialNetworks.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-3 w-3 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}

          <Separator />

          {/* Founders */}
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Founders
            </h3>
            <div className="space-y-3">
              {company.founders?.map((founder, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{founder.name}</p>
                    <p className="text-xs text-muted-foreground">{founder.role}</p>
                  </div>
                  <div className="flex space-x-2">
                    {founder.email && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`mailto:${founder.email}`}>
                          <Mail className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                    {founder.phone && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`tel:${founder.phone}`}>
                          <Phone className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )) || (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-medium text-sm">{company.founder}</p>
                  <p className="text-xs text-muted-foreground">Founder</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact People */}
          {company.contactPeople && company.contactPeople.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">Contact People</h3>
              <div className="space-y-3">
                {company.contactPeople.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.role}</p>
                    </div>
                    <div className="flex space-x-2">
                      {contact.email && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`mailto:${contact.email}`}>
                            <Mail className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {contact.phone && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`tel:${contact.phone}`}>
                            <Phone className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Products List */}
          {company.products && company.products.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">Products</h3>
              <div className="flex flex-wrap gap-2">
                {company.products.map((product, index) => (
                  <Badge key={index} variant="secondary">
                    {product}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Competitors List */}
          {company.competitors && company.competitors.length > 0 && (
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Competitors
              </h3>
              <div className="flex flex-wrap gap-2">
                {company.competitors.map((competitor, index) => (
                  <Badge key={index} variant="outline">
                    {competitor}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Industry + Category */}
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              Industry & Category
            </h3>
            <div className="flex space-x-2">
              {company.industry && <Badge variant="default">{company.industry}</Badge>}
              {company.category && <Badge variant="secondary">{company.category}</Badge>}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
