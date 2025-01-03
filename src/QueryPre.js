import { useEffect, useState } from 'react';

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay)); 

const fetchWeather = async () => {
  await sleep(2000);

  const appId = process.env.REACT_APP_OPENWEATHERMAP_APP_ID;
  const endpoint = `https://api.openweathermap.org/data/2.5/weather`;
  const query = `q=Seoul&appid=${appId}`;

  const response = await fetch(`${endpoint}?${query}`);

  if (!response.ok) {
    throw new Error(`Error fetching weather: ${response.statusText}`);
  }

  return response.json();
};

export default function QueryPre({ id }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchWeather()
      .then((result) => setData(result))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <figure>
      <img
        src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}
        alt={data?.weather?.[0]?.main}
      />
      <figcaption>{data?.weather?.[0]?.description}</figcaption>
    </figure>
  );
}