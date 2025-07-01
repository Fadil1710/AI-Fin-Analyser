"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import {
  FileSpreadsheet,
  TrendingUp,
  AlertTriangle,
  Download,
  Settings,
  BarChart3,
  Play,
  RefreshCw,
} from "lucide-react"
import { DataUploadZone } from "./data-upload-zone"
import { FinancialCharts } from "./financial-charts"
import { Checkbox } from "@/components/ui/checkbox"
import { PetrolAnalysisResults } from "./petrol-analysis-results"

export function IncomeStatementModule() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [analysisConfig, setAnalysisConfig] = useState({
    scope: "comprehensive",
    detail: [75],
    tone: "professional",
    benchmarkIndustry: "energy",
    customPrompt: "",
    enabledQuestions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    outputLength: "medium",
    technicalDepth: "analyst",
    includeBenchmarking: true,
    includeForwardLooking: true,
    confidenceThreshold: 0.8,
  })
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")
  const { toast } = useToast()

  const incomeStatementQuestions = [
    { id: 1, text: "What are client's total operating revenues and their YoY trend?" },
    { id: 2, text: "What portion of revenue is generated from core operations?" },
    { id: 3, text: "What are the trends in gross profit and margin?" },
    { id: 4, text: "How has EBITDA evolved over the last 3 years?" },
    { id: 5, text: "What are the main operating expense categories and their trends?" },
    { id: 6, text: "Are there seasonal or cyclical patterns in revenue or profitability?" },
    { id: 7, text: "What are the key drivers of operating profit increases or decreases?" },
    { id: 8, text: "How does client's profitability compare to sector peers?" },
    { id: 9, text: "Are there any exceptional or one-time items impacting the net income?" },
    { id: 10, text: "What are the implications of price volatility on top-line growth?" },
    { id: 11, text: "What is the relationship between inflation and OPEX?" },
    { id: 12, text: "Are there signs of margin compression or expansion?" },
    { id: 13, text: "How has net income evolved and what are the tax impacts?" },
    { id: 14, text: "Are financial subsidies or hedging activities influencing reported earnings?" },
    { id: 15, text: "What are the projections for income growth or risk areas in the next period?" },
    { id: 16, text: "What is the client's profitability and leverage level in comparison to industry averages?" },
  ]

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files)
    toast({
      title: "Files uploaded successfully",
      description: `${files.length} file(s) uploaded and validated`,
    })
    // Auto-advance to configuration tab
    setTimeout(() => setActiveTab("configure"), 1000)
  }

  const handleConfigSave = () => {
    toast({
      title: "Configuration saved",
      description: "Analysis parameters have been updated",
    })
    setActiveTab("analysis")
  }

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    toast({
      title: "Analysis started",
      description: "Processing financial data...",
    })

    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
      setActiveTab("results")
      toast({
        title: "Analysis completed",
        description: "Financial analysis results are ready",
      })
    }, 3000)
  }

  const exportReport = () => {
    toast({
      title: "Exporting report",
      description: "PDF report is being generated...",
    })
    // Simulate PDF generation
    setTimeout(() => {
      toast({
        title: "Report exported",
        description: "PDF report has been downloaded",
      })
    }, 2000)
  }

  const resetAnalysis = () => {
    setUploadedFiles([])
    setShowResults(false)
    setActiveTab("upload")
    toast({
      title: "Analysis reset",
      description: "Ready for new analysis",
    })
  }

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FileSpreadsheet className="h-6 w-6 mr-3 text-blue-600" />
              Income Statement Analysis
            </h2>
            <p className="text-gray-600 mt-1">Automated analysis of structured financial data for credit assessment</p>
            <Badge variant="secondary" className="mt-2">
              Credit Analysts
            </Badge>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={resetAnalysis}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={exportReport} disabled={!showResults}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Data Upload</TabsTrigger>
          <TabsTrigger value="configure" disabled={uploadedFiles.length === 0}>
            Configuration
          </TabsTrigger>
          <TabsTrigger value="analysis" disabled={uploadedFiles.length === 0}>
            Analysis
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!showResults}>
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Financial Data</CardTitle>
              <CardDescription>
                Upload Excel files containing Revenue, COGS, OPEX, EBITDA, and Net Income data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataUploadZone onFileUpload={handleFileUpload} acceptedTypes={[".xlsx", ".xls", ".csv"]} maxFiles={5} />

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Uploaded Files ({uploadedFiles.length})</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileSpreadsheet className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="font-medium">{file.name}</div>
                            <div className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                          </div>
                        </div>
                        <Badge variant="outline">Validated</Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={() => setActiveTab("configure")}>Continue to Configuration</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configure" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Configuration</CardTitle>
              <CardDescription>Customize the scope, detail level, and parameters for your analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="scope">Analysis Scope</Label>
                    <Select
                      value={analysisConfig.scope}
                      onValueChange={(value) => setAnalysisConfig({ ...analysisConfig, scope: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic Analysis</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                        <SelectItem value="detailed">Detailed Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tone">Report Tone</Label>
                    <Select
                      value={analysisConfig.tone}
                      onValueChange={(value) => setAnalysisConfig({ ...analysisConfig, tone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="executive">Executive Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="industry">Benchmark Industry</Label>
                    <Select
                      value={analysisConfig.benchmarkIndustry}
                      onValueChange={(value) => setAnalysisConfig({ ...analysisConfig, benchmarkIndustry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="energy">Energy & Utilities</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="detail">Detail Level: {analysisConfig.detail[0]}%</Label>
                    <Slider
                      value={analysisConfig.detail}
                      onValueChange={(value) => setAnalysisConfig({ ...analysisConfig, detail: value })}
                      max={100}
                      step={25}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="custom-prompt">Custom Analysis Prompt (Optional)</Label>
                <Textarea
                  placeholder="Enter specific areas of focus or custom instructions for the analysis..."
                  className="mt-2"
                  value={analysisConfig.customPrompt}
                  onChange={(e) => setAnalysisConfig({ ...analysisConfig, customPrompt: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-base font-medium">Analysis Questions</Label>
                <p className="text-sm text-gray-600 mb-4">Select specific questions to address in the analysis</p>
                <div className="max-h-60 overflow-y-auto space-y-2 border rounded-lg p-4">
                  {incomeStatementQuestions.map((question) => (
                    <div key={question.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={`question-${question.id}`}
                        checked={analysisConfig.enabledQuestions.includes(question.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setAnalysisConfig({
                              ...analysisConfig,
                              enabledQuestions: [...analysisConfig.enabledQuestions, question.id],
                            })
                          } else {
                            setAnalysisConfig({
                              ...analysisConfig,
                              enabledQuestions: analysisConfig.enabledQuestions.filter((id) => id !== question.id),
                            })
                          }
                        }}
                      />
                      <label htmlFor={`question-${question.id}`} className="text-sm cursor-pointer">
                        <span className="font-medium">Q{question.id}:</span> {question.text}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="output-length">Output Length</Label>
                  <Select
                    value={analysisConfig.outputLength}
                    onValueChange={(value) => setAnalysisConfig({ ...analysisConfig, outputLength: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brief">Brief (200-300 words)</SelectItem>
                      <SelectItem value="medium">Medium (300-500 words)</SelectItem>
                      <SelectItem value="detailed">Detailed (500+ words)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="technical-depth">Technical Depth</Label>
                  <Select
                    value={analysisConfig.technicalDepth}
                    onValueChange={(value) => setAnalysisConfig({ ...analysisConfig, technicalDepth: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="executive">Executive Summary</SelectItem>
                      <SelectItem value="analyst">Credit Analyst</SelectItem>
                      <SelectItem value="technical">Technical Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="confidence">
                    Confidence Threshold: {(analysisConfig.confidenceThreshold * 100).toFixed(0)}%
                  </Label>
                  <Slider
                    value={[analysisConfig.confidenceThreshold * 100]}
                    onValueChange={(value) =>
                      setAnalysisConfig({ ...analysisConfig, confidenceThreshold: value[0] / 100 })
                    }
                    max={100}
                    min={50}
                    step={5}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-benchmarking"
                    checked={analysisConfig.includeBenchmarking}
                    onCheckedChange={(checked) =>
                      setAnalysisConfig({ ...analysisConfig, includeBenchmarking: !!checked })
                    }
                  />
                  <label htmlFor="include-benchmarking" className="font-medium cursor-pointer">
                    Include Sector Benchmarking
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-forward-looking"
                    checked={analysisConfig.includeForwardLooking}
                    onCheckedChange={(checked) =>
                      setAnalysisConfig({ ...analysisConfig, includeForwardLooking: !!checked })
                    }
                  />
                  <label htmlFor="include-forward-looking" className="font-medium cursor-pointer">
                    Include Forward-Looking Statements
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setActiveTab("upload")}>
                  Back
                </Button>
                <Button onClick={handleConfigSave}>
                  <Settings className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Run Analysis</CardTitle>
              <CardDescription>
                Execute the financial analysis based on your uploaded data and configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Trend Analysis</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Automated detection of revenue, cost, and profitability trends
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Benchmarking</span>
                    </div>
                    <p className="text-sm text-gray-600">Comparison with industry standards and peer companies</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Risk Detection</span>
                    </div>
                    <p className="text-sm text-gray-600">Identification of volatility patterns and risk factors</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Analysis Configuration Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Scope:</span>{" "}
                      <span className="font-medium">{analysisConfig.scope}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Industry:</span>{" "}
                      <span className="font-medium">{analysisConfig.benchmarkIndustry}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Detail Level:</span>{" "}
                      <span className="font-medium">{analysisConfig.detail[0]}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Tone:</span>{" "}
                      <span className="font-medium">{analysisConfig.tone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button variant="outline" onClick={() => setActiveTab("configure")}>
                    Back to Configuration
                  </Button>
                  <Button onClick={runAnalysis} size="lg" disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Run Complete Analysis
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {showResults ? (
            <>
              <FinancialCharts />
              <PetrolAnalysisResults onExport={exportReport} analysisConfig={analysisConfig} />
            </>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Results</h3>
                  <p className="text-gray-600">Upload data and run analysis to see results here</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
