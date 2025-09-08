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
  Sword,
  Clock,
  Crown,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Circle,
  Send,
  Palette,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function BattleArena() {
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds
  const [userCode, setUserCode] = useState(`function twoSum(nums, target) {
    // Your solution here
    
}`)
  const [opponentProgress, setOpponentProgress] = useState(0)
  const [testResults, setTestResults] = useState([
    { id: 1, status: "pending", input: "[2,7,11,15], 9", expected: "[0,1]" },
    { id: 2, status: "pending", input: "[3,2,4], 6", expected: "[1,2]" },
    { id: 3, status: "pending", input: "[3,3], 6", expected: "[0,1]" },
  ])
  const [battleStatus, setBattleStatus] = useState<"active" | "completed" | "won" | "lost">("active")
  const [editorTheme, setEditorTheme] = useState<"vs-light" | "vs-dark" | "hc-black">("vs-dark")

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setOpponentProgress((prev) => {
        const newProgress = prev + Math.random() * 2
        return Math.min(newProgress, 100)
      })
    }, 3000)

    return () => clearInterval(progressTimer)
  }, [])

  useEffect(() => {
    if (battleStatus === "active") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setBattleStatus("completed")
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [battleStatus])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
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
    setBattleStatus("won")
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
        .battle-active {
          animation: battle-glow 3s ease-in-out infinite alternate;
        }
        
        @keyframes battle-glow {
          from { box-shadow: 0 0 20px rgba(255, 161, 22, 0.3); }
          to { box-shadow: 0 0 40px rgba(255, 161, 22, 0.6); }
        }

        .opponent-typing {
          animation: typing-indicator 1.5s ease-in-out infinite;
        }
        
        @keyframes typing-indicator {
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
                Forfeit Battle
              </Link>
            </Button>
            <Badge variant="outline" className="battle-active">
              <Sword className="h-3 w-3 mr-1" />
              LIVE BATTLE
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{formatTime(timeLeft)}</div>
              <div className="text-xs text-muted-foreground">Time Remaining</div>
            </div>
          </div>

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

      {battleStatus !== "active" && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className={`w-full max-w-md ${battleStatus === "won" ? "victory-pulse border-green-500" : ""}`}>
            <CardHeader className="text-center">
              {battleStatus === "won" && (
                <>
                  <Trophy className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <CardTitle className="text-2xl text-green-500">Victory!</CardTitle>
                  <CardDescription>You solved the problem first!</CardDescription>
                </>
              )}
              {battleStatus === "lost" && (
                <>
                  <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <CardTitle className="text-2xl text-red-500">Defeat</CardTitle>
                  <CardDescription>Your opponent was faster this time.</CardDescription>
                </>
              )}
              {battleStatus === "completed" && (
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
                  <div className={battleStatus === "won" ? "text-green-500" : "text-red-500"}>
                    {battleStatus === "won" ? "+18" : "-12"}
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
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href="/lobby">Battle Again</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                  <AvatarImage src="/placeholder.svg?key=opponent" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold">AlexCoder</div>
                  <div className="text-sm text-muted-foreground">Gold II • 1,198 ELO</div>
                </div>
                <Badge variant="outline" className="text-yellow-500 border-yellow-500 opponent-typing">
                  <Circle className="h-3 w-3 mr-1 fill-yellow-500" />
                  Coding...
                </Badge>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{Math.round(opponentProgress)}%</span>
                </div>
                <Progress value={opponentProgress} className="h-2" />
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
                  Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the
                  two numbers such that they add up to target.
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
      </div>
    </div>
  )
}
