/*
  # Create Quizzes Schema

  ## New Tables
  
  ### `quizzes`
  - `id` (uuid, primary key) - Unique identifier for each quiz question
  - `object_id` (uuid) - Reference to space object
  - `question` (text) - Quiz question
  - `options` (text[]) - Array of answer options
  - `correct_answer` (integer) - Index of correct answer (0-based)
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on `quizzes` table
  - Allow public read access for educational purposes
*/

CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  object_id uuid NOT NULL REFERENCES space_objects(id) ON DELETE CASCADE,
  question text NOT NULL,
  options text[] NOT NULL,
  correct_answer integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view quizzes"
  ON quizzes
  FOR SELECT
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS idx_quizzes_object_id ON quizzes(object_id);
