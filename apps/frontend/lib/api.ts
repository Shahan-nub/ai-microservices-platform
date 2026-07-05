import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

const defaultConfig: CreateAxiosDefaults = {
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
};

export function createApiClient(config: CreateAxiosDefaults = {}): AxiosInstance {
  return axios.create({
    ...defaultConfig,
    ...config,
    headers: {
      ...defaultConfig.headers,
      ...config.headers,
    },
  });
}

export const api = createApiClient();

export function notImplemented(service: string): never {
  throw new Error(`${service} API integration has not been implemented yet.`);
}
