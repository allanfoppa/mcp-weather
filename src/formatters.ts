import type { AlertFeature, ForecastPeriod } from './types.js';

export function formatAlert(feature: AlertFeature): string {
  const { event, areaDesc, severity, status, headline } = feature.properties;
  return [
    `Event: ${event ?? 'Unknown'}`,
    `Area: ${areaDesc ?? 'Unknown'}`,
    `Severity: ${severity ?? 'Unknown'}`,
    `Status: ${status ?? 'Unknown'}`,
    `Headline: ${headline ?? 'No headline'}`,
    '---',
  ].join('\n');
}

export function formatForecastPeriod(period: ForecastPeriod): string {
  return [
    `${period.name ?? 'Unknown'}:`,
    `Temperature: ${period.temperature ?? 'Unknown'}°${period.temperatureUnit ?? 'F'}`,
    `Wind: ${period.windSpeed ?? 'Unknown'} ${period.windDirection ?? ''}`,
    `${period.shortForecast ?? 'No forecast available'}`,
    '---',
  ].join('\n');
}
