"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, FileText, Upload, BarChart3, CheckCircle, Clock } from "lucide-react"

export function DashboardOverview() {
  const recentAnalyses = [
    {
      id: 1,
      type: "Income Statement",
      company: "Petrol d.d.",
      date: "2024-01-15",
      status: "completed",
      riskLevel: "medium",
    },
    {
      id: 2,
      type: "Business Model",
      company: "Petrol d.d.",
      date: "2024-01-10",
      status: "completed",
      riskLevel: "low",
    },
    {
      id: 3,
      type: "Income Statement",
      company: "Petrol d.d.",
      date: "2024-01-05",
      status: "processing",
      riskLevel: "high",
    },
  ]

  const keyMetrics = [
    {
      title: "Revenue Growth",
      value: "+12.5%",
      change: "+2.1%",
      trend: "up",
      description: "Year-over-year growth",
    },
    {
      title: "EBITDA Margin",
      value: "18.3%",
      change: "-0.8%",
      trend: "down",
      description: "Current quarter margin",
    },
    {
      title: "Risk Score",
      value: "6.2/10",
      change: "+0.3",
      trend: "up",
      description: "Overall credit risk assessment",
    },
    {
      title: "ESG Rating",
      value: "B+",
      change: "Stable",
      trend: "stable",
      description: "Environmental, Social, Governance",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to GenAI Financial Analyzer</h2>
        <p className="text-gray-600 mb-4">
          Analyze financial data and business models for Petrol d.d. to support credit approval processes.
        </p>
        <div className="flex space-x-4">
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload New Data
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="flex items-center mt-1">
                    {metric.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500 mr-1" />}
                    {metric.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500 mr-1" />}
                    <span
                      className={`text-sm ${
                        metric.trend === "up"
                          ? "text-green-600"
                          : metric.trend === "down"
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Analyses */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Analyses</CardTitle>
          <CardDescription>Latest financial and business model analyses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAnalyses.map((analysis) => (
              <div key={analysis.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {analysis.status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {analysis.status === "processing" && <Clock className="h-5 w-5 text-yellow-500" />}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{analysis.type}</div>
                    <div className="text-sm text-gray-500">
                      {analysis.company} • {analysis.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge
                    variant={
                      analysis.riskLevel === "low"
                        ? "default"
                        : analysis.riskLevel === "medium"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {analysis.riskLevel} risk
                  </Badge>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Income Statement Analysis
            </CardTitle>
            <CardDescription>Analyze structured financial data for trend analysis and risk detection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                • Automated rule-based trend analysis
                <br />• Financial benchmarking with industry insights
                <br />• Risk and volatility detection
              </div>
              <Button className="w-full">Start Analysis</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-green-600" />
              Business Model Analysis
            </CardTitle>
            <CardDescription>Analyze unstructured data for strategic insights and ESG compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                • Strategic analysis of business segments
                <br />• ESG compliance and risk factor evaluation
                <br />• Assessment of strategic partnerships
              </div>
              <Button className="w-full">Start Analysis</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
