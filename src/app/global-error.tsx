"use client"; // Error components must be Client Components

import { HydroError } from "@/lib/error";
import { useEffect } from "react";
import { toast } from "sonner";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    if (error instanceof HydroError) {
      toast.error(error.message);
      reset();
    }
  }, [error]);

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
