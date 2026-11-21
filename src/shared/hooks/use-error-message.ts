import { getErrorMessage } from "@/shared/services/api-error";

export function useErrorMessage(error: unknown, fallback?: string) {
  if (!error) {
    return null;
  }

  return getErrorMessage(error, fallback);
}
