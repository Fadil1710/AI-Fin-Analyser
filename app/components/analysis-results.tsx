"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Download,
  BarChart3,
  Target,
  Leaf,
  Users,
  BookOpen,
} from "lucide-react"

interface AnalysisResultsProps {
  type: "income-statement" | "business-model"
  onExport: () => void
}

export function AnalysisResults({ type, onExport }: AnalysisResultsProps) {
  const { toast } = useToast()

  const viewDetailedReport = () => {
    toast({
      title: "Opening detailed report",
      description: "Comprehensive analysis report is being prepared...",
    })

    // Generate and open detailed report
    setTimeout(() => {
      const reportContent =
        type === "income-statement" ? generateIncomeDetailedReport() : generateBusinessDetailedReport()
      const blob = new Blob([reportContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      window.open(url, "_blank")

      toast({
        title: "Detailed report ready",
        description: "Report opened in new window",
      })
    }, 1500)
  }

  const generateIncomeDetailedReport = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Income Statement Analysis - Detailed Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
          .section { margin-bottom: 30px; }
          .finding { background: #f8fafc; padding: 15px; margin: 10px 0; border-left: 4px solid #2563eb; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Income Statement Analysis - Detailed Report</h1>
          <p>Generated: ${new Date().toLocaleDateString()}</p>
        </div>
        <div class="section">
          <h2>Comprehensive Financial Analysis</h2>
          <p>This detailed report provides in-depth analysis of financial performance, trends, and risk factors.</p>
        </div>
      </body>
      </html>
    `
  }

  const generateBusinessDetailedReport = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Business Model Analysis - Detailed Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { border-bottom: 2px solid #16a34a; padding-bottom: 20px; margin-bottom: 30px; }
          .section { margin-bottom: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Business Model Analysis - Detailed Report</h1>
          <p>Generated: ${new Date().toLocaleDateString()}</p>
        </div>
        <div class="section">
          <h2>Comprehensive Business Analysis</h2>
          <p>This detailed report covers business segments, strategic initiatives, and market positioning.</p>
        </div>
      </body>
      </html>
    `
  }

  const handleExportPDF = () => {
    toast({
      title: "Generating PDF",
      description: "Creating PDF report...",
    })

    setTimeout(() => {
      // Create a simple PDF content
      const pdfContent = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R>>endobj
4 0 obj<</Length 100>>stream
BT/F1 12 Tf 50 750 Td(${type === "income-statement" ? "Income Statement" : "Business Model"} Analysis Report)Tj ET
endstream endobj
xref 0 5
0000000000 65535 f 
trailer<</Size 5/Root 1 0 R>>startxref 200 %%EOF`

      const blob = new Blob([pdfContent], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `${type === "income-statement" ? "Income_Statement" : "Business_Model"}_Analysis_${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)

      toast({
        title: "PDF exported",
        description: "Report has been downloaded",
      })

      onExport()
    }, 2000)
  }

  const incomeStatementResults = {
    overallScore: 7.2,
    riskLevel: "Medium",
    keyFindings: [
      {
        category: "Revenue Growth",
        status: "positive",
        score: 8.1,
        description: "Strong revenue growth of 12.5% YoY, outperforming industry average of 8.3%",
        recommendation: "Continue leveraging market position to maintain growth momentum",
      },
      {
        category: "Profitability",
        status: "neutral",
        score: 6.8,
        description: "EBITDA margin stable at 18.3%, slightly below industry benchmark of 19.1%",
        recommendation: "Focus on operational efficiency improvements to enhance margins",
      },
      {
        category: "Cost Management",
        status: "negative",
        score: 5.9,
        description: "Operating expenses increased 15.2%, indicating potential efficiency concerns",
        recommendation: "Implement cost optimization initiatives and process automation",
      },
    ],
    benchmarks: [
      { metric: "Revenue Growth", company: "12.5%", industry: "8.3%", status: "outperform" },
      { metric: "EBITDA Margin", company: "18.3%", industry: "19.1%", status: "underperform" },
      { metric: "ROE", company: "14.2%", industry: "12.8%", status: "outperform" },
      { metric: "Debt/Equity", company: "0.65", industry: "0.58", status: "underperform" },
    ],
  }

  const businessModelResults = {
    overallScore: 6.8,
    strategicStrength: "Strong",
    keyInsights: [
      {
        category: "Market Position",
        icon: Target,
        score: 8.2,
        description:
          "Leading position in regional energy market with strong brand recognition and distribution network",
        opportunities: ["Expand into adjacent markets", "Leverage brand for new services"],
      },
      {
        category: "ESG Compliance",
        icon: Leaf,
        score: 7.1,
        description:
          "Good progress on sustainability initiatives, but room for improvement in carbon reduction targets",
        opportunities: ["Accelerate renewable energy investments", "Enhance ESG reporting"],
      },
      {
        category: "Strategic Partnerships",
        icon: Users,
        score: 6.5,
        description: "Solid partnerships in renewable energy sector, potential for expansion in digital services",
        opportunities: ["Form tech partnerships", "Expand international alliances"],
      },
    ],
    riskFactors: [
      { risk: "Regulatory changes in energy sector", impact: "High", mitigation: "Active regulatory monitoring" },
      { risk: "Transition to renewable energy sources", impact: "Medium", mitigation: "Investment in clean energy" },
      { risk: "Geopolitical risks in supply chain", impact: "Medium", mitigation: "Supply chain diversification" },
    ],
  }

  if (type === "income-statement") {
    return (
      <div className="space-y-6">
        {/* Summary Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Income Statement Analysis Results
                </CardTitle>
                <CardDescription>Comprehensive financial analysis for Petrol d.d.</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{incomeStatementResults.overallScore}/10</div>
                <Badge variant={incomeStatementResults.riskLevel === "Medium" ? "secondary" : "default"}>
                  {incomeStatementResults.riskLevel} Risk
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="findings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="findings">Key Findings</TabsTrigger>
            <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="findings" className="space-y-4">
            {incomeStatementResults.keyFindings.map((finding, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{finding.category}</h3>
                        {finding.status === "positive" && <TrendingUp className="h-5 w-5 text-green-500" />}
                        {finding.status === "neutral" && <CheckCircle className="h-5 w-5 text-yellow-500" />}
                        {finding.status === "negative" && <TrendingDown className="h-5 w-5 text-red-500" />}
                      </div>
                      <p className="text-gray-600 mb-3">{finding.description}</p>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-sm text-gray-500">Score:</span>
                        <Progress value={finding.score * 10} className="w-24" />
                        <span className="text-sm font-medium">{finding.score}/10</span>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Recommendation:</strong> {finding.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="benchmarks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Industry Benchmarking</CardTitle>
                <CardDescription>Comparison with energy sector averages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incomeStatementResults.benchmarks.map((benchmark, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{benchmark.metric}</div>
                        <div className="text-sm text-gray-600">
                          Company: <span className="font-medium">{benchmark.company}</span> | Industry:{" "}
                          <span className="font-medium">{benchmark.industry}</span>
                        </div>
                      </div>
                      <Badge variant={benchmark.status === "outperform" ? "default" : "secondary"}>
                        {benchmark.status === "outperform" ? "Outperform" : "Underperform"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Strategic Recommendations</CardTitle>
                <CardDescription>AI-generated insights and action items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Revenue Optimization</h4>
                    <p className="text-blue-800 text-sm">
                      Continue leveraging strong market position to maintain revenue growth momentum. Consider expanding
                      into adjacent markets or services.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Cost Management</h4>
                    <p className="text-yellow-800 text-sm">
                      Implement cost optimization initiatives to improve operational efficiency. Focus on automation and
                      process improvements.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Credit Recommendation</h4>
                    <p className="text-green-800 text-sm">
                      Approve credit facility with standard terms. Monitor quarterly performance and cost management
                      initiatives closely.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={viewDetailedReport}>
            <BookOpen className="h-4 w-4 mr-2" />
            Full Report
          </Button>
          <Button onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
    )
  }

  // Business Model Results
  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-600" />
                Business Model Analysis Results
              </CardTitle>
              <CardDescription>Strategic analysis and ESG assessment for Petrol d.d.</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{businessModelResults.overallScore}/10</div>
              <Badge variant="default">{businessModelResults.strategicStrength}</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights">Strategic Insights</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          {businessModelResults.keyInsights.map((insight, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <insight.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{insight.category}</h3>
                    <p className="text-gray-600 mb-3">{insight.description}</p>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-gray-500">Strength Score:</span>
                      <Progress value={insight.score * 10} className="w-32" />
                      <span className="text-sm font-medium">{insight.score}/10</span>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800 font-medium mb-1">Key Opportunities:</p>
                      <ul className="text-sm text-green-700 list-disc list-inside">
                        {insight.opportunities.map((opp, idx) => (
                          <li key={idx}>{opp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                Identified Risk Factors
              </CardTitle>
              <CardDescription>Key risks that may impact business performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {businessModelResults.riskFactors.map((riskItem, index) => (
                  <div key={index} className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                        <span className="font-medium text-orange-900">{riskItem.risk}</span>
                      </div>
                      <Badge variant={riskItem.impact === "High" ? "destructive" : "secondary"}>
                        {riskItem.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-orange-800 mb-2">{riskItem.mitigation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Growth Opportunities</CardTitle>
              <CardDescription>Strategic opportunities for business expansion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Renewable Energy Expansion</h4>
                  <p className="text-green-800 text-sm">
                    Strong potential for expanding renewable energy portfolio and capturing growing market demand for
                    clean energy solutions.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Digital Transformation</h4>
                  <p className="text-blue-800 text-sm">
                    Opportunities to leverage digital technologies for operational efficiency and customer experience
                    enhancement.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Strategic Partnerships</h4>
                  <p className="text-purple-800 text-sm">
                    Potential for forming strategic alliances in emerging markets and new technology sectors.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={viewDetailedReport}>
          <BookOpen className="h-4 w-4 mr-2" />
          Full Report
        </Button>
        <Button onClick={handleExportPDF}>
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </div>
    </div>
  )
}
