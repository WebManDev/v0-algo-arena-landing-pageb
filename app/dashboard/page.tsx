"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Code, Trophy, Users, Bot, Sword, Clock, Crown, Flame, User, Settings, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <style jsx global>{`
        .battle-pulse {
          animation: battle-pulse 2s ease-in-out infinite;
        }
        
        @keyframes battle-pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 161, 22, 0.7);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(255, 161, 22, 0);
          }
        }

        .rank-glow {
          animation: rank-glow 3s ease-in-out infinite alternate;
        }
        
        @keyframes rank-glow {
          from { box-shadow: 0 0 20px rgba(255, 161, 22, 0.3); }
          to { box-shadow: 0 0 30px rgba(255, 161, 22, 0.6); }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
              <Code className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">AlgoArena</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 mx-auto">
            <Link href="/dashboard" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
              Leaderboard
            </Link>
            <Link href="/practice" className="text-sm font-medium hover:text-primary transition-colors">
              Practice
            </Link>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-3 hover:bg-muted/50">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?key=usso4" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">John Doe</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 dark:text-red-400" asChild>
                <Link href="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Ready for your next coding battle?</p>
        </div>

        {/* Quick Battle Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sword className="h-5 w-5 text-primary" />
                  Quick Battle
                </CardTitle>
                <CardDescription>Jump into a battle instantly or challenge the AI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="flex-1 battle-pulse" asChild>
                    <Link href="/lobby">
                      <Users className="h-5 w-5 mr-2" />
                      Find Opponent
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href="/ai-battle">
                      <Bot className="h-5 w-5 mr-2" />
                      Battle AI
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Rank */}
          <Card className="rank-glow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-2">
                <Crown className="h-8 w-8 text-primary mx-auto" />
              </div>
              <CardTitle>Current Rank</CardTitle>
              <div className="text-3xl font-bold text-primary">Gold III</div>
              <CardDescription>1,247 ELO</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Platinum</span>
                  <span>73%</span>
                </div>
                <Progress value={73} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">153 ELO to next rank</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Battles</CardTitle>
              <Sword className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+12</span> this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Personal best: 12</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Solve Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8:42</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">-1:23</span> improvement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Leaderboard */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Battles */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Battles</CardTitle>
              <CardDescription>Your latest competitive matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { opponent: "AlexCoder", result: "Won", problem: "Two Sum", time: "6:23", elo: "+18" },
                  { opponent: "DevMaster", result: "Lost", problem: "Binary Tree", time: "12:45", elo: "-12" },
                  { opponent: "CodeNinja", result: "Won", problem: "Valid Parentheses", time: "4:12", elo: "+15" },
                  { opponent: "AI Bot", result: "Won", problem: "Merge Intervals", time: "9:34", elo: "+8" },
                ].map((battle, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <Badge variant={battle.result === "Won" ? "default" : "destructive"}>{battle.result}</Badge>
                      <div>
                        <p className="font-medium">{battle.problem}</p>
                        <p className="text-sm text-muted-foreground">vs {battle.opponent}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{battle.time}</p>
                      <p className={`text-sm ${battle.result === "Won" ? "text-green-500" : "text-red-500"}`}>
                        {battle.elo} ELO
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Players */}
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top players this season</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "CodeMaster", elo: 2156, badge: "Grandmaster" },
                  { rank: 2, name: "AlgoQueen", elo: 2089, badge: "Master" },
                  { rank: 3, name: "BinaryBeast", elo: 1987, badge: "Master" },
                  { rank: 4, name: "You", elo: 1247, badge: "Gold III", isUser: true },
                  { rank: 5, name: "DevWarrior", elo: 1198, badge: "Gold II" },
                ].map((player, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${player.isUser ? "bg-primary/10 border border-primary/20" : "bg-muted/50"}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold">
                        {player.rank}
                      </div>
                      <div>
                        <p className={`font-medium ${player.isUser ? "text-primary" : ""}`}>{player.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {player.badge}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{player.elo}</p>
                      <p className="text-xs text-muted-foreground">ELO</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/leaderboard">View Full Leaderboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
