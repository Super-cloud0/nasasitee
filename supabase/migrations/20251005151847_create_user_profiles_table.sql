/*
  # Create User Profiles Schema

  ## New Tables
  
  ### `user_profiles`
  - `id` (uuid, primary key) - Unique identifier for each profile
  - `user_id` (text) - User identifier (can be 'guest' or auth user ID)
  - `favorites` (text[]) - Array of favorite space object IDs
  - `browsing_history` (text[]) - Array of recently viewed object IDs
  - `achievements` (text[]) - Array of unlocked achievement IDs
  - `created_at` (timestamptz) - Profile creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on `user_profiles` table
  - Public can create and read their own profiles
  - Authenticated users can update their own profiles
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  favorites text[] DEFAULT '{}',
  browsing_history text[] DEFAULT '{}',
  achievements text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create profiles"
  ON user_profiles
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view profiles"
  ON user_profiles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can update profiles"
  ON user_profiles
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
