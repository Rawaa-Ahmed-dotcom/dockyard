import { Link } from "react-router-dom"
import { Compass } from "lucide-react"

import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-surface-muted">
        <Compass className="size-5 text-muted-foreground" aria-hidden />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-h3 font-semibold text-foreground">Page not found</h1>
        <p className="text-small text-muted-foreground">The page you're looking for doesn't exist or was moved.</p>
      </div>
      <Button asChild>
        <Link to="/app">Back to Dashboard</Link>
      </Button>
    </div>
  )
}
