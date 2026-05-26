import { fetchAlerts, fetchForecast, fetchGridPoint } from '../api.js';
import { formatAlert, formatForecastPeriod } from '../formatters.js';

type ResourceResult = {
  contents: { uri: string; text: string }[];
};

export async function handleAlertsResource(state: string): Promise<ResourceResult> {
  const stateCode = state.toUpperCase();
  const alertsData = await fetchAlerts(stateCode);

  if (!alertsData) {
    return { contents: [{ uri: `weather://alerts/${stateCode}`, text: 'Failed to retrieve alerts data' }] };
  }

  const features = alertsData.features ?? [];

  if (features.length === 0) {
    return { contents: [{ uri: `weather://alerts/${stateCode}`, text: `No active alerts for ${state}` }] };
  }

  const formatted = features.map(formatAlert).join('\n');
  return { contents: [{ uri: `weather://alerts/${stateCode}`, text: `Active alerts for ${state}:\n\n${formatted}` }] };
}

export async function handleForecastResource(coordinates: string): Promise<ResourceResult> {
  const decoded = decodeURIComponent(coordinates);
  const [lat, lon] = decoded.split(',').map(Number);

  if (isNaN(lat) || isNaN(lon)) {
    return { contents: [{ uri: `weather://forecast/${coordinates}`, text: 'Invalid coordinates. Use format: weather://forecast/LAT,LON' }] };
  }

  const pointsData = await fetchGridPoint(lat, lon);

  if (!pointsData) {
    return {
      contents: [{
        uri: `weather://forecast/${coordinates}`,
        text: `Failed to retrieve grid point data for coordinates: ${lat}, ${lon}. Only US locations are supported.`,
      }],
    };
  }

  const forecastUrl = pointsData.properties?.forecast;
  if (!forecastUrl) {
    return { contents: [{ uri: `weather://forecast/${coordinates}`, text: 'Failed to get forecast URL from grid point data' }] };
  }

  const forecastData = await fetchForecast(forecastUrl);
  if (!forecastData) {
    return { contents: [{ uri: `weather://forecast/${coordinates}`, text: 'Failed to retrieve forecast data' }] };
  }

  const periods = forecastData.properties?.periods ?? [];
  if (periods.length === 0) {
    return { contents: [{ uri: `weather://forecast/${coordinates}`, text: 'No forecast periods available' }] };
  }

  const formatted = periods.map(formatForecastPeriod).join('\n');
  return { contents: [{ uri: `weather://forecast/${coordinates}`, text: `Forecast for ${lat}, ${lon}:\n\n${formatted}` }] };
}
