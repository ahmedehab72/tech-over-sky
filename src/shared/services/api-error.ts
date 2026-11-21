import { AxiosError, isAxiosError } from "axios";

export type ApiError = {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
};

type ApiErrorResponse = {
  message?: string;
  error?: string;
  code?: string;
  details?: unknown;
};

function getAxiosErrorMessage(error: AxiosError<ApiErrorResponse>) {
  return (
    error.response?.data?.message ??
    error.response?.data?.error ??
    error.message ??
    "Something went wrong."
  );
}

export function normalizeApiError(error: unknown): ApiError {
  if (isApiError(error)) {
    return error;
  }

  if (isAxiosError<ApiErrorResponse>(error)) {
    return {
      message: getAxiosErrorMessage(error),
      status: error.response?.status,
      code: error.response?.data?.code ?? error.code,
      details: error.response?.data?.details,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Something went wrong.",
  };
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as ApiError).message === "string"
  );
}

export function getErrorMessage(error: unknown, fallback = "Something went wrong.") {
  return normalizeApiError(error).message || fallback;
}
