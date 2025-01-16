import axios from 'axios';

export async function GET(req) {
  // Extract the city from the query parameters
  const url = new URL(req.url);
  const city = url.searchParams.get('city');

  if (!city) {
    return new Response(
      JSON.stringify({ error: 'City parameter is required' }),
      { status: 400 }
    );
  }

  try {
    // Make the request to the weather API
    const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: city,
      },
    });

    // Return the weather data as JSON
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.response?.data?.error?.message || 'Internal Server Error',
      }),
      { status: 500 }
    );
  }
}
