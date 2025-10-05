/*
  # Create Space Objects Schema

  ## New Tables
  
  ### `space_objects`
  - `id` (uuid, primary key) - Unique identifier for each celestial object
  - `name` (text) - Name of the object (e.g., "Mars", "Jupiter")
  - `type` (text) - Type of object (planet, moon, star, galaxy, asteroid)
  - `description` (text) - Short description of the object
  - `keywords` (text[]) - Array of keywords for AI semantic search
  - `physics` (jsonb) - Physical properties (mass, radius, gravity, orbital period, etc.)
  - `biology` (jsonb) - Biological conditions (water presence, atmosphere, life potential)
  - `history` (jsonb) - Historical data (discovery date, missions, key events)
  - `image_url` (text) - URL to NASA image
  - `model_url` (text, nullable) - URL to 3D model file
  - `color` (text) - Hex color for 3D representation
  - `scale` (numeric) - Scale factor for 3D model
  - `created_at` (timestamptz) - Timestamp of creation

  ## Security
  - Enable RLS on `space_objects` table
  - Add policy for public read access (educational platform)
*/

CREATE TABLE IF NOT EXISTS space_objects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  keywords text[] DEFAULT '{}',
  physics jsonb NOT NULL DEFAULT '{}',
  biology jsonb NOT NULL DEFAULT '{}',
  history jsonb NOT NULL DEFAULT '{}',
  image_url text NOT NULL,
  model_url text,
  color text NOT NULL DEFAULT '#888888',
  scale numeric NOT NULL DEFAULT 1.0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE space_objects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view space objects"
  ON space_objects
  FOR SELECT
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS idx_space_objects_type ON space_objects(type);
CREATE INDEX IF NOT EXISTS idx_space_objects_name ON space_objects(name);
