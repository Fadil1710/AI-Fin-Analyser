"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Download,
  BarChart3,
  BookOpen,
  Shield,
  Info,
} from "lucide-react"

interface PetrolAnalysisResultsProps {
  onExport: () => void
  analysisConfig: any
}

export function PetrolAnalysisResults({ onExport, analysisConfig }: PetrolAnalysisResultsProps) {
  const { toast } = useToast()

  const viewDetailedReport = () => {
    toast({
      title: "Generating detailed report",
      description: "Comprehensive analysis report is being prepared...",
    })

    // Simulate detailed report generation
    setTimeout(() => {
      const reportContent = generateDetailedReport()
      const blob = new Blob([reportContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      window.open(url, "_blank")

      toast({
        title: "Detailed report ready",
        description: "Report opened in new window",
      })
    }, 2000)
  }

  const generateDetailedReport = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Petrol d.d. Income Statement Analysis - Detailed Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
          .section { margin-bottom: 30px; }
          .finding { background: #f8fafc; padding: 15px; margin: 10px 0; border-left: 4px solid #2563eb; }
          .confidence { color: #059669; font-weight: bold; }
          .sources { color: #6b7280; font-size: 0.9em; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #d1d5db; padding: 12px; text-align: left; }
          th { background-color: #f3f4f6; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Petrol d.d. Income Statement Analysis</h1>
          <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Overall Score:</strong> ${analysisResults.overallScore}/10</p>
          <p><strong>Risk Level:</strong> ${analysisResults.riskLevel}</p>
          <p><strong>Confidence:</strong> <span class="confidence">${(analysisResults.confidence * 100).toFixed(0)}%</span></p>
        </div>
        
        <div class="section">
          <h2>Executive Summary</h2>
          <p>Petrol d.d. demonstrates strong financial performance with revenue growth of 11.4% YoY, outpacing regional energy sector averages. The company maintains solid profitability metrics with EBITDA margin expansion and effective operational leverage.</p>
        </div>
        
        <div class="section">
          <h2>Key Findings</h2>
          ${analysisResults.keyFindings
            .map(
              (finding) => `
            <div class="finding">
              <h3>Q${finding.questionId}: ${finding.question}</h3>
              <p>${finding.finding}</p>
              <p class="confidence">Confidence: ${(finding.confidence * 100).toFixed(0)}%</p>
              <p class="sources">Sources: ${finding.sources.join(", ")}</p>
            </div>
          `,
            )
            .join("")}
        </div>
        
        <div class="section">
          <h2>Sector Benchmarking</h2>
          <table>
            <thead>
              <tr><th>Metric</th><th>Petrol d.d.</th><th>Sector Average</th><th>Performance</th></tr>
            </thead>
            <tbody>
              ${analysisResults.benchmarkData
                .map(
                  (benchmark) => `
                <tr>
                  <td>${benchmark.metric}</td>
                  <td>${benchmark.petrol}</td>
                  <td>${benchmark.sectorAvg}</td>
                  <td>${benchmark.status === "outperform" ? "✓ Outperform" : "⚠ Underperform"}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
        
        <div class="section">
          <h2>Risk Assessment</h2>
          ${analysisResults.riskIndicators
            .map(
              (risk) => `
            <div class="finding">
              <h3>${risk.category} - ${risk.level}</h3>
              <p><strong>Description:</strong> ${risk.description}</p>
              <p><strong>Mitigation:</strong> ${risk.mitigation}</p>
            </div>
          `,
            )
            .join("")}
        </div>
        
        <div class="section">
          <h2>Methodology</h2>
          <p>This analysis was generated using AI-driven financial analysis combining rule-based and ML-driven approaches. Data sources include multi-year income statements, industry benchmarking databases, and regulatory filings.</p>
          <p><strong>Processing Time:</strong> ${analysisResults.processingTime}</p>
          <p><strong>Data Quality:</strong> ${analysisResults.dataQuality}</p>
        </div>
      </body>
      </html>
    `
  }

  const handleExportPDF = () => {
    toast({
      title: "Generating PDF report",
      description: "Creating comprehensive PDF document...",
    })

    // Simulate PDF generation and download
    setTimeout(() => {
      const pdfContent = generatePDFContent()
      const blob = new Blob([pdfContent], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      // Create download link
      const link = document.createElement("a")
      link.href = url
      link.download = `Petrol_dd_Income_Statement_Analysis_${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up
      URL.revokeObjectURL(url)

      toast({
        title: "PDF exported successfully",
        description: "Report has been downloaded to your device",
      })

      // Call the original onExport function
      onExport()
    }, 3000)
  }

  const generatePDFContent = () => {
    // This would normally use a PDF library like jsPDF or PDFKit
    // For demo purposes, we'll create a simple text-based PDF placeholder
    return `%PDF-1.4
  1 0 obj
  <<
  /Type /Catalog
  /Pages 2 0 R
  >>
  endobj
  
  2 0 obj
  <<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
  >>
  endobj
  
  3 0 obj
  <<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  /Contents 4 0 R
  >>
  endobj
  
  4 0 obj
  <<
  /Length 200
  >>
  stream
  BT
  /F1 12 Tf
  50 750 Td
  (Petrol d.d. Income Statement Analysis Report) Tj
  0 -20 Td
  (Generated: ${new Date().toLocaleDateString()}) Tj
  0 -20 Td
  (Overall Score: ${analysisResults.overallScore}/10) Tj
  0 -20 Td
  (Risk Level: ${analysisResults.riskLevel}) Tj
  0 -40 Td
  (This is a comprehensive financial analysis report.) Tj
  0 -20 Td
  (For full content, please use the detailed report view.) Tj
  ET
  endstream
  endobj
  
  xref
  0 5
  0000000000 65535 f 
  0000000010 00000 n 
  0000000053 00000 n 
  0000000125 00000 n 
  0000000185 00000 n 
  trailer
  <<
  /Size 5
  /Root 1 0 R
  >>
  startxref
  500
  %%EOF`
  }

  // Simulated analysis results for Petrol d.d.
  const analysisResults = {
    overallScore: 7.4,
    riskLevel: "Medium-Low",
    processingTime: "12.3s",
    confidence: 0.87,
    dataQuality: "High",
    keyFindings: [
      {
        questionId: 1,
        question: "Total operating revenues and YoY trend",
        finding:
          "Petrol d.d. reported total operating revenues of €4.1B in 2024, representing a 11.4% YoY increase from €3.68B in 2023. This growth outpaces the regional energy sector average of 8.3%.",
        confidence: 0.92,
        trend: "positive",
        sources: ["Income Statement 2024", "Income Statement 2023"],
        ruleTriggered: "Revenue growth > 10% YoY",
      },
      {
        questionId: 3,
        question: "Trends in gross profit and margin",
        finding:
          "Gross profit increased to €1.27B (31.1% margin) in 2024 from €1.06B (28.8% margin) in 2023. The 230bp margin expansion indicates improved operational efficiency and favorable pricing dynamics in the energy retail segment.",
        confidence: 0.89,
        trend: "positive",
        sources: ["Income Statement 2024", "Sector Benchmark Data"],
        ruleTriggered: "Gross margin expansion > 200bp",
      },
      {
        questionId: 4,
        question: "EBITDA evolution over last 3 years",
        finding:
          "EBITDA showed consistent growth: €520M (2022), €580M (2023), €780M (2024). The 34.5% YoY increase in 2024 significantly exceeds sector median of 12.1%, indicating strong operational leverage.",
        confidence: 0.91,
        trend: "positive",
        sources: ["Multi-year Income Statements", "Industry Analysis"],
        ruleTriggered: "EBITDA growth > 30% YoY",
      },
      {
        questionId: 8,
        question: "Profitability vs sector peers",
        finding:
          "Petrol d.d.'s EBITDA margin of 19.0% exceeds regional energy retail peers (avg. 16.2%) and approaches integrated oil companies (avg. 20.5%). ROE of 14.2% outperforms sector average of 11.8%.",
        confidence: 0.85,
        trend: "positive",
        sources: ["Peer Benchmarking Database", "Ljubljana Stock Exchange Data"],
        ruleTriggered: "EBITDA margin > sector average + 200bp",
      },
      {
        questionId: 11,
        question: "Relationship between inflation and OPEX",
        finding:
          "Operating expenses increased 15.2% YoY while regional inflation averaged 8.1%. The 710bp differential suggests some operational inefficiencies, though partially offset by business expansion and higher energy prices.",
        confidence: 0.78,
        trend: "neutral",
        sources: ["Income Statement", "Slovenia Statistical Office"],
        ruleTriggered: "OPEX growth > inflation + 500bp",
      },
      {
        questionId: 15,
        question: "Projections for income growth and risk areas",
        finding:
          "Forward-looking indicators suggest continued revenue growth (8-12% projected) driven by energy transition investments. Key risks include regulatory changes in fuel pricing and potential margin pressure from renewable energy transition.",
        confidence: 0.73,
        trend: "neutral",
        sources: ["Management Guidance", "Regulatory Filings", "Industry Forecasts"],
        ruleTriggered: "Forward guidance available",
      },
    ],
    benchmarkData: [
      { metric: "Revenue Growth (YoY)", petrol: "11.4%", sectorAvg: "8.3%", status: "outperform" },
      { metric: "EBITDA Margin", petrol: "19.0%", sectorAvg: "16.2%", status: "outperform" },
      { metric: "ROE", petrol: "14.2%", sectorAvg: "11.8%", status: "outperform" },
      { metric: "Asset Turnover", petrol: "1.8x", sectorAvg: "1.6x", status: "outperform" },
      { metric: "OPEX/Revenue", petrol: "78.1%", sectorAvg: "76.4%", status: "underperform" },
    ],
    riskIndicators: [
      {
        category: "Operational Risk",
        level: "Medium",
        description: "OPEX growth outpacing inflation may indicate efficiency challenges",
        mitigation: "Management focus on cost optimization and automation initiatives",
      },
      {
        category: "Market Risk",
        level: "Medium",
        description: "Exposure to energy price volatility and regulatory changes",
        mitigation: "Diversified business model across retail, wholesale, and services",
      },
      {
        category: "Transition Risk",
        level: "Low-Medium",
        description: "Energy transition may impact traditional fuel business",
        mitigation: "Active investment in renewable energy and EV infrastructure",
      },
    ],
    dataAlerts: [
      {
        type: "info",
        message: "Revenue breakdown by geography not available in provided statements",
      },
      {
        type: "warning",
        message: "Hedging activities data incomplete - may affect earnings volatility assessment",
      },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Analysis Summary Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Petrol d.d. Income Statement Analysis
              </CardTitle>
              <CardDescription>
                AI-Generated Credit Analysis • Generated in {analysisResults.processingTime}
              </CardDescription>
            </div>
            <div className="text-right space-y-2">
              <div className="text-2xl font-bold text-gray-900">{analysisResults.overallScore}/10</div>
              <Badge variant="default">{analysisResults.riskLevel} Risk</Badge>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Confidence: {(analysisResults.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Data Quality Alerts */}
      {analysisResults.dataAlerts.length > 0 && (
        <div className="space-y-2">
          {analysisResults.dataAlerts.map((alert, index) => (
            <Alert key={index} variant={alert.type === "warning" ? "destructive" : "default"}>
              <Info className="h-4 w-4" />
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <Tabs defaultValue="findings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="findings">Key Findings</TabsTrigger>
          <TabsTrigger value="benchmarks">Sector Benchmarking</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
          <TabsTrigger value="methodology">Analysis Methodology</TabsTrigger>
        </TabsList>

        <TabsContent value="findings" className="space-y-4">
          <div className="grid gap-4">
            {analysisResults.keyFindings.map((finding, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="outline">Q{finding.questionId}</Badge>
                          <h3 className="font-semibold text-gray-900">{finding.question}</h3>
                          {finding.trend === "positive" && <TrendingUp className="h-5 w-5 text-green-500" />}
                          {finding.trend === "neutral" && <CheckCircle className="h-5 w-5 text-yellow-500" />}
                          {finding.trend === "negative" && <TrendingDown className="h-5 w-5 text-red-500" />}
                        </div>
                        <p className="text-gray-700 mb-3 leading-relaxed">{finding.finding}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm text-gray-500">Confidence:</span>
                          <Progress value={finding.confidence * 100} className="w-16 h-2" />
                          <span className="text-sm font-medium">{(finding.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Rule Triggered:</span>
                        <p className="text-sm font-medium text-blue-600">{finding.ruleTriggered}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Sources:</span>
                        <p className="text-sm text-gray-700">{finding.sources.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sector Benchmarking Analysis</CardTitle>
              <CardDescription>Petrol d.d. vs Regional Energy Sector Peers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisResults.benchmarkData.map((benchmark, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{benchmark.metric}</div>
                      <div className="text-sm text-gray-600">
                        Petrol d.d.: <span className="font-medium text-blue-600">{benchmark.petrol}</span> | Sector Avg:{" "}
                        <span className="font-medium">{benchmark.sectorAvg}</span>
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

        <TabsContent value="risks" className="space-y-4">
          <div className="grid gap-4">
            {analysisResults.riskIndicators.map((risk, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle
                      className={`h-6 w-6 mt-1 ${
                        risk.level === "High"
                          ? "text-red-500"
                          : risk.level === "Medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{risk.category}</h3>
                        <Badge
                          variant={
                            risk.level === "High" ? "destructive" : risk.level === "Medium" ? "secondary" : "default"
                          }
                        >
                          {risk.level}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-2">{risk.description}</p>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Mitigation:</strong> {risk.mitigation}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="methodology" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Methodology</CardTitle>
              <CardDescription>AI-driven analysis approach and data sources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Rule-Based Analysis</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Revenue growth thresholds &gt;10% flagged as strong</li>
                    <li>• Margin expansion rules &gt;200bp significant</li>
                    <li>• OPEX vs inflation differential analysis</li>
                    <li>• Sector benchmark deviation triggers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">ML-Driven Insights</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Pattern recognition in multi-year trends</li>
                    <li>• Anomaly detection in financial ratios</li>
                    <li>• Peer clustering and similarity analysis</li>
                    <li>• Forward-looking risk indicator modeling</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Data Sources & Quality</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Primary Sources:</span>
                    <p className="font-medium">Petrol d.d. Annual Reports (2021-2024)</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Benchmark Data:</span>
                    <p className="font-medium">Regional Energy Sector Database</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Processing Time:</span>
                    <p className="font-medium">{analysisResults.processingTime}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Data Quality Score:</span>
                    <p className="font-medium">{analysisResults.dataQuality}</p>
                  </div>
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
