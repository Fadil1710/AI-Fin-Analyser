"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import {
  FileText,
  Building2,
  Leaf,
  Users,
  Download,
  Settings,
  Globe,
  Shield,
  Target,
  Play,
  RefreshCw,
  Briefcase,
} from "lucide-react"
import { DataUploadZone } from "./data-upload-zone"
import { PetrolBusinessAnalysis } from "./petrol-business-analysis"

export function BusinessModelModule() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [analysisConfig, setAnalysisConfig] = useState({
    focusAreas: ["segments", "geography", "strategy", "partnerships", "esg"],
    reportLength: "medium",
    includeVisuals: true,
    specificQuestions: "",
    enabledQuestions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    outputTone: "professional",
    technicalDepth: "relationship-manager",
    includeOwnership: true,
    includeManagement: true,
    includeStockPrice: true,
    confidenceThreshold: 0.8,
    dataSourcePriority: "external",
  })
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")
  const { toast } = useToast()

  const businessModelQuestions = [
    { id: 1, text: "What are client's main business segments?" },
    { id: 2, text: "How much revenue is contributed by each segment?" },
    { id: 3, text: "What is client's geographic footprint?" },
    { id: 4, text: "What percentage of sales is domestic vs. international?" },
    { id: 5, text: "What are the most recognized brands?" },
    { id: 6, text: "How does client generate revenue?" },
    { id: 7, text: "What kind of logistic and supply chain infrastructure does client own?" },
    { id: 8, text: "Are client's assets mostly owned or leased?" },
    { id: 9, text: "What is the employee distribution by segment and geography?" },
    { id: 10, text: "How has client's revenue evolved over the last 3–5 years?" },
    { id: 11, text: "What strategic partnerships has client formed?" },
    { id: 12, text: "What impact have regulations and ESG policies had on their business model?" },
    { id: 13, text: "What are the growth areas identified in client's public strategy?" },
    { id: 14, text: "How resilient is client's business model to global issues, risks, challenges?" },
    { id: 15, text: "What digital and operational innovations are integrated in client's model?" },
    { id: 16, text: "Who are members of the management board and have there been any changes?" },
    { id: 17, text: "What is the ownership structure of the client, are there any predominate influences?" },
    { id: 18, text: "If the client stocks are listed on the market, provide the share price movements." },
  ]

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files)
    toast({
      title: "Documents uploaded successfully",
      description: `${files.length} document(s) uploaded and processed`,
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
      description: "Processing business documents and external data...",
    })

    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
      setActiveTab("results")
      toast({
        title: "Analysis completed",
        description: "Business model analysis results are ready",
      })
    }, 4000)
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

  const focusAreaOptions = [
    { id: "segments", label: "Business Segments", icon: Briefcase },
    { id: "geography", label: "Geographic Footprint", icon: Globe },
    { id: "strategy", label: "Strategic Analysis", icon: Target },
    { id: "partnerships", label: "Strategic Partnerships", icon: Users },
    { id: "esg", label: "ESG & Compliance", icon: Leaf },
    { id: "ownership", label: "Ownership Structure", icon: Shield },
  ]

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Building2 className="h-6 w-6 mr-3 text-green-600" />
              Business Model Analysis
            </h2>
            <p className="text-gray-600 mt-1">
              Strategic analysis of business activities and model for comprehensive business insights
            </p>
            <Badge variant="secondary" className="mt-2">
              Relationship Managers
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
          <TabsTrigger value="upload">Document Upload</TabsTrigger>
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
              <CardTitle>Upload Business Documents</CardTitle>
              <CardDescription>
                Upload PDFs and DOCX files including annual reports, ESG reports, investor presentations, and other
                business documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataUploadZone onFileUpload={handleFileUpload} acceptedTypes={[".pdf", ".docx", ".doc"]} maxFiles={15} />

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Uploaded Documents ({uploadedFiles.length})</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">{file.name}</div>
                            <div className="text-sm text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                              {file.type.includes("pdf") ? "PDF" : "Document"}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">Processed</Badge>
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
              <CardDescription>Select focus areas and customize the business model analysis parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Focus Areas</Label>
                <p className="text-sm text-gray-600 mb-4">Select the business areas you want to analyze in detail</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {focusAreaOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={option.id}
                        checked={analysisConfig.focusAreas.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setAnalysisConfig({
                              ...analysisConfig,
                              focusAreas: [...analysisConfig.focusAreas, option.id],
                            })
                          } else {
                            setAnalysisConfig({
                              ...analysisConfig,
                              focusAreas: analysisConfig.focusAreas.filter((area) => area !== option.id),
                            })
                          }
                        }}
                      />
                      <option.icon className="h-5 w-5 text-gray-600" />
                      <label htmlFor={option.id} className="font-medium cursor-pointer">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Business Model Questions</Label>
                <p className="text-sm text-gray-600 mb-4">Select specific questions to address in the analysis</p>
                <div className="max-h-60 overflow-y-auto space-y-2 border rounded-lg p-4">
                  {businessModelQuestions.map((question) => (
                    <div key={question.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={`bm-question-${question.id}`}
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
                      <label htmlFor={`bm-question-${question.id}`} className="text-sm cursor-pointer">
                        <span className="font-medium">Q{question.id}:</span> {question.text}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="report-length">Report Length</Label>
                    <Select
                      value={analysisConfig.reportLength}
                      onValueChange={(value) => setAnalysisConfig({ ...analysisConfig, reportLength: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brief">Brief Summary (200-300 words)</SelectItem>
                        <SelectItem value="medium">Medium Detail (300-500 words)</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive Report (500+ words)</SelectItem>
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
                        <SelectItem value="relationship-manager">Relationship Manager</SelectItem>
                        <SelectItem value="credit-analyst">Credit Analyst</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="data-source">Data Source Priority</Label>
                    <Select
                      value={analysisConfig.dataSourcePriority}
                      onValueChange={(value) => setAnalysisConfig({ ...analysisConfig, dataSourcePriority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="external">External Sources Priority</SelectItem>
                        <SelectItem value="uploaded">Uploaded Documents Priority</SelectItem>
                        <SelectItem value="balanced">Balanced Approach</SelectItem>
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
              </div>

              <div>
                <Label htmlFor="specific-questions">Specific Questions (Optional)</Label>
                <Textarea
                  placeholder="Enter specific questions or areas of concern you'd like the analysis to address..."
                  className="mt-2"
                  value={analysisConfig.specificQuestions}
                  onChange={(e) => setAnalysisConfig({ ...analysisConfig, specificQuestions: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-6 flex-wrap">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-visuals"
                    checked={analysisConfig.includeVisuals}
                    onCheckedChange={(checked) => setAnalysisConfig({ ...analysisConfig, includeVisuals: !!checked })}
                  />
                  <label htmlFor="include-visuals" className="font-medium cursor-pointer">
                    Include Visual Reports
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-ownership"
                    checked={analysisConfig.includeOwnership}
                    onCheckedChange={(checked) => setAnalysisConfig({ ...analysisConfig, includeOwnership: !!checked })}
                  />
                  <label htmlFor="include-ownership" className="font-medium cursor-pointer">
                    Include Ownership Analysis
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-management"
                    checked={analysisConfig.includeManagement}
                    onCheckedChange={(checked) =>
                      setAnalysisConfig({ ...analysisConfig, includeManagement: !!checked })
                    }
                  />
                  <label htmlFor="include-management" className="font-medium cursor-pointer">
                    Include Management Analysis
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-stock-price"
                    checked={analysisConfig.includeStockPrice}
                    onCheckedChange={(checked) =>
                      setAnalysisConfig({ ...analysisConfig, includeStockPrice: !!checked })
                    }
                  />
                  <label htmlFor="include-stock-price" className="font-medium cursor-pointer">
                    Include Stock Price Analysis
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
              <CardTitle>Run Business Model Analysis</CardTitle>
              <CardDescription>
                Execute comprehensive analysis of business activities, strategy, and model structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Business Segments</span>
                    </div>
                    <p className="text-sm text-gray-600">Revenue analysis by business segment and market positioning</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Geographic Analysis</span>
                    </div>
                    <p className="text-sm text-gray-600">Market presence and geographic revenue distribution</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Strategic Partnerships</span>
                    </div>
                    <p className="text-sm text-gray-600">Key alliances and partnership evaluation</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Analysis Configuration Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Focus Areas:</span>
                      <span className="font-medium ml-1">{analysisConfig.focusAreas.length} selected</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Report Length:</span>
                      <span className="font-medium ml-1">{analysisConfig.reportLength}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Questions:</span>
                      <span className="font-medium ml-1">{analysisConfig.enabledQuestions.length}/18 enabled</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Documents:</span>
                      <span className="font-medium ml-1">{uploadedFiles.length} files</span>
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
                        Run Business Analysis
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
            <PetrolBusinessAnalysis onExport={exportReport} analysisConfig={analysisConfig} />
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Results</h3>
                  <p className="text-gray-600">Upload documents and run analysis to see results here</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
