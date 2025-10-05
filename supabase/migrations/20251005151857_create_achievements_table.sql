/*
  # Create Achievements Schema

  ## New Tables
  
  ### `achievements`
  - `id` (text, primary key) - Unique identifier for achievement (e.g., 'explorer-10')
  - `name` (text) - Achievement name
  - `description` (text) - Achievement description
  - `icon` (text) - Emoji or icon representation
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on `achievements` table
  - Allow public read access for achievements
*/

CREATE TABLE IF NOT EXISTS achievements (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT '🏆',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view achievements"
  ON achievements
  FOR SELECT
  TO public
  USING (true);
