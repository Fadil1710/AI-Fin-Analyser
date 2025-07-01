"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Building2, Users, Shield, AlertTriangle, Download, BookOpen, Info, MapPin, Target } from "lucide-react"

interface PetrolBusinessAnalysisProps {
  onExport: () => void
  analysisConfig: any
}

export function PetrolBusinessAnalysis({ onExport, analysisConfig }: PetrolBusinessAnalysisProps) {
  const { toast } = useToast()

  const viewDetailedReport = () => {
    toast({
      title: "Generating detailed report",
      description: "Comprehensive business analysis report is being prepared...",
    })

    // Simulate detailed report generation
    setTimeout(() => {
      const reportContent = generateDetailedBusinessReport()
      const blob = new Blob([reportContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      window.open(url, "_blank")

      toast({
        title: "Detailed report ready",
        description: "Report opened in new window",
      })
    }, 2000)
  }

  const generateDetailedBusinessReport = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Petrol d.d. Business Model Analysis - Detailed Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { border-bottom: 2px solid #16a34a; padding-bottom: 20px; margin-bottom: 30px; }
          .section { margin-bottom: 30px; }
          .finding { background: #f0fdf4; padding: 15px; margin: 10px 0; border-left: 4px solid #16a34a; }
          .confidence { color: #059669; font-weight: bold; }
          .sources { color: #6b7280; font-size: 0.9em; }
          .segment { background: #f8fafc; padding: 15px; margin: 10px 0; border-radius: 8px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #d1d5db; padding: 12px; text-align: left; }
          th { background-color: #f3f4f6; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Petrol d.d. Business Model Analysis</h1>
          <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Overall Score:</strong> ${businessAnalysis.overallScore}/10</p>
          <p><strong>Business Strength:</strong> ${businessAnalysis.businessStrength}</p>
          <p><strong>Confidence:</strong> <span class="confidence">${(businessAnalysis.confidence * 100).toFixed(0)}%</span></p>
        </div>
        
        <div class="section">
          <h2>Executive Summary</h2>
          <p>Petrol d.d. operates a diversified business model across Southeast Europe with strong market positions in fuel retail, convenience stores, and emerging energy solutions. The company demonstrates strategic adaptation to energy transition while maintaining operational excellence.</p>
        </div>
        
        <div class="section">
          <h2>Business Segments</h2>
          ${businessAnalysis.businessSegments
            .map(
              (segment) => `
            <div class="segment">
              <h3>${segment.segment}</h3>
              <p><strong>Revenue:</strong> ${segment.revenue} (${segment.percentage}% of total)</p>
              <p><strong>Growth:</strong> ${segment.growth}</p>
              <p><strong>Description:</strong> ${segment.description}</p>
              <p><strong>Infrastructure:</strong> ${segment.locations} locations, ${segment.employees} employees</p>
            </div>
          `,
            )
            .join("")}
        </div>
        
        <div class="section">
          <h2>Geographic Footprint</h2>
          <table>
            <thead>
              <tr><th>Country</th><th>Revenue %</th><th>Locations</th><th>Employees</th><th>Market Position</th></tr>
            </thead>
            <tbody>
              ${businessAnalysis.geographicBreakdown
                .map(
                  (geo) => `
                <tr>
                  <td>${geo.country}</td>
                  <td>${geo.revenue}%</td>
                  <td>${geo.locations}</td>
                  <td>${geo.employees}</td>
                  <td>${geo.marketPosition}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
        
        <div class="section">
          <h2>Key Business Insights</h2>
          ${businessAnalysis.keyFindings
            .map(
              (finding) => `
            <div class="finding">
              <h3>Q${finding.questionId}: ${finding.question}</h3>
              <p>${finding.finding}</p>
              <p class="confidence">Confidence: ${(finding.confidence * 100).toFixed(0)}%</p>
              <p><strong>Business Impact:</strong> ${finding.businessImpact}</p>
              <p class="sources">Sources: ${finding.sources.join(", ")}</p>
            </div>
          `,
            )
            .join("")}
        </div>
        
        <div class="section">
          <h2>Risk Assessment</h2>
          ${businessAnalysis.riskFactors
            .map(
              (risk) => `
            <div class="finding">
              <h3>${risk.category} - ${risk.level}</h3>
              <p><strong>Description:</strong> ${risk.description}</p>
              <p><strong>Mitigation:</strong> ${risk.mitigation}</p>
              <p><strong>Impact:</strong> ${risk.impact}</p>
            </div>
          `,
            )
            .join("")}
        </div>
        
        <div class="section">
          <h2>Methodology</h2>
          <p>This business model analysis was generated using multi-source data fusion, semantic search, and AI-driven business intelligence. Sources include annual reports, ESG documentation, investor presentations, and external market data.</p>
          <p><strong>Processing Time:</strong> ${businessAnalysis.processingTime}</p>
          <p><strong>Data Quality:</strong> ${businessAnalysis.dataQuality}</p>
          <p><strong>Last Updated:</strong> ${businessAnalysis.lastUpdated}</p>
        </div>
      </body>
      </html>
    `
  }

  const handleExportPDF = () => {
    toast({
      title: "Generating PDF report",
      description: "Creating comprehensive business model PDF...",
    })

    // Simulate PDF generation and download
    setTimeout(() => {
      const pdfContent = generateBusinessPDFContent()
      const blob = new Blob([pdfContent], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      // Create download link
      const link = document.createElement("a")
      link.href = url
      link.download = `Petrol_dd_Business_Model_Analysis_${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up
      URL.revokeObjectURL(url)

      toast({
        title: "PDF exported successfully",
        description: "Business model report has been downloaded",
      })

      // Call the original onExport function
      onExport()
    }, 3000)
  }

  const generateBusinessPDFContent = () => {
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
/Length 250
>>
stream
BT
/F1 12 Tf
50 750 Td
(Petrol d.d. Business Model Analysis Report) Tj
0 -20 Td
(Generated: ${new Date().toLocaleDateString()}) Tj
0 -20 Td
(Overall Score: ${businessAnalysis.overallScore}/10) Tj
0 -20 Td
(Business Strength: ${businessAnalysis.businessStrength}) Tj
0 -40 Td
(This comprehensive business model analysis covers:) Tj
0 -20 Td
(- Business segments and revenue distribution) Tj
0 -20 Td
(- Geographic footprint across 6 countries) Tj
0 -20 Td
(- Strategic partnerships and initiatives) Tj
0 -20 Td
(- Risk assessment and mitigation strategies) Tj
0 -40 Td
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
600
%%EOF`
  }

  // Simulated comprehensive business analysis results for Petrol d.d.
  const businessAnalysis = {
    overallScore: 8.1,
    businessStrength: "Strong",
    processingTime: "11.7s",
    confidence: 0.91,
    dataQuality: "High",
    lastUpdated: "2024-01-15",
    keyFindings: [
      {
        questionId: 1,
        question: "Main business segments",
        finding:
          "Petrol d.d. operates through four primary business segments: (1) Fuel Sales & Energy (68% of revenue), (2) Retail & Convenience (18%), (3) Logistics & Infrastructure (9%), and (4) Energy Solutions & Services (5%). The company has successfully diversified beyond traditional fuel retail.",
        confidence: 0.94,
        sources: ["Annual Report 2023", "Investor Presentation Q3 2024", "Company Website"],
        businessImpact: "High",
      },
      {
        questionId: 3,
        question: "Geographic footprint",
        finding:
          "Petrol d.d. operates across 6 countries in Southeast Europe: Slovenia (home market, 45% of revenue), Croatia (22%), Bosnia & Herzegovina (15%), Serbia (12%), Montenegro (4%), and North Macedonia (2%). The company maintains 482 retail locations across these markets.",
        confidence: 0.89,
        sources: ["Annual Report 2023", "Market Analysis Reports", "Company Filings"],
        businessImpact: "High",
      },
      {
        questionId: 6,
        question: "Revenue generation model",
        finding:
          "Revenue is generated through: (1) Fuel wholesale and retail margins (primary), (2) Convenience store operations, (3) Logistics and storage services, (4) Energy consulting and solutions, (5) Real estate leasing. The company benefits from integrated value chain control from procurement to retail.",
        confidence: 0.87,
        sources: ["Business Model Documentation", "Financial Statements", "Industry Analysis"],
        businessImpact: "High",
      },
      {
        questionId: 11,
        question: "Strategic partnerships",
        finding:
          "Key partnerships include: (1) OMV Group (strategic fuel supply), (2) MOL Group (regional cooperation), (3) Local renewable energy developers, (4) EV charging network partners (IONITY), (5) Digital payment providers. These partnerships strengthen market position and enable energy transition.",
        confidence: 0.83,
        sources: ["Press Releases", "Partnership Announcements", "Industry Reports"],
        businessImpact: "Medium-High",
      },
      {
        questionId: 12,
        question: "ESG and regulatory impact",
        finding:
          "EU Green Deal and national carbon reduction targets are driving business model evolution. Petrol has invested €45M in renewable energy projects and EV infrastructure. Regulatory compliance costs increased 12% YoY, but ESG initiatives opened new revenue streams worth €23M annually.",
        confidence: 0.81,
        sources: ["ESG Report 2023", "Regulatory Filings", "Sustainability Documentation"],
        businessImpact: "High",
      },
      {
        questionId: 17,
        question: "Ownership structure",
        finding:
          "Petrol d.d. is publicly traded on Ljubljana Stock Exchange (PETG). Major shareholders: Republic of Slovenia (25.01%), Kapitalska družba d.d. (10.73%), institutional investors (35.2%), retail investors (29.06%). No single controlling shareholder, providing management independence.",
        confidence: 0.92,
        sources: ["Stock Exchange Filings", "Shareholder Reports", "Corporate Governance Report"],
        businessImpact: "Medium",
      },
    ],
    businessSegments: [
      {
        segment: "Fuel Sales & Energy",
        revenue: "€2.79B",
        percentage: 68,
        growth: "+11.2%",
        description: "Wholesale and retail fuel distribution, energy trading",
        locations: 482,
        employees: 2840,
      },
      {
        segment: "Retail & Convenience",
        revenue: "€738M",
        percentage: 18,
        growth: "+8.7%",
        description: "Convenience stores, food services, car wash",
        locations: 380,
        employees: 1650,
      },
      {
        segment: "Logistics & Infrastructure",
        revenue: "€369M",
        percentage: 9,
        growth: "+15.3%",
        description: "Storage facilities, transportation, logistics services",
        locations: 12,
        employees: 420,
      },
      {
        segment: "Energy Solutions",
        revenue: "€205M",
        percentage: 5,
        growth: "+28.4%",
        description: "Renewable energy, EV charging, energy consulting",
        locations: 45,
        employees: 180,
      },
    ],
    geographicBreakdown: [
      { country: "Slovenia", revenue: 45, locations: 217, employees: 2890, marketPosition: "Market Leader" },
      { country: "Croatia", revenue: 22, locations: 128, employees: 1420, marketPosition: "Strong #2" },
      {
        country: "Bosnia & Herzegovina",
        revenue: 15,
        locations: 87,
        employees: 680,
        marketPosition: "Regional Player",
      },
      { country: "Serbia", revenue: 12, locations: 35, employees: 520, marketPosition: "Growing Presence" },
      { country: "Montenegro", revenue: 4, locations: 12, employees: 180, marketPosition: "Niche Player" },
      { country: "North Macedonia", revenue: 2, locations: 3, employees: 90, marketPosition: "New Market" },
    ],
    riskFactors: [
      {
        category: "Market Risk",
        level: "Medium",
        description: "Exposure to fuel price volatility and demand fluctuations",
        mitigation: "Diversified revenue streams and hedging strategies",
        impact: "Revenue volatility 8-12% annually",
      },
      {
        category: "Regulatory Risk",
        level: "Medium-High",
        description: "EU environmental regulations and carbon pricing mechanisms",
        mitigation: "Proactive ESG investments and compliance programs",
        impact: "Compliance costs €12M annually, offset by green revenues",
      },
      {
        category: "Technology Risk",
        level: "Medium",
        description: "Energy transition and EV adoption affecting fuel demand",
        mitigation: "Investment in EV charging and renewable energy",
        impact: "Traditional fuel volumes declining 2-3% annually",
      },
    ],
    dataAlerts: [
      {
        type: "info",
        message: "Real-time stock price data requires market data subscription",
      },
      {
        type: "warning",
        message: "Management board changes in last 6 months - please verify current composition",
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
                <Building2 className="h-5 w-5 mr-2 text-green-600" />
                Petrol d.d. Business Model Analysis
              </CardTitle>
              <CardDescription>
                AI-Generated Business Analysis • Generated in {businessAnalysis.processingTime} • Last Updated:{" "}
                {businessAnalysis.lastUpdated}
              </CardDescription>
            </div>
            <div className="text-right space-y-2">
              <div className="text-2xl font-bold text-gray-900">{businessAnalysis.overallScore}/10</div>
              <Badge variant="default">{businessAnalysis.businessStrength} Business Model</Badge>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Confidence: {(businessAnalysis.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Data Quality Alerts */}
      {businessAnalysis.dataAlerts.length > 0 && (
        <div className="space-y-2">
          {businessAnalysis.dataAlerts.map((alert, index) => (
            <Alert key={index} variant={alert.type === "warning" ? "destructive" : "default"}>
              <Info className="h-4 w-4" />
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Business Overview</TabsTrigger>
          <TabsTrigger value="segments">Business Segments</TabsTrigger>
          <TabsTrigger value="geography">Geographic Footprint</TabsTrigger>
          <TabsTrigger value="strategy">Strategy & Partnerships</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
          <TabsTrigger value="methodology">Analysis Methodology</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {businessAnalysis.keyFindings.map((finding, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="outline">Q{finding.questionId}</Badge>
                          <h3 className="font-semibold text-gray-900">{finding.question}</h3>
                          <Badge
                            variant={
                              finding.businessImpact === "High"
                                ? "default"
                                : finding.businessImpact === "Medium-High"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {finding.businessImpact} Impact
                          </Badge>
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
                        <span className="text-sm text-gray-500">Business Impact:</span>
                        <p className="text-sm font-medium text-green-600">{finding.businessImpact}</p>
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

        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Segment Analysis</CardTitle>
              <CardDescription>Revenue contribution and performance by business segment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {businessAnalysis.businessSegments.map((segment, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{segment.segment}</h3>
                        <p className="text-sm text-gray-600">{segment.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{segment.revenue}</div>
                        <div className="text-sm text-gray-500">{segment.percentage}% of total</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Growth:</span>
                        <p className="font-medium text-green-600">{segment.growth}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Locations:</span>
                        <p className="font-medium">{segment.locations}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Employees:</span>
                        <p className="font-medium">{segment.employees}</p>
                      </div>
                      <div>
                        <Progress value={segment.percentage} className="w-full mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Footprint</CardTitle>
              <CardDescription>Market presence across Southeast Europe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {businessAnalysis.geographicBreakdown.map((geo, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">{geo.country}</div>
                        <div className="text-sm text-gray-600">{geo.marketPosition}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{geo.revenue}%</div>
                        <div className="text-gray-500">Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{geo.locations}</div>
                        <div className="text-gray-500">Locations</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{geo.employees}</div>
                        <div className="text-gray-500">Employees</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  Strategic Initiatives
                </CardTitle>
                <CardDescription>Key strategic focus areas and growth initiatives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Energy Transition Leadership</h4>
                    <p className="text-green-800 text-sm">
                      €45M invested in renewable energy projects and EV charging infrastructure. Target: 100 EV charging
                      points by 2025, 15% revenue from clean energy by 2027.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Digital Transformation</h4>
                    <p className="text-blue-800 text-sm">
                      Implementation of AI-driven inventory management, mobile payment solutions, and customer loyalty
                      platforms. Digital sales channels contributing 12% of retail revenue.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Regional Expansion</h4>
                    <p className="text-purple-800 text-sm">
                      Strategic focus on Serbia and North Macedonia markets. Plan to add 25 new locations in 2024-2025,
                      targeting 15% market share in key urban areas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  Strategic Partnerships
                </CardTitle>
                <CardDescription>Key alliances and collaborative relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">OMV Group</div>
                      <div className="text-sm text-gray-600">Strategic fuel supply and technology sharing</div>
                    </div>
                    <Badge variant="default">Primary Partner</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">IONITY Network</div>
                      <div className="text-sm text-gray-600">EV fast-charging infrastructure development</div>
                    </div>
                    <Badge variant="secondary">Strategic Alliance</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Local Renewable Developers</div>
                      <div className="text-sm text-gray-600">Solar and wind energy project partnerships</div>
                    </div>
                    <Badge variant="outline">Joint Ventures</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <div className="grid gap-4">
            {businessAnalysis.riskFactors.map((risk, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle
                      className={`h-6 w-6 mt-1 ${
                        risk.level === "High"
                          ? "text-red-500"
                          : risk.level === "Medium-High"
                            ? "text-orange-500"
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
                            risk.level === "High"
                              ? "destructive"
                              : risk.level === "Medium-High"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {risk.level}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-2">{risk.description}</p>
                      <div className="p-3 bg-blue-50 rounded-lg mb-2">
                        <p className="text-sm text-blue-800">
                          <strong>Mitigation:</strong> {risk.mitigation}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Impact:</strong> {risk.impact}
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
              <CardDescription>AI-driven business model analysis approach and data sources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Data Sources</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Annual Reports (2021-2024)</li>
                    <li>• ESG and Sustainability Reports</li>
                    <li>• Investor Presentations</li>
                    <li>• Stock Exchange Filings</li>
                    <li>• Company Website and Press Releases</li>
                    <li>• Industry Analysis Reports</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Analysis Techniques</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Multi-source data fusion</li>
                    <li>• Semantic search and routing</li>
                    <li>• Business model pattern recognition</li>
                    <li>• Competitive positioning analysis</li>
                    <li>• Risk factor identification</li>
                    <li>• Strategic initiative assessment</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Quality Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Processing Time:</span>
                    <p className="font-medium">{businessAnalysis.processingTime}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Data Quality:</span>
                    <p className="font-medium">{businessAnalysis.dataQuality}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Source Coverage:</span>
                    <p className="font-medium">18 Questions Addressed</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Confidence Level:</span>
                    <p className="font-medium">{(businessAnalysis.confidence * 100).toFixed(0)}%</p>
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
