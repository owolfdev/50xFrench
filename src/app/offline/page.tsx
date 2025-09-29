import { WifiOff, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <WifiOff className="h-16 w-16 text-gray-400 mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        You&apos;re Offline
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        It looks like you&apos;re not connected to the internet. Don&apos;t
        worry! You can still practice French phrases that were previously
        loaded.
      </p>
      <div className="space-y-3">
        <Button asChild>
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Go to Home
          </Link>
        </Button>
        <p className="text-sm text-gray-500">
          Some features may be limited while offline
        </p>
      </div>
    </div>
  );
}
