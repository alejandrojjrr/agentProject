"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, Plus, Settings, Zap } from "lucide-react"
import AgentEditor from "@/components/agent-editor"
import Link from "next/link"

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in or create an account to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/login">
              <Button variant="copper" className="w-full">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="copper-outline" className="w-full">
                Create Account
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Agent Dashboard</h1>
          <p className="text-slate-400">Manage and customize your AI agents</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500 button-glow">
          <Plus className="mr-2 h-4 w-4" /> Create New Agent
        </Button>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="editor" className="data-[state=active]:bg-slate-700">
            <Bot className="mr-2 h-4 w-4" /> Agent Editor
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-700">
            <Zap className="mr-2 h-4 w-4" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-slate-700">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="mt-0">
          <AgentEditor />
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-slate-800 bg-slate-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Queries</CardTitle>
                <CardDescription className="text-slate-400">Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12,543</div>
                <p className="text-sm text-green-400">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Success Rate</CardTitle>
                <CardDescription className="text-slate-400">Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">98.2%</div>
                <p className="text-sm text-green-400">+2.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Avg. Response Time</CardTitle>
                <CardDescription className="text-slate-400">Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">245ms</div>
                <p className="text-sm text-green-400">-18ms from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-800/30 p-6">
            <h3 className="mb-4 text-xl font-semibold">Usage Analytics</h3>
            <div className="h-80 w-full rounded-lg border border-slate-700 bg-slate-900 p-4">
              <div className="flex h-full items-center justify-center">
                <p className="text-slate-400">Analytics chart placeholder</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <Card className="border-slate-800 bg-slate-800/30">
            <CardHeader>
              <CardTitle>Agent Settings</CardTitle>
              <CardDescription>Configure your AI agent settings and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="agentName" className="text-sm font-medium">
                  Agent Name
                </label>
                <Input
                  id="agentName"
                  defaultValue="Customer Support Assistant"
                  className="border-slate-700 bg-slate-800 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  defaultValue="AI assistant that helps customers with product inquiries and support issues."
                  className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">API Integrations</label>
                <div className="rounded-md border border-slate-700 bg-slate-800 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Backend API</h4>
                      <p className="text-sm text-slate-400">Connect to your Python backend</p>
                    </div>
                    <Button variant="outline" className="border-slate-700">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-500 button-glow">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
