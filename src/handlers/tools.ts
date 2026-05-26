import { fetchAlerts, fetchForecast, fetchGridPoint } from '../api.js';
import { formatAlert, formatForecastPeriod } from '../formatters.js';

type TextContent = { type: 'text'; text: string };
type ToolResult = { content: TextContent[] };

function textResult(text: string): ToolResult {
  return { content: [{ type: 'text' as const, text }] };
}

export async function handleGetAlerts({ state }: { state: string }): Promise<ToolResult> {
  const stateCode = state.toUpperCase();
  const alertsData = await fetchAlerts(stateCode);

  if (!alertsData) {
    return textResult('Failed to retrieve alerts data');
  }

  const features = alertsData.features ?? [];

  if (features.length === 0) {
    return textResult(`No active alerts for ${stateCode}`);
  }

  const formatted = features.map(formatAlert).join('\n');
  return textResult(`Active alerts for ${stateCode}:\n\n${formatted}`);
}

export async function handleGetForecast({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<ToolResult> {
  const pointsData = await fetchGridPoint(latitude, longitude);

  if (!pointsData) {
    return textResult(
      `Failed to retrieve grid point data for coordinates: ${latitude}, ${longitude}. ` +
      'This location may not be supported by the NWS API (only US locations are supported).',
    );
  }

  const forecastUrl = pointsData.properties?.forecast;
  if (!forecastUrl) {
    return textResult('Failed to get forecast URL from grid point data');
  }

  const forecastData = await fetchForecast(forecastUrl);
  if (!forecastData) {
    return textResult('Failed to retrieve forecast data');
  }

  const periods = forecastData.properties?.periods ?? [];
  if (periods.length === 0) {
    return textResult('No forecast periods available');
  }

  const formatted = periods.map(formatForecastPeriod).join('\n');
  return textResult(`Forecast for ${latitude}, ${longitude}:\n\n${formatted}`);
}
