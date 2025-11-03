"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ExchangeIntegrations from "@/components/integrations/exchange-integrations"
import WebhookIntegrations from "@/components/integrations/webhook-integrations"
import NotificationSettings from "@/components/integrations/notification-settings"
import GoogleSheetsIntegrations from "@/components/integrations/google-sheets-integrations"
import DataSourceIntegrations from "@/components/integrations/data-source-integrations"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/flow/1">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Integrations & Settings</h1>
              <p className="text-sm text-muted-foreground">Manage exchange APIs, webhooks, and notifications</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="exchanges" className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-5">
            <TabsTrigger value="exchanges">Exchanges</TabsTrigger>
            <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
            <TabsTrigger value="sheets">Sheets</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="exchanges" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Exchange API Keys</CardTitle>
                <CardDescription>
                  Connect your exchange accounts to enable automated trading. Your API keys are stored securely and
                  never shared.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExchangeIntegrations />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data-sources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crypto Data Sources</CardTitle>
                <CardDescription>
                  Connect data providers to access real-time crypto variables like price, volume, social sentiment,
                  on-chain metrics, and technical indicators in your workflows.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataSourceIntegrations />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sheets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Google Sheets Integration</CardTitle>
                <CardDescription>
                  Connect Google Sheets to read/write data and execute Apps Scripts. Supports both API key and OAuth
                  authentication.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GoogleSheetsIntegrations />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <CardDescription>
                  Configure inbound webhooks to trigger workflows and outbound webhooks for notifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WebhookIntegrations />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how you receive alerts from your trading workflows.</CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
