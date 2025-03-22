"use client"

import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface DarkModeToggleProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export function DarkModeToggle({ darkMode, toggleDarkMode }: DarkModeToggleProps) {
  return (
    <div className="flex items-center space-x-2 ml-2">
      <Switch id="dark-mode" checked={darkMode} onCheckedChange={toggleDarkMode} />
      <Label htmlFor="dark-mode" className="hidden md:block">
        {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Label>
    </div>
  )
}

