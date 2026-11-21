const requiredEnv = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  appName: import.meta.env.VITE_APP_NAME,
};

export const env = {
  apiBaseUrl: requiredEnv.apiBaseUrl ?? "",
  appName: requiredEnv.appName ?? "React Feature Template",
};
