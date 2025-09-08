"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Code, Clock, CheckCircle, Circle, Filter } from "lucide-react"
import Link from "next/link"

export default function Practice() {
  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays & Strings",
      solved: true,
      timeLimit: "15 min",
      description: "Given an array of integers, return indices of two numbers that add up to target.",
      tags: ["Array", "Hash Table"],
    },
    {
      id: 2,
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Stack",
      solved: true,
      timeLimit: "10 min",
      description: "Determine if the input string has valid parentheses.",
      tags: ["String", "Stack"],
    },
    {
      id: 3,
      title: "Binary Tree Inorder Traversal",
      difficulty: "Medium",
      category: "Trees & Graphs",
      solved: false,
      timeLimit: "20 min",
      description: "Return the inorder traversal of a binary tree's nodes' values.",
      tags: ["Tree", "DFS", "Binary Tree"],
    },
    {
      id: 4,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      category: "Arrays & Strings",
      solved: false,
      timeLimit: "25 min",
      description: "Find the length of the longest substring without repeating characters.",
      tags: ["String", "Sliding Window", "Hash Table"],
    },
    {
      id: 5,
      title: "Merge Intervals",
      difficulty: "Medium",
      category: "Arrays & Strings",
      solved: true,
      timeLimit: "20 min",
      description: "Merge all overlapping intervals and return an array of non-overlapping intervals.",
      tags: ["Array", "Sorting"],
    },
    {
      id: 6,
      title: "Maximum Depth of Binary Tree",
      difficulty: "Easy",
      category: "Trees & Graphs",
      solved: false,
      timeLimit: "15 min",
      description: "Find the maximum depth of a binary tree.",
      tags: ["Tree", "DFS", "BFS", "Binary Tree"],
    },
    {
      id: 7,
      title: "Coin Change",
      difficulty: "Hard",
      category: "Dynamic Programming",
      solved: false,
      timeLimit: "30 min",
      description: "Find the fewest number of coins needed to make up a given amount.",
      tags: ["Dynamic Programming", "BFS"],
    },
    {
      id: 8,
      title: "Design LRU Cache",
      difficulty: "Hard",
      category: "System Design",
      solved: false,
      timeLimit: "35 min",
      description: "Design a data structure that follows LRU (Least Recently Used) cache constraints.",
      tags: ["Hash Table", "Linked List", "Design"],
    },
  ]

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
            <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
              Leaderboard
            </Link>
            <a href="#" className="text-sm font-medium text-primary">
              Practice
            </a>
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Practice Problems</h1>
          <p className="text-muted-foreground">Sharpen your skills with curated coding challenges</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">out of {problems.length} total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Easy</CardTitle>
              <Circle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">2/3</div>
              <p className="text-xs text-muted-foreground">67% completion</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medium</CardTitle>
              <Circle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">1/3</div>
              <p className="text-xs text-muted-foreground">33% completion</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hard</CardTitle>
              <Circle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">0/2</div>
              <p className="text-xs text-muted-foreground">0% completion</p>
            </CardContent>
          </Card>
        </div>

        {/* Problems List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Problems</CardTitle>
                <CardDescription>Click on any problem to start practicing</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {problems.map((problem) => (
                <div
                  key={problem.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => (window.location.href = `/practice/${problem.id}`)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {problem.solved ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-medium">{problem.title}</h3>
                        <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{problem.description}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {problem.category}
                        </Badge>
                        {problem.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{problem.timeLimit}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      {problem.solved ? "Solve Again" : "Solve"}
                    </Button>
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
