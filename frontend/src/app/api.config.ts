const metaEnv =
  typeof import.meta !== 'undefined' && import.meta
    ? (((import.meta as any).env as Record<string, unknown>) ?? {})
    : {};

const runtimeConfig = (globalThis as any).__APP_CONFIG__?.apiBaseUrl;
const envValue = metaEnv['NG_APP_API_BASE_URL'];

const resolved =
  (typeof runtimeConfig === 'string' && runtimeConfig.trim().length > 0 && runtimeConfig.trim()) ||
  (typeof envValue === 'string' && envValue.trim().length > 0 && envValue.trim()) ||
  'http://localhost:3000/api';

export const API_BASE_URL = resolved;
