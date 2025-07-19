// components/FetchErrorAlert.tsx
import * as React from "react"
import {
  Alert,
  AlertTitle,
  AlertDescription
} from "@/components/ui/alert"
import { XCircleIcon } from "lucide-react"


export function FetchAlert({ error, onClose }) {
  return (
    <Alert variant="destructive" className="mb-4">
      <XCircleIcon className="h-5 w-5 text-destructive-foreground" />
      <AlertTitle className="ml-2">Error</AlertTitle>
      <AlertDescription className="ml-2">{error}</AlertDescription>
    </Alert>
  )
}
