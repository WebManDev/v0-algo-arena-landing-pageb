"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Zap, Trophy, Users, Target, ArrowRight, Play, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function AlgoArenaLanding() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -150px 0px" },
    )

    const animatedElements = document.querySelectorAll(".animate-on-scroll")

    animatedElements.forEach((el) => {
      observerRef.current?.observe(el)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <style jsx global>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(100px) scale(0.95);
          transition: all 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .stagger-1 { transition-delay: 0.3s; }
        .stagger-2 { transition-delay: 0.6s; }
        .stagger-3 { transition-delay: 0.9s; }
        .stagger-4 { transition-delay: 1.2s; }
        
        /* Added battle button hover animations */
        .battle-button {
          transition: all 0.3s ease;
          animation: idle-shake 3s ease-in-out infinite;
        }
        
        .battle-button:hover {
          transform: scale(1.1);
          animation: hover-shake 0.5s ease-in-out infinite;
        }
        
        @keyframes idle-shake {
          0%, 100% { transform: translateX(0) scale(1); }
          25% { transform: translateX(-2px) scale(1); }
          75% { transform: translateX(2px) scale(1); }
        }
        
        @keyframes hover-shake {
          0%, 100% { transform: translateX(0) scale(1.1); }
          25% { transform: translateX(-4px) scale(1.1); }
          75% { transform: translateX(4px) scale(1.1); }
        }

        /* Added card hover animations */
        .hover-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .hover-card:hover {
          transform: scale(1.05);
          animation: card-shake 0.6s ease-in-out infinite;
        }
        
        @keyframes card-shake {
          0%, 100% { transform: translateX(0) scale(1.05); }
          25% { transform: translateX(-1px) scale(1.05); }
          75% { transform: translateX(1px) scale(1.05); }
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
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#challenges" className="text-sm font-medium hover:text-primary transition-colors">
              Challenges
            </a>
            <a href="#community" className="text-sm font-medium hover:text-primary transition-colors">
              Community
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Start Competing</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32 px-4 bg-black text-white min-h-[90vh] flex items-center">
        <div className="container max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 animate-on-scroll">
            <Zap className="h-3 w-3 mr-1" />
            Live 1v1 Coding Battles
          </Badge>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance tracking-tight text-white animate-on-scroll stagger-1">
            Code. Compete. <span className="text-primary">Conquer.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto text-pretty animate-on-scroll stagger-2">
            Challenge developers worldwide in real-time 1v1 coding battles. Solve LeetCode-style problems, climb the
            leaderboard, and prove your algorithmic prowess.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-on-scroll stagger-3">
            <Button size="lg" className="text-xl px-10 py-4 h-auto battle-button" asChild>
              <Link href="/signup">
                <Play className="h-6 w-6 mr-3" />
                Start Your First Battle
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-xl px-10 py-4 h-auto border-gray-600 hover:border-primary/50 bg-transparent text-white hover:bg-white hover:text-black"
            >
              Watch Demo
              <ArrowRight className="h-6 w-6 ml-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black animate-on-scroll">Why Choose AlgoArena?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll stagger-1">
              Experience the thrill of competitive programming with features designed for serious developers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors animate-on-scroll stagger-1 hover-card">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-Time Battles</CardTitle>
                <CardDescription>
                  Face off against opponents in live coding sessions with synchronized problem solving and instant
                  feedback.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors animate-on-scroll stagger-2 hover-card">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Skill-Based Matching</CardTitle>
                <CardDescription>
                  Our advanced ELO system ensures fair matches by pairing you with developers of similar skill levels.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors animate-on-scroll stagger-3 hover-card">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>LeetCode-Style Problems</CardTitle>
                <CardDescription>
                  Practice with curated algorithm challenges covering arrays, trees, graphs, dynamic programming, and
                  more.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Challenge Categories */}
      <section id="challenges" className="py-20 px-4 bg-black text-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white animate-on-scroll">Master Every Algorithm</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-on-scroll stagger-1">
              From basic arrays to advanced graph algorithms, challenge yourself across all domains of computer science.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Arrays & Strings", count: "150+ problems", difficulty: "Easy to Hard" },
              { name: "Trees & Graphs", count: "120+ problems", difficulty: "Medium to Hard" },
              { name: "Dynamic Programming", count: "80+ problems", difficulty: "Medium to Expert" },
              { name: "System Design", count: "40+ problems", difficulty: "Hard to Expert" },
            ].map((category, index) => (
              <Card
                key={index}
                className={`text-center hover:shadow-lg transition-shadow bg-gray-900 border-gray-700 animate-on-scroll stagger-${index + 1} hover-card`}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-white">{category.name}</CardTitle>
                  <CardDescription className="text-gray-300">{category.count}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="border-gray-500 text-gray-300">
                    {category.difficulty}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black animate-on-scroll">Join the Community</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll stagger-1">
              Connect with thousands of developers, share strategies, and learn from the best.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center animate-on-scroll stagger-1">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-600">Active Developers</div>
            </div>
            <div className="text-center animate-on-scroll stagger-2">
              <div className="text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-gray-600">Battles Fought</div>
            </div>
            <div className="text-center animate-on-scroll stagger-3">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Algorithm Problems</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="animate-on-scroll stagger-1 hover-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <CardDescription>
                  "AlgoArena transformed my interview prep. The real-time pressure helped me think faster and code
                  cleaner."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold">Sarah Chen</div>
                <div className="text-sm text-muted-foreground">Software Engineer at Google</div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll stagger-2 hover-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <CardDescription>
                  "The skill-based matching is perfect. Every battle feels challenging but fair. Great for continuous
                  improvement."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold">Alex Rodriguez</div>
                <div className="text-sm text-muted-foreground">Senior Developer at Meta</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white animate-on-scroll">
            Ready to Enter the Arena?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-on-scroll stagger-1">
            Join thousands of developers who are sharpening their skills and climbing the ranks. Your next coding battle
            awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll stagger-2">
            <Button size="lg" className="text-lg px-8 battle-button" asChild>
              <Link href="/signup">
                <Users className="h-5 w-5 mr-2" />
                Create Free Account
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 border-gray-600 hover:border-primary/50 bg-transparent text-white hover:bg-white hover:text-black"
            >
              Browse Challenges
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
                  <Code className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-black">AlgoArena</span>
              </div>
              <p className="text-sm text-gray-600">
                The ultimate platform for competitive programming and algorithm mastery.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-black">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Leaderboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-black">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-black">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 AlgoArena. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
