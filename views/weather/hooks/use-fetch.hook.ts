import { gql } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { apolloClient } from '../../../config/apollo';
import { City } from '../interfaces/weather.interface';

export interface UseFetchHookInterface {
  cityData: City | null;
  error: Error | null;
  isLoading: boolean;
}

export const useFetch = (city: string): UseFetchHookInterface => {
  const [cityData, setCityData] = useState<City | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchCity = useCallback(async (name: string): Promise<void> => {
    setLoading(true);

    try {
      const result = await apolloClient().query({
        responseKey: 'getCityByName',
        query: gql`
          query {
            getCityByName(name: "${name}") {
              id
              name
              country
              coord {
                lon
                lat
              }
              weather {
                summary {
                  title
                  description
                  icon
                }
                temperature {
                  actual
                  feelsLike
                  min
                  max
                }
                wind {
                  speed
                  deg
                }
                clouds {
                  all
                  visibility
                  humidity
                }
                timestamp
              }
            }
          }
        `,
      });

      setCityData(result.data['getCityByName']);
      setError(null);
    } catch (error) {
      setCityData(null);
      setError(new Error(error));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (city) {
      fetchCity(city);
    } else {
      setError(null);
      setCityData(null);
    }
  }, [city, fetchCity]);

  return { cityData, error, isLoading };
};
