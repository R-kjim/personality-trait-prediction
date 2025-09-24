"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Shuffle, Brain, RotateCcw } from "lucide-react"
import { PersonalityResult } from "@/components/personality-result"
import { questions } from "@/lib/questions"

interface PersonalityResponse {
  likelihood: number
  personality: string
}

export default function PersonalityPrediction() {
  const [currentQuestion, setCurrentQuestion] = useState(() => questions[Math.floor(Math.random() * questions.length)])
  const [response, setResponse] = useState("")
  const [result, setResult] = useState<PersonalityResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getNewQuestion = () => {
    const newQuestion = questions[Math.floor(Math.random() * questions.length)]
    setCurrentQuestion(newQuestion)
    setResponse("")
    setResult(null)
  }

  const analyzePersonality = async () => {
    if (!response.trim()) return

    setIsLoading(true)

    try {
      const apiResponse = await fetch("http://127.0.0.1:8000/predict_personality", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // question: currentQuestion,
          text: response.trim(),
        }),
      })

      if (!apiResponse.ok) {
        throw new Error("Failed to analyze personality")
      }

      const data: PersonalityResponse = await apiResponse.json()
      setResult(data)
      setResponse("")
    } catch (error) {
      alert(error || "Error analyzing personality")
    } finally {
      setIsLoading(false)
    }
  }

  const resetAll = () => {
    getNewQuestion()
    setResponse("")
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-balance">Personality Insights</h1>
          </div>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Discover your personality traits through our AI-powered analysis. Answer a question and get insights based
            on the Big Five personality model.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Question Card */}
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <span>Question</span>
                  <Badge variant="secondary" className="text-xs">
                    Random
                  </Badge>
                </CardTitle>
                <Button variant="outline" size="sm" onClick={getNewQuestion} className="gap-2 bg-transparent">
                  <Shuffle className="h-4 w-4" />
                  New Question
                </Button>
              </div>
              <CardDescription>Take your time to provide a thoughtful response</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-muted/50 rounded-lg border-l-4 border-l-primary">
                <p className="text-lg leading-relaxed text-balance">{currentQuestion}</p>
              </div>

              <div className="space-y-4">
                <label htmlFor="response" className="text-sm font-medium">
                  Your Response
                </label>
                <Textarea
                  id="response"
                  placeholder="Share your thoughts, experiences, or feelings about this question..."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="min-h-32 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={analyzePersonality}
                  disabled={!response.trim() || isLoading}
                  className="flex-1 gap-2"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4" />
                      Analyze Personality
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={resetAll} size="lg" className="gap-2 bg-transparent">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <div className="space-y-6">
            {result ? (
              <PersonalityResult result={result} />
            ) : (
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Your Personality Insight</CardTitle>
                  <CardDescription>Complete your response to discover your personality traits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-48 text-muted-foreground">
                    <div className="text-center space-y-3">
                      <Brain className="h-12 w-12 mx-auto opacity-50" />
                      <p>Waiting for your response...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About the Big Five</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Openness</span>
                      <span className="text-muted-foreground">Creativity & curiosity</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Conscientiousness</span>
                      <span className="text-muted-foreground">Organization & discipline</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Extraversion</span>
                      <span className="text-muted-foreground">Social energy & assertiveness</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Agreeableness</span>
                      <span className="text-muted-foreground">Cooperation & trust</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Neuroticism</span>
                      <span className="text-muted-foreground">Emotional stability</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
