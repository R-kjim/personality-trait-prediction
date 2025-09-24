import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, TrendingUp } from "lucide-react"

interface PersonalityResponse {
  likelihood: number
  personality: string
}

interface PersonalityResultProps {
  result: PersonalityResponse
}

const personalityDescriptions = {
  openness: {
    description:
      "You tend to be creative, curious, and open to new experiences. You enjoy exploring ideas and thinking outside the box.",
    traits: ["Creative", "Curious", "Imaginative", "Adventurous"],
    color: "bg-purple-500",
  },
  conscientiousness: {
    description:
      "You are likely organized, responsible, and goal-oriented. You value structure and tend to be reliable.",
    traits: ["Organized", "Disciplined", "Reliable", "Goal-oriented"],
    color: "bg-blue-500",
  },
  extraversion: {
    description: "You probably enjoy social interactions and tend to be energetic and assertive in group settings.",
    traits: ["Social", "Energetic", "Assertive", "Outgoing"],
    color: "bg-orange-500",
  },
  agreeableness: {
    description: "You likely value cooperation and tend to be trusting, helpful, and considerate of others.",
    traits: ["Cooperative", "Trusting", "Helpful", "Empathetic"],
    color: "bg-green-500",
  },
  neuroticism: {
    description: "You may be more sensitive to stress and tend to experience emotions more intensely.",
    traits: ["Sensitive", "Emotional", "Reactive", "Introspective"],
    color: "bg-red-500",
  },
}

export function PersonalityResult({ result }: PersonalityResultProps) {
  const personality = personalityDescriptions[result.personality as keyof typeof personalityDescriptions]
  const likelihoodPercentage = Math.round(result.likelihood * 100)

  if (!personality) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Unable to determine personality type. Please try again.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <CardTitle className="text-xl">Analysis Complete</CardTitle>
            <CardDescription>Your personality insight is ready</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Result */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-primary capitalize">{result.personality}</h3>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{likelihoodPercentage}% confidence</span>
            </div>
          </div>

          <Progress value={likelihoodPercentage} className="h-3" />
        </div>

        {/* Description */}
        {/* <div className="space-y-3">
          <h4 className="font-semibold">What this means:</h4>
          <p className="text-muted-foreground leading-relaxed text-balance">{personality.description}</p>
        </div> */}

        {/* Traits */}
        <div className="space-y-3">
          <h4 className="font-semibold">Key traits:</h4>
          <div className="flex flex-wrap gap-2">
            {personality.traits.map((trait, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {trait}
              </Badge>
            ))}
          </div>
        </div>

        {/* Confidence Indicator */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Confidence Level</span>
            <span className="font-medium">
              {likelihoodPercentage >= 80
                ? "Very High"
                : likelihoodPercentage >= 70
                  ? "High"
                  : likelihoodPercentage >= 60
                    ? "Moderate"
                    : "Low"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
