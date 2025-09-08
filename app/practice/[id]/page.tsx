"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Code, Clock, Play, RotateCcw, CheckCircle, XCircle, ArrowLeft, Palette } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function PracticeProblem({ params }: { params: { id: string } }) {
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Write your solution here
    
}`)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const [editorTheme, setEditorTheme] = useState<"vs-light" | "vs-dark" | "hc-black">("vs-dark")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const startTimer = () => {
    setIsRunning(true)
  }

  const runCode = () => {
    // Simulate test execution
    setShowResults(true)
    setTestResults([
      { input: "[2,7,11,15], 9", expected: "[0,1]", actual: "[0,1]", passed: true },
      { input: "[3,2,4], 6", expected: "[1,2]", actual: "[1,2]", passed: true },
      { input: "[3,3], 6", expected: "[0,1]", actual: "[0,1]", passed: true },
    ])
  }

  const resetCode = () => {
    setCode(`function twoSum(nums, target) {
    // Write your solution here
    
}`)
    setTimeLeft(15 * 60)
    setIsRunning(false)
    setShowResults(false)
    setTestResults([])
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-700 dark:text-green-300 bg-green-500/10 border-green-500/20"
      case "Medium":
        return "text-yellow-700 dark:text-yellow-300 bg-yellow-500/10 border-yellow-500/20"
      case "Hard":
        return "text-red-700 dark:text-red-300 bg-red-500/10 border-red-500/20"
      default:
        return "text-muted-foreground"
    }
  }

  const getEditorThemeClasses = (theme: string) => {
    switch (theme) {
      case "vs-light":
        return "bg-white text-gray-900 border-gray-300 focus-visible:border-blue-500"
      case "vs-dark":
        return "bg-gray-900 text-gray-100 border-gray-700 focus-visible:border-blue-500"
      case "hc-black":
        return "bg-black text-yellow-300 border-yellow-500 focus-visible:border-yellow-400"
      default:
        return "bg-gray-900 text-gray-100 border-gray-700 focus-visible:border-blue-500"
    }
  }

  // Mock problem data - in real app this would come from API
  const problem = {
    id: params.id,
    title: "Two Sum",
    difficulty: "Easy",
    timeLimit: "15 min",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists.",
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/practice">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Practice
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
                <Code className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">AlgoArena</span>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${timeLeft < 300 ? "bg-red-500/10 text-red-700 dark:text-red-300" : "bg-primary/10 text-foreground"}`}
            >
              <Clock className="h-4 w-4" />
              <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
            {!isRunning && (
              <Button size="sm" onClick={startTimer}>
                Start Timer
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?key=usso4" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">John Doe</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Problem Description */}
          <div className="space-y-6 overflow-y-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CardTitle className="text-xl">{problem.title}</CardTitle>
                    <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                  </div>
                </div>
                <CardDescription>{problem.description}</CardDescription>
              </CardHeader>
            </Card>

            {/* Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {problem.examples.map((example, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-2">Example {index + 1}:</p>
                    <div className="space-y-1 text-sm font-mono">
                      <p>
                        <span className="text-muted-foreground">Input:</span> {example.input}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Output:</span> {example.output}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Explanation:</span> {example.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Constraints */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Constraints</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index} className="font-mono">
                      • {constraint}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Test Results */}
            {showResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Test Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {testResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {result.passed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <div className="text-sm">
                            <p className="font-mono">Input: {result.input}</p>
                            <p className="font-mono">Expected: {result.expected}</p>
                            <p className="font-mono">Got: {result.actual}</p>
                          </div>
                        </div>
                        <Badge variant={result.passed ? "default" : "destructive"}>
                          {result.passed ? "PASS" : "FAIL"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Code Editor */}
          <div className="space-y-4">
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Code Editor</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select value={editorTheme} onValueChange={(value: any) => setEditorTheme(value)}>
                      <SelectTrigger className="w-32">
                        <Palette className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vs-light">Light</SelectItem>
                        <SelectItem value="vs-dark">Dark</SelectItem>
                        <SelectItem value="hc-black">High Contrast</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="outline" onClick={resetCode}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                    <Button size="sm" onClick={runCode}>
                      <Play className="h-4 w-4 mr-2" />
                      Run Code
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={`min-h-[400px] font-mono text-sm resize-none ${getEditorThemeClasses(editorTheme)}`}
                  placeholder="Write your solution here..."
                />
              </CardContent>
            </Card>

            {showResults && testResults.every((r) => r.passed) && (
              <Card className="bg-green-500/10 border-green-500/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-green-500 mb-2">Problem Solved!</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Great job! You solved this problem in {formatTime(15 * 60 - timeLeft)}.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Button variant="outline" asChild>
                        <Link href="/practice">More Problems</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/dashboard">Back to Dashboard</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
