"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Code, Trophy, Users, Target, Play, Sword, Clock, Crown, ArrowLeft, Settings, Shield } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function BattleLobby() {
  const [matchmakingState, setMatchmakingState] = useState<"searching" | "found" | "ready">("searching")
  const [countdown, setCountdown] = useState(10)
  const [searchTime, setSearchTime] = useState(0)

  // Simulate matchmaking process
  useEffect(() => {
    if (matchmakingState === "searching") {
      const searchTimer = setInterval(() => {
        setSearchTime((prev) => prev + 1)
      }, 1000)

      // Simulate finding opponent after 5 seconds
      const matchTimer = setTimeout(() => {
        setMatchmakingState("found")
      }, 5000)

      return () => {
        clearInterval(searchTimer)
        clearTimeout(matchTimer)
      }
    }
  }, [matchmakingState])

  // Countdown when opponent is found
  useEffect(() => {
    if (matchmakingState === "found") {
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setMatchmakingState("ready")
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(countdownTimer)
    }
  }, [matchmakingState])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background">
      <style jsx global>{`
        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          80%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .searching-pulse {
          animation: searching-pulse 2s ease-in-out infinite;
        }
        
        @keyframes searching-pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 161, 22, 0.7);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 0 20px rgba(255, 161, 22, 0);
          }
        }

        .opponent-slide-in {
          animation: opponent-slide-in 0.8s ease-out;
        }
        
        @keyframes opponent-slide-in {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
                <Code className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">AlgoArena</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Battle Lobby Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Battle Lobby</h1>
          <p className="text-muted-foreground">
            {matchmakingState === "searching" && "Finding you a worthy opponent..."}
            {matchmakingState === "found" && "Opponent found! Preparing for battle..."}
            {matchmakingState === "ready" && "Battle is about to begin!"}
          </p>
        </div>

        {/* Matchmaking Status */}
        {matchmakingState === "searching" && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute pulse-ring w-20 h-20 rounded-full bg-primary/30"></div>
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center searching-pulse">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Searching for Opponent</h3>
                <p className="text-muted-foreground mb-4">Looking for a player with similar skill level...</p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Search Time: {formatTime(searchTime)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>ELO Range: 1200-1300</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Opponent Found */}
        {(matchmakingState === "found" || matchmakingState === "ready") && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Your Info */}
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span>You</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?key=user" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mb-2">John Doe</h3>
                <Badge className="mb-3">Gold III</Badge>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ELO Rating:</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Win Rate:</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Streak:</span>
                    <span className="font-medium">7</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opponent Info */}
            <Card className="opponent-slide-in">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Sword className="h-5 w-5 text-red-500" />
                  <span>Opponent</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?key=opponent" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mb-2">AlexCoder</h3>
                <Badge variant="outline" className="mb-3">
                  Gold II
                </Badge>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ELO Rating:</span>
                    <span className="font-medium">1,198</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Win Rate:</span>
                    <span className="font-medium">72%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Streak:</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Battle Preparation */}
        {matchmakingState === "found" && (
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle>Battle Starting Soon</CardTitle>
              <CardDescription>Get ready for an epic coding duel!</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">{countdown}</div>
              <Progress value={(10 - countdown) * 10} className="w-full max-w-md mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">Battle begins in {countdown} seconds</p>
            </CardContent>
          </Card>
        )}

        {/* Battle Ready */}
        {matchmakingState === "ready" && (
          <Card className="mb-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="mb-6">
                <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Battle Ready!</h3>
                <p className="text-muted-foreground">Both players are ready. Click below to enter the coding arena.</p>
              </div>
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/battle">
                  <Play className="h-5 w-5 mr-2" />
                  Enter Battle Arena
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Battle Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Battle Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Medium</div>
                <div className="text-sm text-muted-foreground">Difficulty</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">15:00</div>
                <div className="text-sm text-muted-foreground">Time Limit</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Arrays</div>
                <div className="text-sm text-muted-foreground">Category</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cancel Button */}
        {matchmakingState === "searching" && (
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancel Search</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
