"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { submitSurveyResponses } from "@/app/services/api-service"
import { Survey, SurveyAnswer, SurveyQuestion } from "@/app/types/survey"

interface SurveyFormProps {
  survey: Survey
  onComplete: () => void
  onBack: () => void
}

export function SurveyForm({ survey, onComplete, onBack }: SurveyFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentQuestion = survey.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === survey.questions.length - 1

  const handleResponse = (questionId: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const canProceed = () => {
    if (!currentQuestion.required) return true
    return responses[currentQuestion.id] !== undefined && responses[currentQuestion.id] !== ""
  }

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit()
    } else {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex === 0) {
      onBack()
    } else {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Format answers for submission
      const answers: SurveyAnswer[] = Object.entries(responses).map(([questionId, answer]) => ({
        questionId,
        answer,
      }))

      const result = await submitSurveyResponses(survey.id, answers)

      if (result.success) {
        setShowConfirmation(true)
        // After 3 seconds, return to dashboard
        setTimeout(() => {
          onComplete()
        }, 3000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("Failed to submit survey. Please try again.")
      console.error("Error submitting survey:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderQuestionInput = (question: SurveyQuestion) => {
    switch (question.typeresponse) {
      case "select":
        if (question.options && question.options.length <= 5) {
          return (
            <RadioGroup
              value={responses[question.id] || ""}
              onValueChange={(value) => handleResponse(question.id, value)}
              className="space-y-3 mt-4"
            >
              {question.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                  <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )
        } else {
          return (
            <Select value={responses[question.id] || ""} onValueChange={(value) => handleResponse(question.id, value)}>
              <SelectTrigger className="mt-4">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {question.options && question.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        }

      case "range":
        const rangeValue = responses[question.id] ? Number.parseInt(responses[question.id]) : 5
        return (
          <div className="mt-6 space-y-4">
            <Slider
              value={[rangeValue]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => handleResponse(question.id, value[0].toString())}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
            <div className="text-center font-medium mt-2">Selected: {rangeValue}</div>
          </div>
        )

      case "answer":
        return (
          <Textarea
            value={responses[question.id] || ""}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            placeholder="Type your answer here..."
            className="mt-4"
          />
        )

      default:
        return null
    }
  }

  return (
    <AnimatePresence mode="wait">
      {showConfirmation ? (
        <motion.div
          key="confirmation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center text-center p-8"
        >
          <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
            <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
          </div>
          <h2 className="text-2xl font-bold mt-4">Thank You!</h2>
          <p className="text-muted-foreground mt-2">Your survey responses have been submitted successfully.</p>
          <p className="text-sm text-muted-foreground mt-4">Returning to dashboard...</p>
        </motion.div>
      ) : (
        <motion.div
          key="question"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-primary/10">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{survey.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {survey.questions.length}
                </div>
              </div>
              <CardDescription>AI-generated survey about {survey.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-lg font-medium">
                  {currentQuestion.question}
                  {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
                </div>
                {renderQuestionInput(currentQuestion)}
                {error && <p className="text-sm text-destructive mt-2">{error}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                {currentQuestionIndex === 0 ? "Back to Dashboard" : "Previous"}
              </Button>
              <Button onClick={handleNext} disabled={!canProceed() || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    {isLastQuestion ? "Submit" : "Next"}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

