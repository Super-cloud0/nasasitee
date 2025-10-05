import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') || '';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { query } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful astronomy assistant. Based on the user query, identify which celestial object they are looking for from this list: Mars (red planet with two moons), Jupiter (largest gas giant with Great Red Spot), Earth (blue planet with life), Moon (Earth satellite), Saturn (ringed planet), Venus (hottest planet, evening star), Mercury (smallest, closest to sun), Europa (icy moon of Jupiter with subsurface ocean). Respond with ONLY the exact name of the object (Mars, Jupiter, Earth, Moon, Saturn, Venus, Mercury, or Europa). If unclear, respond with the most likely match.',
          },
          {
            role: 'user',
            content: query,
          },
        ],
        temperature: 0.3,
        max_tokens: 50,
      }),
    });

    const aiData = await response.json();
    const objectName = aiData.choices[0]?.message?.content?.trim();

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

    const dbResponse = await fetch(
      `${supabaseUrl}/rest/v1/space_objects?name=ilike.${encodeURIComponent(objectName)}`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    );

    const objects = await dbResponse.json();

    if (objects && objects.length > 0) {
      return new Response(
        JSON.stringify({ object: objects[0], suggestion: objectName }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Object not found', suggestion: objectName }),
      {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});