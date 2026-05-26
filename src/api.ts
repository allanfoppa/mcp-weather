import { NWS_API_BASE, USER_AGENT } from './constants.js';
import type {
  AlertsResponse,
  ForecastResponse,
  PointsResponse,
} from './types.js';

const HEADERS = {
  'User-Agent': USER_AGENT,
  Accept: 'application/geo+json',
};

async function request<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { headers: HEADERS });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error('Error making NWS request:', error);
    return null;
  }
}

export async function fetchAlerts(stateCode: string): Promise<AlertsResponse | null> {
  return request<AlertsResponse>(`${NWS_API_BASE}/alerts?area=${stateCode}`);
}

export async function fetchGridPoint(latitude: number, longitude: number): Promise<PointsResponse | null> {
  const url = `${NWS_API_BASE}/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`;
  return request<PointsResponse>(url);
}

export async function fetchForecast(forecastUrl: string): Promise<ForecastResponse | null> {
  return request<ForecastResponse>(forecastUrl);
}
