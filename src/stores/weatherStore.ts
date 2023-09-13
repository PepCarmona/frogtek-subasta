import { defineStore } from 'pinia';
import type { OpenWeatherParams, OpenWeatherResponse } from './types/OpenWeatherAPI';
import { computed, ref } from 'vue';

export const useWeatherStore = defineStore('weatherStore', () => {
  const API_KEY = import.meta.env.VITE_WEATHER_API;
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const COORDINATES = {
    latitude: 42.1359363,
    longitude: -0.4264909
  };

  const weatherLocation = ref<string>();
  const temperature = ref<number>();

  const isLoading = ref<boolean>(false);

  function clearWeatherData(): void {
    weatherLocation.value = undefined;
    temperature.value = undefined;
  }

  function fetchWeatherReport(): void {
    isLoading.value = true;

    const apiUrl = buildUrl({
      appId: API_KEY,
      lat: COORDINATES.latitude.toString(),
      lon: COORDINATES.longitude.toString(),
      units: 'metric'
    });

    fetch(apiUrl)
      .then((response) =>
        response
          .json()
          .then((data: OpenWeatherResponse) => {
            weatherLocation.value = data.name;
            temperature.value = data.main.temp;

            isLoading.value = false;
          })
          .catch(console.error)
      )
      .catch(console.error);
  }

  function buildUrl(params: OpenWeatherParams): string {
    const queryString = new URLSearchParams({ ...params });

    return `${BASE_URL}?${queryString.toString()}`;
  }

  return {
    weatherLocation,
    temperature,
    isLoading: computed(() => isLoading.value),
    clearWeatherData,
    fetchWeatherReport
  };
});
