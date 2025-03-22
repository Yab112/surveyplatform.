"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateSurveyQuestions } from "@/app/services/api-service"
import { SurveyCreationCardProps } from "@/app/types/survey"


export function SurveyCreationCard({ onSurveyGenerated }: SurveyCreationCardProps) {
  const [surveyTitle, setSurveyTitle] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateSurvey = async () => {
    if (!surveyTitle.trim()) return

    setIsGenerating(true)
    setError(null)

    try {
      const survey = await generateSurveyQuestions(surveyTitle)
      console.log(survey)
      onSurveyGenerated(survey)
    } catch (err) {
      setError("Failed to generate survey. Please try again.")
      console.error("Error generating survey:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="border-primary/10 h-full">
        <CardHeader>
          <CardTitle>Create New Survey</CardTitle>
          <CardDescription>Start with a title, then generate AI-powered questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="survey-title">Survey Title</Label>
              <Input
                id="survey-title"
                placeholder="Enter survey title..."
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-blue-600" disabled={!surveyTitle.trim() || isGenerating} onClick={handleGenerateSurvey}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4 text-white" /> Generate AI Questions
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

