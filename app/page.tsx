"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { SurveyCreationCard } from "@/components/survey-creation-card"
import { SurveyInsightsCard } from "@/components/survey-insights-card"
import { SurveyTable } from "@/components/survey-table"
import { SurveyForm } from "@/components/survey-form"
import { motion, AnimatePresence } from "framer-motion"
import { Survey, SurveyListItem } from "./types/survey"

export default function SurveyDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentSurvey, setCurrentSurvey] = useState<Survey | null>(null)
  const [lastSubmittedSurvey, setLastSubmittedSurvey] = useState<SurveyListItem | null>(null)
  const [surveys, setSurveys] = useState<SurveyListItem[]>([
    { id: 1, title: "Customer Satisfaction Q2", completion: 78, date: "2 days ago", status: "Active" },
    { id: 2, title: "Employee Engagement", completion: 92, date: "1 week ago", status: "Active" },
    { id: 3, title: "Product Feedback", completion: 65, date: "2 weeks ago", status: "Completed" },
    { id: 4, title: "Website Usability", completion: 45, date: "3 weeks ago", status: "Draft" },
    { id: 5, title: "Event Evaluation", completion: 100, date: "1 month ago", status: "Completed" },
  ])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleSurveyGenerated = (survey: Survey) => {
    setCurrentSurvey(survey)
  }

  const handleSurveyComplete = () => {
    if (currentSurvey) {
      // Add the completed survey to the list
      const newSurvey: SurveyListItem = {
        id: surveys.length + 1,
        title: currentSurvey.title,
        completion: 100,
        date: "Just now",
        status: "Completed",
      }

      setSurveys([newSurvey, ...surveys])
      setLastSubmittedSurvey(newSurvey)
    }

    // Reset current survey
    setCurrentSurvey(null)
  }

  const handleDeleteSurvey = (id: number) => {
    setSurveys(surveys.filter((survey) => survey.id !== id))

    // If the deleted survey was the last submitted one, reset lastSubmittedSurvey
    if (lastSubmittedSurvey && lastSubmittedSurvey.id === id) {
      const completedSurveys = surveys.filter((s) => s.status === "Completed" && s.id !== id)
      setLastSubmittedSurvey(completedSurveys.length > 0 ? completedSurveys[0] : null)
    }
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen md:ml-64">
          {/* Header */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />

          {/* Dashboard Content */}
          <motion.main
            className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {currentSurvey ? (
                <motion.div
                  key="survey-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SurveyForm
                    survey={currentSurvey}
                    onComplete={handleSurveyComplete}
                    onBack={() => setCurrentSurvey(null)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid gap-6 md:grid-cols-3 mb-6">
                    <div className="col-span-3 md:col-span-2">
                      <SurveyCreationCard onSurveyGenerated={handleSurveyGenerated} />
                    </div>

                    <div className="col-span-3 md:col-span-1">
                      <SurveyInsightsCard
                        lastSurveyTitle={lastSubmittedSurvey?.title}
                        lastSurveyCompletion={lastSubmittedSurvey?.completion || 0}
                        lastSurveyDate={lastSubmittedSurvey?.date}
                        responseRate={75} // Mock response rate
                      />
                    </div>
                  </div>

                  <SurveyTable surveys={surveys} onDeleteSurvey={handleDeleteSurvey} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        </div>
      </div>
    </div>
  )
}

