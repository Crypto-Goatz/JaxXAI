"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Check, Download, FileText, Compass as Wordpress, Building2, Target, Cloud } from "lucide-react"

type Mod = {
  id: number
  name: string
  description: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  installed: boolean
  version: string
  author: string
}

const categories = ["All", "Content", "Marketing", "Business", "Development"]

const mods: Mod[] = [
  {
    id: 1,
    name: "SaaS MOD",
    description:
      "Complete SaaS deployment with Firebase Auth, Google Cloud Run, Stripe payments, and Google Workspace integration - fully code-free",
    category: "development",
    icon: Cloud,
    color: "from-purple-500 to-pink-500",
    installed: false,
    version: "1.0.0",
    author: "APEX Team",
  },
  {
    id: 2,
    name: "SEO Content Writer",
    description: "AI-powered SEO content generation and optimization for better search rankings",
    category: "content",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    installed: false,
    version: "1.0.0",
    author: "APEX Team",
  },
  {
    id: 3,
    name: "WordPress Assistant",
    description: "Seamlessly manage WordPress sites, posts, and plugins through natural language",
    category: "development",
    icon: Wordpress,
    color: "from-indigo-500 to-blue-600",
    installed: false,
    version: "1.0.0",
    author: "APEX Team",
  },
  {
    id: 4,
    name: "Government Contracts",
    description: "Find, track, and manage government contract opportunities and bids",
    category: "business",
    icon: Building2,
    color: "from-emerald-500 to-teal-500",
    installed: false,
    version: "1.0.0",
    author: "APEX Team",
  },
  {
    id: 5,
    name: "Lead Hunter",
    description: "Intelligent lead generation and prospecting with AI-powered targeting",
    category: "marketing",
    icon: Target,
    color: "from-orange-500 to-red-500",
    installed: false,
    version: "1.0.0",
    author: "APEX Team",
  },
]

export default function ModsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMod, setSelectedMod] = useState<Mod | null>(null)
  const [installedMods, setInstalledMods] = useState<Set<number>>(
    new Set(mods.filter((m) => m.installed).map((m) => m.id)),
  )
  const [direction, setDirection] = useState<"left" | "right">("right")

  const filteredMods = mods.filter((mod) => {
    const matchesCategory = selectedCategory === "All" || mod.category === selectedCategory.toLowerCase()
    const matchesSearch =
      mod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCategoryChange = (category: string) => {
    const currentIndex = categories.indexOf(selectedCategory)
    const newIndex = categories.indexOf(category)
    setDirection(newIndex > currentIndex ? "right" : "left")
    setSelectedCategory(category)
  }

  const handleInstallMod = (modId: number) => {
    setInstalledMods((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(modId)) {
        newSet.delete(modId)
      } else {
        newSet.add(modId)
      }
      return newSet
    })
    setSelectedMod(null)
  }

  return (
    <div className="min-h-screen bg-background dark">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">MODS</h1>
          <p className="text-muted-foreground text-lg">
            Extend APEX with powerful plugins. Select your MODS and APEX takes care of the rest.
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search MODS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border text-foreground"
            />
          </div>
        </div>

        <div className="mb-8 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 min-w-max pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-foreground text-background scale-105 shadow-lg"
                    : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={`slide-${direction}`} key={selectedCategory}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMods.map((mod, index) => {
              const isInstalled = installedMods.has(mod.id)
              const IconComponent = mod.icon
              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedMod(mod)}
                  className="group relative aspect-square rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl stagger-animation bg-card border border-border"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                  />

                  {isInstalled && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center z-10">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}

                  <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="mb-4">
                      <IconComponent className="w-16 h-16 text-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {mod.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{mod.description}</p>
                    <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
                      <span>v{mod.version}</span>
                      <span>•</span>
                      <span>{mod.author}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {filteredMods.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No MODS found matching your search.</p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedMod} onOpenChange={() => setSelectedMod(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedMod && <selectedMod.icon className="w-10 h-10 text-foreground" />}
              <div>
                <div className="text-foreground">{selectedMod?.name}</div>
                <div className="text-sm text-muted-foreground font-normal">
                  v{selectedMod?.version} by {selectedMod?.author}
                </div>
              </div>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">{selectedMod?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-foreground">Category</Label>
              <div className="text-sm text-muted-foreground capitalize">{selectedMod?.category}</div>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">About this MOD</Label>
              <p className="text-sm text-muted-foreground">
                This MOD integrates seamlessly with APEX to provide {selectedMod?.description.toLowerCase()}. Simply
                install and configure through natural language commands.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            {selectedMod && installedMods.has(selectedMod.id) ? (
              <Button onClick={() => handleInstallMod(selectedMod.id)} variant="destructive" className="flex-1">
                Uninstall MOD
              </Button>
            ) : (
              <Button onClick={() => selectedMod && handleInstallMod(selectedMod.id)} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Install MOD
              </Button>
            )}
            <Button onClick={() => setSelectedMod(null)} variant="outline">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
