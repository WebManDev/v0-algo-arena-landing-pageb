import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Code } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500/20 via-background to-orange-500/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary">
            <Code className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold">AlgoArena</span>
        </div>

        <Card className="border-2 border-orange-500/30 shadow-2xl shadow-orange-500/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Join the Arena</CardTitle>
            <CardDescription>Create your account and start competing with developers worldwide</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  className="bg-background focus:ring-2 focus:ring-orange-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  className="bg-background focus:ring-2 focus:ring-orange-500/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Choose a unique username"
                className="bg-background focus:ring-2 focus:ring-orange-500/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-background focus:ring-2 focus:ring-orange-500/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                className="bg-background focus:ring-2 focus:ring-orange-500/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="bg-background focus:ring-2 focus:ring-orange-500/50"
              />
            </div>
            <Button
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              size="lg"
            >
              Create Account
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/signin" className="text-orange-500 hover:text-orange-400 hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-orange-500">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
