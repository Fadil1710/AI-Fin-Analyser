"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { FileSpreadsheet, Building2 } from "lucide-react"
import { IncomeStatementModule } from "./components/income-statement-module"
import { BusinessModelModule } from "./components/business-model-module"

export default function GenAIFinancialApp() {
  const [activeModule, setActiveModule] = useState<"income" | "business">("income")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">GenAI Financial Analyzer</h1>
              {/* <Badge variant="secondary">Petrol d.d. Analysis PoC</Badge> */}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveModule("income")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeModule === "income"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <FileSpreadsheet className="h-4 w-4 mr-2 inline" />
              Income Statement Analysis
            </button>
            <button
              onClick={() => setActiveModule("business")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeModule === "business"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Building2 className="h-4 w-4 mr-2 inline" />
              Business Model Analysis
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeModule === "income" && <IncomeStatementModule />}
        {activeModule === "business" && <BusinessModelModule />}
      </main>
    </div>
  )
}
