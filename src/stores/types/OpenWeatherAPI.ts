export interface OpenWeatherParams {
  lat: string;
  lon: string;
  appId: string;
  lang?: string;
  units?: 'standard' | 'metric' | 'imperial';
}

export interface OpenWeatherResponse {
  name: string;
  main: {
    temp: number;
  };
}
