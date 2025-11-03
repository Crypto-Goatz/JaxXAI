"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeMenu && navRef.current && !navRef.current.contains(event.target as Node)) {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current)
        }
        setIsClosing(true)
        setTimeout(() => {
          setActiveMenu(null)
          setIsClosing(false)
        }, 300)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [activeMenu])

  const handleMouseEnter = (title: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsClosing(false)
    setActiveMenu(title)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsClosing(true)
      setTimeout(() => {
        setActiveMenu(null)
        setIsClosing(false)
      }, 300)
    }, 500)
  }

  const handleMouseEnterNav = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsClosing(false)
  }

  const handleLinkClick = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setIsClosing(true)
    setTimeout(() => {
      setActiveMenu(null)
      setIsClosing(false)
    }, 300)
  }

  const megaMenus = {
    "APEX CORE": {
      sections: [
        {
          title: "Platform",
          items: [
            { name: "Dashboard", href: "/", description: "Your command center" },
            { name: "Connectors", href: "/connectors", description: "Connect your tools" },
            { name: "MODS", href: "/mods", description: "Extend functionality" },
          ],
        },
        {
          title: "Features",
          items: [
            { name: "AI Assistant", href: "#", description: "Natural language control" },
            { name: "Automation", href: "#", description: "Workflow automation" },
            { name: "Analytics", href: "#", description: "Business insights" },
          ],
        },
        {
          title: "Resources",
          items: [
            { name: "Documentation", href: "#", description: "Learn the platform" },
            { name: "API Reference", href: "#", description: "Developer docs" },
            { name: "Support", href: "#", description: "Get help" },
          ],
        },
      ],
    },
    "HOW IT WORKS": {
      sections: [
        {
          title: "Getting Started",
          items: [
            { name: "Quick Start", href: "#", description: "Get up and running" },
            { name: "Setup Guide", href: "#", description: "Configure your workspace" },
            { name: "First Steps", href: "#", description: "Your first automation" },
          ],
        },
        {
          title: "Core Concepts",
          items: [
            { name: "Plain Language", href: "#", description: "No code required" },
            { name: "MODS System", href: "#", description: "Plugin architecture" },
            { name: "Connectors", href: "#", description: "Integration framework" },
          ],
        },
        {
          title: "Use Cases",
          items: [
            { name: "Marketing", href: "#", description: "Automate campaigns" },
            { name: "Sales", href: "#", description: "Manage pipeline" },
            { name: "Operations", href: "#", description: "Streamline processes" },
          ],
        },
      ],
    },
    MARKETING: {
      sections: [
        {
          title: "Campaigns",
          items: [
            { name: "Email Marketing", href: "#", description: "Automated email campaigns" },
            { name: "Social Media", href: "#", description: "Multi-platform posting" },
            { name: "Content Creation", href: "#", description: "AI-powered content" },
          ],
        },
        {
          title: "Analytics",
          items: [
            { name: "Campaign Performance", href: "#", description: "Track ROI" },
            { name: "Audience Insights", href: "#", description: "Understand your audience" },
            { name: "A/B Testing", href: "#", description: "Optimize campaigns" },
          ],
        },
        {
          title: "Tools",
          items: [
            { name: "SEO Optimizer", href: "#", description: "Improve rankings" },
            { name: "Lead Magnets", href: "#", description: "Capture leads" },
            { name: "Landing Pages", href: "#", description: "Convert visitors" },
          ],
        },
      ],
    },
    CUSTOMERS: {
      sections: [
        {
          title: "Management",
          items: [
            { name: "CRM", href: "#", description: "Customer relationship management" },
            { name: "Contact Database", href: "#", description: "Organize contacts" },
            { name: "Segmentation", href: "#", description: "Target audiences" },
          ],
        },
        {
          title: "Engagement",
          items: [
            { name: "Support Tickets", href: "#", description: "Help desk system" },
            { name: "Live Chat", href: "#", description: "Real-time support" },
            { name: "Feedback", href: "#", description: "Collect insights" },
          ],
        },
        {
          title: "Retention",
          items: [
            { name: "Loyalty Programs", href: "#", description: "Reward customers" },
            { name: "Onboarding", href: "#", description: "Welcome new customers" },
            { name: "Churn Prevention", href: "#", description: "Keep customers happy" },
          ],
        },
      ],
    },
    SALES: {
      sections: [
        {
          title: "Pipeline",
          items: [
            { name: "Lead Management", href: "#", description: "Track opportunities" },
            { name: "Deal Tracking", href: "#", description: "Monitor progress" },
            { name: "Forecasting", href: "#", description: "Predict revenue" },
          ],
        },
        {
          title: "Automation",
          items: [
            { name: "Follow-ups", href: "#", description: "Automated outreach" },
            { name: "Proposals", href: "#", description: "Generate quotes" },
            { name: "Contracts", href: "#", description: "E-signature ready" },
          ],
        },
        {
          title: "Performance",
          items: [
            { name: "Sales Analytics", href: "#", description: "Track metrics" },
            { name: "Team Leaderboard", href: "#", description: "Motivate team" },
            { name: "Commission", href: "#", description: "Calculate earnings" },
          ],
        },
      ],
    },
    "WHAT IS XAI?": {
      sections: [
        {
          title: "About XAI",
          items: [
            { name: "Introduction", href: "#", description: "What is XAI?" },
            { name: "Technology", href: "#", description: "How it works" },
            { name: "Benefits", href: "#", description: "Why choose XAI" },
          ],
        },
        {
          title: "Capabilities",
          items: [
            { name: "Natural Language", href: "#", description: "Talk to your business" },
            { name: "Learning", href: "#", description: "Adapts to your needs" },
            { name: "Integration", href: "#", description: "Works with everything" },
          ],
        },
        {
          title: "Learn More",
          items: [
            { name: "Case Studies", href: "#", description: "Success stories" },
            { name: "Research", href: "#", description: "Technical papers" },
            { name: "FAQ", href: "#", description: "Common questions" },
          ],
        },
      ],
    },
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 border-b border-border bg-card z-50"
      onMouseEnter={handleMouseEnterNav}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/images/design-mode/apex-logo-black-trans.png"
              alt="APEX Logo"
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-6">
            {Object.entries(megaMenus).map(([title, menu]) => (
              <div key={title} className="relative" onMouseEnter={() => handleMouseEnter(title)}>
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {title}
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === title ? "rotate-180" : ""}`} />
                </button>

                {activeMenu === title && (
                  <div
                    className={`fixed left-0 right-0 top-[57px] ${
                      isClosing ? "animate-mega-menu-exit" : "animate-mega-menu-enter"
                    }`}
                  >
                    <div className="max-w-7xl mx-auto px-8">
                      <div className="bg-black border border-orange-500/20 rounded-lg shadow-2xl overflow-hidden transition-opacity duration-200">
                        <div className="grid grid-cols-[400px_1fr]">
                          <div className="bg-black p-8 flex flex-col justify-center border-r border-orange-500/20">
                            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                              {title}
                            </h2>
                            <p className="text-white/80 text-sm mb-6 leading-relaxed">
                              {title === "APEX CORE" &&
                                "Get to market quickly and securely with products that can scale globally"}
                              {title === "HOW IT WORKS" &&
                                "Run your app with confidence and deliver the best experience for your users"}
                              {title === "MARKETING" &&
                                "Automate your marketing and reach customers across every channel"}
                              {title === "CUSTOMERS" &&
                                "Build lasting relationships and deliver exceptional customer experiences"}
                              {title === "SALES" && "Close more deals faster with intelligent sales automation"}
                              {title === "WHAT IS XAI?" && "Discover the power of explainable AI for your business"}
                            </p>
                            <button className="self-start px-6 py-2.5 rounded-full border-2 border-orange-500 text-white font-medium hover:bg-orange-500/10 transition-colors">
                              Learn More
                            </button>
                          </div>
                          <div className="bg-gray-50 p-8">
                            <h3 className="text-gray-700 font-semibold text-lg mb-6">
                              {title === "APEX CORE" && "Core Products"}
                              {title === "HOW IT WORKS" && "Getting Started"}
                              {title === "MARKETING" && "Marketing Tools"}
                              {title === "CUSTOMERS" && "Customer Tools"}
                              {title === "SALES" && "Sales Tools"}
                              {title === "WHAT IS XAI?" && "Learn About XAI"}
                            </h3>
                            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                              {menu.sections.map((section) => (
                                <div key={section.title} className="space-y-3">
                                  {section.items.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      className="block group"
                                      onClick={handleLinkClick}
                                    >
                                      <div className="text-gray-900 font-medium group-hover:text-orange-500 transition-colors">
                                        {item.name}
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link href="/dashboard">
              <Button variant="default" size="sm" className="ml-4">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
