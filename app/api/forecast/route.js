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
    // Make the request to the WeatherAPI for 7-day forecast data
    const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
      params: {
        key: process.env.WEATHER_API_KEY,  // Use your API key from environment variable
        q: city,
        days: 7,  // Get 7-day forecast
      },
    });

    // Return the forecast data as JSON
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    // Handle error and return detailed message
    return new Response(
      JSON.stringify({
        error: error.response?.data?.error?.message || 'Internal Server Error',
      }),
      { status: 500 }
    );
  }
}
