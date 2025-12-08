"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { grades } from "@/lib/data"

const gradeDistribution = grades.reduce((acc, grade) => {
  if (grade.score >= 90) acc.A++;
  else if (grade.score >= 80) acc.B++;
  else if (grade.score >= 70) acc.C++;
  else if (grade.score >= 60) acc.D++;
  else acc.F++;
  return acc;
}, { A: 0, B: 0, C: 0, D: 0, F: 0 });

const chartData = [
  { grade: "A", count: gradeDistribution.A },
  { grade: "B", count: gradeDistribution.B },
  { grade: "C", count: gradeDistribution.C },
  { grade: "D", count: gradeDistribution.D },
  { grade: "F", count: gradeDistribution.F },
]

const chartConfig = {
  count: {
    label: "Courses",
    color: "hsl(var(--primary))",
  },
}

export function GradeChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart accessibilityLayer data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="grade"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
          />
           <YAxis hide={true} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
          <Bar dataKey="count" fill="var(--color-count)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
