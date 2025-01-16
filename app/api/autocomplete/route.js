import axios from 'axios';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return new Response(JSON.stringify({ error: 'Query parameter is required' }), { status: 400 });
  }

  try {
    const response = await axios.get('https://api.weatherapi.com/v1/search.json', {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: query,
      },
    });

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.response?.data?.error?.message || 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
