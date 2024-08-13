"use client";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useIsClient } from 'usehooks-ts'

import { Alert } from "@/components/Alert";

export function extractErrorMessage(error: Error): string {
  if (error instanceof Error) {
    const match = error.message.match(/'([^']+)'/);

    if (match && match[1]) {
      return match.input as string;
    }
  }

  return "An error occurred";
}