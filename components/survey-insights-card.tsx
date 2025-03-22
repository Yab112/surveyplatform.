"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SurveyInsightsCardProps {
  lastSurveyTitle?: string
  lastSurveyCompletion?: number
  lastSurveyDate?: string
  responseRate?: number
}

export function SurveyInsightsCard({
  lastSurveyTitle = "No surveys completed yet",
  lastSurveyCompletion = 0,
  lastSurveyDate = "N/A",
  responseRate = 0,
}: SurveyInsightsCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle>Last Survey Insights</CardTitle>
          <CardDescription>Performance of your most recent survey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Survey Title</span>
              <span className="font-bold text-sm truncate max-w-[150px]">{lastSurveyTitle}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Completion Rate</span>
              <span className="font-bold">{lastSurveyCompletion}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-blue-400 h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${lastSurveyCompletion}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Submitted</span>
              <span className="font-bold">{lastSurveyDate}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Response Rate</span>
              <span className="font-bold">{responseRate}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-blue-400 h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${responseRate}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

