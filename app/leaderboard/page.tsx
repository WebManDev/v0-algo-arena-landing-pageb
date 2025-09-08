"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Code, Trophy, Crown, Medal, Award } from "lucide-react"
import Link from "next/link"

export default function Leaderboard() {
  const topPlayers = [
    { rank: 1, name: "CodeMaster", elo: 2156, badge: "Grandmaster", wins: 342, battles: 398, winRate: 86 },
    { rank: 2, name: "AlgoQueen", elo: 2089, badge: "Master", wins: 298, battles: 356, winRate: 84 },
    { rank: 3, name: "BinaryBeast", elo: 1987, badge: "Master", wins: 267, battles: 324, winRate: 82 },
    { rank: 4, name: "DevWarrior", elo: 1876, badge: "Diamond I", wins: 234, battles: 289, winRate: 81 },
    { rank: 5, name: "CodeNinja", elo: 1798, badge: "Diamond II", wins: 198, battles: 256, winRate: 77 },
    { rank: 6, name: "AlgoWizard", elo: 1723, badge: "Diamond III", wins: 187, battles: 245, winRate: 76 },
    { rank: 7, name: "ByteMaster", elo: 1654, badge: "Platinum I", wins: 165, battles: 223, winRate: 74 },
    { rank: 8, name: "DataDragon", elo: 1589, badge: "Platinum II", wins: 156, battles: 214, winRate: 73 },
    { rank: 9, name: "LogicLord", elo: 1523, badge: "Platinum III", wins: 143, battles: 198, winRate: 72 },
    {
      rank: 10,
      name: "You (John Doe)",
      elo: 1247,
      badge: "Gold III",
      wins: 86,
      battles: 127,
      winRate: 68,
      isUser: true,
    },
  ]

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />
    return <Trophy className="h-5 w-5 text-muted-foreground" />
  }

  return (
    <div className="min-h-screen bg-background">
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
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <a href="#" className="text-sm font-medium text-primary">
              Leaderboard
            </a>
            <Link href="/practice" className="text-sm font-medium hover:text-primary transition-colors">
              Practice
            </Link>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Profile
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?key=usso4" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">John Doe</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Global Leaderboard</h1>
          <p className="text-muted-foreground">Top competitive programmers this season</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {topPlayers.slice(0, 3).map((player, index) => (
            <Card
              key={player.rank}
              className={`text-center ${
                index === 0
                  ? "ring-2 ring-yellow-500/50 bg-gradient-to-br from-yellow-900/20 to-yellow-800/30 border-yellow-500/30"
                  : index === 1
                    ? "ring-2 ring-gray-400"
                    : "ring-2 ring-amber-600"
              }`}
            >
              <CardHeader>
                <div className="mx-auto mb-2">{getRankIcon(player.rank)}</div>
                <CardTitle className="text-lg">{player.name}</CardTitle>
                <Badge variant="outline" className="mx-auto">
                  {player.badge}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-2">{player.elo}</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    {player.wins}W / {player.battles - player.wins}L
                  </p>
                  <p>{player.winRate}% Win Rate</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Rankings */}
        <Card>
          <CardHeader>
            <CardTitle>Full Rankings</CardTitle>
            <CardDescription>Complete leaderboard for this season</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPlayers.map((player, index) => (
                <div
                  key={player.rank}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-muted/50 ${
                    player.isUser ? "bg-primary/10 border-primary/20 ring-1 ring-primary/20" : "bg-card"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                      {getRankIcon(player.rank)}
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                      {player.rank}
                    </div>
                    <div>
                      <p className={`font-medium ${player.isUser ? "text-primary" : ""}`}>{player.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {player.badge}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8 text-sm">
                    <div className="text-center">
                      <p className="font-bold">{player.elo}</p>
                      <p className="text-muted-foreground">ELO</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">
                        {player.wins}W/{player.battles - player.wins}L
                      </p>
                      <p className="text-muted-foreground">Record</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{player.winRate}%</p>
                      <p className="text-muted-foreground">Win Rate</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/dashboard">← Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
