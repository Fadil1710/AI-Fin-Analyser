"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  Bar,
  BarChart,
} from "recharts"

const revenueData = [
  { year: "2020", revenue: 2850, ebitda: 520, netIncome: 180 },
  { year: "2021", revenue: 3120, ebitda: 580, netIncome: 220 },
  { year: "2022", revenue: 3450, ebitda: 640, netIncome: 280 },
  { year: "2023", revenue: 3680, ebitda: 690, netIncome: 310 },
  { year: "2024", revenue: 4100, ebitda: 780, netIncome: 380 },
]

const marginData = [
  { quarter: "Q1 2023", grossMargin: 28.5, ebitdaMargin: 18.2, netMargin: 8.1 },
  { quarter: "Q2 2023", grossMargin: 29.1, ebitdaMargin: 18.8, netMargin: 8.4 },
  { quarter: "Q3 2023", grossMargin: 27.8, ebitdaMargin: 17.9, netMargin: 7.8 },
  { quarter: "Q4 2023", grossMargin: 30.2, ebitdaMargin: 19.5, netMargin: 9.1 },
  { quarter: "Q1 2024", grossMargin: 31.1, ebitdaMargin: 20.2, netMargin: 9.8 },
]

const riskData = [
  { category: "Liquidity", score: 7.2 },
  { category: "Profitability", score: 6.8 },
  { category: "Leverage", score: 5.9 },
  { category: "Efficiency", score: 8.1 },
  { category: "Growth", score: 7.5 },
]

export function FinancialCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Profitability Trends</CardTitle>
          <CardDescription>5-year financial performance overview (in millions EUR)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
              ebitda: {
                label: "EBITDA",
                color: "hsl(var(--chart-2))",
              },
              netIncome: {
                label: "Net Income",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                <Line type="monotone" dataKey="ebitda" stroke="var(--color-ebitda)" strokeWidth={2} />
                <Line type="monotone" dataKey="netIncome" stroke="var(--color-netIncome)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Margin Analysis</CardTitle>
          <CardDescription>Quarterly margin trends and profitability (%)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              grossMargin: {
                label: "Gross Margin %",
                color: "hsl(var(--chart-1))",
              },
              ebitdaMargin: {
                label: "EBITDA Margin %",
                color: "hsl(var(--chart-2))",
              },
              netMargin: {
                label: "Net Margin %",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marginData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="grossMargin"
                  stackId="1"
                  stroke="var(--color-grossMargin)"
                  fill="var(--color-grossMargin)"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="ebitdaMargin"
                  stackId="2"
                  stroke="var(--color-ebitdaMargin)"
                  fill="var(--color-ebitdaMargin)"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="netMargin"
                  stackId="3"
                  stroke="var(--color-netMargin)"
                  fill="var(--color-netMargin)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Risk Assessment Scores</CardTitle>
          <CardDescription>Financial risk evaluation across key categories (0-10 scale)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              score: {
                label: "Risk Score",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 10]} />
                <YAxis dataKey="category" type="category" width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="score" fill="var(--color-score)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
