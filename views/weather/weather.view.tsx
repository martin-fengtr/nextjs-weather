import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { useFetch } from './hooks/use-fetch.hook';

export interface WeatherProps {
  children?: never;
}

export const WeatherView: FunctionComponent<WeatherProps> = () => {
  const [city, setCity] = useState<string>('');

  const { cityData, error, isLoading } = useFetch(city);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="w-[350px] h-full space-y-2">
      <div className="flex flex-row items-center space-x-4">
        <div>Select the city: </div>
        <select className="w-40 border rounded-md border-gray-300" value={city} onChange={handleChange}>
          <option value="">Select City</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Berlin">Berlin</option>
          <option value="Paris">Paris</option>
          <option value="Tokyo">Tokyo</option>
        </select>
      </div>

      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p className="text-red-400">{error.message}</p>}
      {!isLoading && cityData && (
        <div>
          <div className="col-span-1 md:col-span-2 space-y-2">
            <div className="flex flex-row items-center space-x-4">
              <img
                src={`http://openweathermap.org/img/wn/${cityData.weather.summary.icon}@2x.png`}
                alt="weather icon"
              />
              <div>
                <p>{cityData.weather.summary.title}</p>
                <p>{cityData.weather.summary.description}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-md border border-gray-300">
              <p className="font-semibold">City</p>
              <p>Id: {cityData.id}</p>
              <p>Name: {cityData.name}</p>
              <p>Country: {cityData.country}</p>
            </div>
            <div className="p-2 rounded-md border border-gray-300">
              <p className="font-semibold">Coordinates</p>
              <p>Latitude: {cityData.coord.lat}</p>
              <p>Longitude: {cityData.coord.lon}</p>
            </div>
            <div className="p-2 rounded-md border border-gray-300">
              <p className="font-semibold">Temperature</p>
              <p>Actual: {cityData.weather.temperature.actual}</p>
              <p>Feels Like: {cityData.weather.temperature.feelsLike}</p>
              <p>Min: {cityData.weather.temperature.min}</p>
              <p>Max: {cityData.weather.temperature.max}</p>
            </div>
            <div className="p-2 rounded-md border border-gray-300">
              <p className="font-semibold">Wind</p>
              <p>Speed: {cityData.weather.wind.speed}</p>
              <p>Degree: {cityData.weather.wind.deg}</p>
            </div>
            <div className="p-2 rounded-md border border-gray-300">
              <p className="font-semibold">Clouds</p>
              <p>All: {cityData.weather.clouds.all}</p>
              <p>Visibility: {cityData.weather.clouds.visibility}</p>
              <p>Humidity: {cityData.weather.clouds.humidity}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
