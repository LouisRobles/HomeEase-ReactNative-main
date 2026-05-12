export const config = {
  API_URL: process.env.EXPO_PUBLIC_API_URL ?? "https://api.homeease.com",
  APP_VERSION: "1.0.0",
  API_TIMEOUT_MS: 8000,
  PAGINATION: {
    pageSize: 20,
  },
  PAYMENTS: {
    methods: ["cash", "gcash", "maya", "bank"] as const,
  },
  FEATURES: {
    paymentsEnabled: true,
    reviewsEnabled: true,
    messagingEnabled: true,
  },
} as const;
