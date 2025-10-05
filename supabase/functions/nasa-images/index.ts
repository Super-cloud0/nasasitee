import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const NASA_API_KEY = Deno.env.get('NASA_API_KEY') || 'DEMO_KEY';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const query = url.searchParams.get('query');

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const nasaResponse = await fetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!nasaResponse.ok) {
      throw new Error('NASA API request failed');
    }

    const nasaData = await nasaResponse.json();
    const items = nasaData.collection?.items || [];

    const images = await Promise.all(
      items.slice(0, 10).map(async (item: any) => {
        try {
          const imageUrl = item.links?.[0]?.href;
          const title = item.data?.[0]?.title || 'Untitled';
          const description = item.data?.[0]?.description || 'No description available';

          return {
            href: imageUrl,
            title: title,
            description: description.substring(0, 200) + (description.length > 200 ? '...' : ''),
          };
        } catch (err) {
          return null;
        }
      })
    );

    const validImages = images.filter(img => img !== null);

    return new Response(
      JSON.stringify({ images: validImages }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch NASA images', images: [] }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});