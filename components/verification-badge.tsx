import { CheckCircle, Award, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

type VerificationBadgeType = "verified" | "premium" | "official"

interface VerificationBadgeProps {
  type?: VerificationBadgeType
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function VerificationBadge({ type = "verified", size = "md", className }: VerificationBadgeProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const typeClasses = {
    verified: "text-blue-500",
    premium: "text-amber-500",
    official: "text-green-500",
  }

  const BadgeIcon = {
    verified: CheckCircle,
    premium: Award,
    official: Shield,
  }[type]

  return (
    <span className={cn("inline-flex items-center", className)}>
      <BadgeIcon className={cn(sizeClasses[size], typeClasses[type])} />
    </span>
  )
}
