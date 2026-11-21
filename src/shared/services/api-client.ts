import axios from "axios";

import { env } from "@/shared/lib/env";
import { normalizeApiError } from "@/shared/services/api-error";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(normalizeApiError(error)),
);
