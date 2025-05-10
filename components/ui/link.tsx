import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const linkVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-primary underline-offset-4 hover:underline",
        destructive: "text-destructive underline-offset-4 hover:underline",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        amber: "text-amber-400 underline-offset-4 hover:underline hover:text-amber-300",
      },
      size: {
        default: "",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ className, variant, size, ...props }, ref) => {
  return <a className={cn(linkVariants({ variant, size, className }))} ref={ref} {...props} />
})
Link.displayName = "Link"

export { Link, linkVariants }
