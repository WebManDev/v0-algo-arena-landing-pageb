"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Trophy,
  Target,
  Play,
  Bot,
  Clock,
  Crown,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Circle,
  Send,
  Cpu,
  Brain,
  Lightbulb,
  Palette,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const AI_OPPONENTS = {
  easy: {
    name: "CodeBot Alpha",
    avatar: "CA",
    description: "A friendly AI for beginners",
    speed: 0.3,
    accuracy: 0.7,
    icon: Lightbulb,
    color: "text-green-500",
  },
  medium: {
    name: "AlgoMind Beta",
    avatar: "AB",
    description: "Balanced AI challenger",
    speed: 0.6,
    accuracy: 0.85,
    icon: Brain,
    color: "text-yellow-500",
  },
  hard: {
    name: "DeepCode Omega",
    avatar: "DO",
    description: "Elite AI competitor",
    speed: 0.9,
    accuracy: 0.95,
    icon: Cpu,
    color: "text-red-500",
  },
}

export default function AIBattle() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "medium" | "hard">("medium")
  const [battleState, setBattleState] = useState<"setup" | "active" | "completed">("setup")
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes
  const [userCode, setUserCode] = useState(`function twoSum(nums, target) {
    // Your solution here
    
}`)
  const [aiProgress, setAiProgress] = useState(0)
  const [aiStatus, setAiStatus] = useState<"thinking" | "coding" | "testing" | "completed">("thinking")
  const [testResults, setTestResults] = useState([
    { id: 1, status: "pending", input: "[2,7,11,15], 9", expected: "[0,1]" },
    { id: 2, status: "pending", input: "[3,2,4], 6", expected: "[1,2]" },
    { id: 3, status: "pending", input: "[3,3], 6", expected: "[0,1]" },
  ])
  const [battleResult, setBattleResult] = useState<"won" | "lost" | "timeout" | null>(null)
  const [editorTheme, setEditorTheme] = useState<"vs-light" | "vs-dark" | "hc-black">("vs-dark")

  const currentAI = AI_OPPONENTS[selectedDifficulty]

  useEffect(() => {
    if (battleState === "active") {
      const aiTimer = setInterval(() => {
        setAiProgress((prev) => {
          const increment = currentAI.speed * (Math.random() * 2 + 0.5)
          const newProgress = Math.min(prev + increment, 100)

          if (newProgress < 30) {
            setAiStatus("thinking")
          } else if (newProgress < 80) {
            setAiStatus("coding")
          } else if (newProgress < 100) {
            setAiStatus("testing")
          } else {
            setAiStatus("completed")
            setBattleResult("lost")
          }

          return newProgress
        })
      }, 1000)

      return () => clearInterval(aiTimer)
    }
  }, [battleState, currentAI.speed])

  useEffect(() => {
    if (battleState === "active") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setBattleState("completed")
            setBattleResult("timeout")
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [battleState])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const startBattle = () => {
    setBattleState("active")
    setAiProgress(0)
    setAiStatus("thinking")
  }

  const runTests = () => {
    setTestResults((prev) =>
      prev.map((test, index) => ({
        ...test,
        status: index < 2 ? "passed" : "failed",
      })),
    )
  }

  const submitSolution = () => {
    if (aiProgress >= 100) {
      setBattleResult("lost")
    } else {
      setBattleResult("won")
    }
    setBattleState("completed")
  }

  const getAIStatusText = () => {
    switch (aiStatus) {
      case "thinking":
        return "Analyzing problem..."
      case "coding":
        return "Writing solution..."
      case "testing":
        return "Running tests..."
      case "completed":
        return "Solution complete!"
      default:
        return "Ready"
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

  return (
    <div className="min-h-screen bg-background">
      <style jsx global>{`
        .ai-glow {
          animation: ai-glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes ai-glow {
          from { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          to { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }

        .ai-thinking {
          animation: ai-thinking 1.5s ease-in-out infinite;
        }
        
        @keyframes ai-thinking {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .victory-pulse {
          animation: victory-pulse 2s ease-in-out infinite;
        }
        
        @keyframes victory-pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 0 20px rgba(34, 197, 94, 0);
          }
        }
      `}</style>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <Badge variant="outline" className={battleState === "active" ? "ai-glow" : ""}>
              <Bot className="h-3 w-3 mr-1" />
              AI BATTLE
            </Badge>
          </div>

          {battleState === "active" && (
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{formatTime(timeLeft)}</div>
                <div className="text-xs text-muted-foreground">Time Remaining</div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <Badge>
              <Crown className="h-3 w-3 mr-1" />
              Gold III
            </Badge>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?key=user" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {battleResult && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className={`w-full max-w-md ${battleResult === "won" ? "victory-pulse border-green-500" : ""}`}>
            <CardHeader className="text-center">
              {battleResult === "won" && (
                <>
                  <Trophy className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <CardTitle className="text-2xl text-green-500">Victory!</CardTitle>
                  <CardDescription>You defeated the AI!</CardDescription>
                </>
              )}
              {battleResult === "lost" && (
                <>
                  <Bot className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <CardTitle className="text-2xl text-red-500">AI Wins</CardTitle>
                  <CardDescription>The AI solved it faster this time.</CardDescription>
                </>
              )}
              {battleResult === "timeout" && (
                <>
                  <Clock className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <CardTitle className="text-2xl text-yellow-500">Time's Up!</CardTitle>
                  <CardDescription>Battle ended due to time limit.</CardDescription>
                </>
              )}
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold">ELO Change</div>
                  <div className={battleResult === "won" ? "text-green-500" : "text-red-500"}>
                    {battleResult === "won" ? "+12" : "-8"}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Time Taken</div>
                  <div>{formatTime(900 - timeLeft)}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" asChild>
                  <Link href="/dashboard">Return to Dashboard</Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setBattleResult(null)
                    setBattleState("setup")
                    setTimeLeft(900)
                    setAiProgress(0)
                    setUserCode(`function twoSum(nums, target) {
    // Your solution here
    
}`)
                  }}
                >
                  Battle Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {battleState === "setup" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">AI Battle Arena</h1>
              <p className="text-muted-foreground">Choose your AI opponent and test your skills</p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Select AI Difficulty</CardTitle>
                <CardDescription>Each AI has different coding speed and accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.entries(AI_OPPONENTS).map(([difficulty, ai]) => {
                    const IconComponent = ai.icon
                    return (
                      <Card
                        key={difficulty}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          selectedDifficulty === difficulty ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelectedDifficulty(difficulty as keyof typeof AI_OPPONENTS)}
                      >
                        <CardHeader className="text-center">
                          <div className="mx-auto mb-2">
                            <IconComponent className={`h-8 w-8 ${ai.color}`} />
                          </div>
                          <CardTitle className="text-lg">{ai.name}</CardTitle>
                          <Badge variant="outline" className="mx-auto">
                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                          </Badge>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-sm text-muted-foreground mb-3">{ai.description}</p>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span>Speed:</span>
                              <Progress value={ai.speed * 100} className="w-16 h-2" />
                            </div>
                            <div className="flex justify-between">
                              <span>Accuracy:</span>
                              <Progress value={ai.accuracy * 100} className="w-16 h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button size="lg" onClick={startBattle} className="text-lg px-8">
                <Play className="h-5 w-5 mr-2" />
                Start AI Battle
              </Button>
            </div>
          </div>
        )}

        {battleState === "active" && (
          <>
            <div className="grid grid-cols-2 gap-8 mb-6">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?key=user" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">John Doe (You)</div>
                      <div className="text-sm text-muted-foreground">Gold III • 1,247 ELO</div>
                    </div>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      <Circle className="h-3 w-3 mr-1 fill-green-500" />
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">{currentAI.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">{currentAI.name}</div>
                      <div className="text-sm text-muted-foreground">
                        AI • {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-blue-500 border-blue-500 ${aiStatus === "thinking" ? "ai-thinking" : ""}`}
                    >
                      <Bot className="h-3 w-3 mr-1" />
                      {aiStatus.charAt(0).toUpperCase() + aiStatus.slice(1)}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{getAIStatusText()}</span>
                      <span>{Math.round(aiProgress)}%</span>
                    </div>
                    <Progress value={aiProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span>Two Sum</span>
                    <Badge>Medium</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Problem</h4>
                    <p className="text-sm text-muted-foreground">
                      Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of
                      the two numbers such that they add up to target.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Example</h4>
                    <div className="bg-muted p-3 rounded text-sm font-mono">
                      <div>
                        <strong>Input:</strong> nums = [2,7,11,15], target = 9
                      </div>
                      <div>
                        <strong>Output:</strong> [0,1]
                      </div>
                      <div>
                        <strong>Explanation:</strong> nums[0] + nums[1] = 2 + 7 = 9
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Constraints</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 2 ≤ nums.length ≤ 10⁴</li>
                      <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                      <li>• -10⁹ ≤ target ≤ 10⁹</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Code Editor</CardTitle>
                    <div className="flex space-x-2">
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
                      <Button size="sm" variant="outline" onClick={runTests}>
                        <Play className="h-4 w-4 mr-2" />
                        Run Tests
                      </Button>
                      <Button size="sm" onClick={submitSolution}>
                        <Send className="h-4 w-4 mr-2" />
                        Submit
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className={`min-h-[400px] font-mono text-sm ${getEditorThemeClasses(editorTheme)}`}
                    placeholder="Write your solution here..."
                  />
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {testResults.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        {test.status === "passed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {test.status === "failed" && <XCircle className="h-5 w-5 text-red-500" />}
                        {test.status === "pending" && <Circle className="h-5 w-5 text-muted-foreground" />}
                        <div>
                          <div className="font-medium">Test Case {test.id}</div>
                          <div className="text-sm text-muted-foreground">Input: {test.input}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Expected: {test.expected}</div>
                        <Badge
                          variant={
                            test.status === "passed" ? "default" : test.status === "failed" ? "destructive" : "outline"
                          }
                        >
                          {test.status === "pending" ? "Not Run" : test.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
