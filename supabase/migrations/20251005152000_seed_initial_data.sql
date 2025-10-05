/*
  # Seed Initial Data

  ## Description
  - Populate space_objects table with initial celestial objects
  - Add achievements for gamification
  - Add sample quizzes for educational mode

  ## Data Inserted
  - 8 space objects (planets and moons)
  - 3 achievements
  - Sample quizzes for each object
*/

-- Insert Space Objects
INSERT INTO space_objects (name, type, description, keywords, physics, biology, history, image_url, color, scale) VALUES
(
  'Mars',
  'planet',
  'The Red Planet, fourth from the Sun with a dusty, cold desert world.',
  ARRAY['red', 'planet', 'two moons', 'dusty', 'desert', 'rover'],
  '{"mass": "6.39 × 10²³ kg", "radius": "3,389.5 km", "gravity": "3.721 m/s²", "orbital_period": "687 Earth days", "rotation_period": "24.6 hours", "distance_from_sun": "227.9 million km"}',
  '{"water_presence": "Ice at poles, evidence of ancient water", "atmosphere": "Thin CO₂ atmosphere (95.3%)", "potential_for_life": "Past microbial life possible, ongoing research"}',
  '{"discovery_date": "Known since ancient times", "discovered_by": "Ancient astronomers", "missions": ["Viking 1 & 2", "Pathfinder", "Spirit & Opportunity", "Curiosity", "Perseverance"], "key_events": ["First successful landing (Viking 1, 1976)", "Water ice confirmed (2008)", "Perseverance rover landed (2021)"]}',
  'https://science.nasa.gov/wp-content/uploads/2023/09/mars-full-disk.jpg',
  '#CD5C5C',
  1.0
),
(
  'Jupiter',
  'planet',
  'The largest planet in our solar system, a gas giant with a Great Red Spot.',
  ARRAY['gas giant', 'largest planet', 'red spot', 'storms', 'moons'],
  '{"mass": "1.898 × 10²⁷ kg", "radius": "69,911 km", "gravity": "24.79 m/s²", "orbital_period": "11.86 Earth years", "rotation_period": "9.9 hours", "distance_from_sun": "778.5 million km"}',
  '{"water_presence": "Water vapor in atmosphere", "atmosphere": "Hydrogen (90%), Helium (10%)", "potential_for_life": "Unlikely on planet, but moons Europa and Ganymede are candidates"}',
  '{"discovery_date": "Known since ancient times", "discovered_by": "Ancient astronomers", "missions": ["Pioneer 10 & 11", "Voyager 1 & 2", "Galileo", "Juno"], "key_events": ["Great Red Spot observed (1830)", "Shoemaker-Levy 9 impact (1994)", "Juno mission (2016-present)"]}',
  'https://science.nasa.gov/wp-content/uploads/2023/06/jupiter-marble-pia22946-16.jpg',
  '#DAA520',
  2.5
),
(
  'Earth',
  'planet',
  'Our home planet, the only known world with life.',
  ARRAY['blue planet', 'life', 'water', 'home', 'atmosphere'],
  '{"mass": "5.972 × 10²⁴ kg", "radius": "6,371 km", "gravity": "9.807 m/s²", "orbital_period": "365.25 days", "rotation_period": "24 hours", "distance_from_sun": "149.6 million km"}',
  '{"water_presence": "71% surface covered by water", "atmosphere": "Nitrogen (78%), Oxygen (21%)", "potential_for_life": "Confirmed - only known planet with life"}',
  '{"discovery_date": "Always known to humans", "discovered_by": "N/A", "missions": ["Numerous satellites", "ISS", "Earth observation missions"], "key_events": ["First photo from space (1946)", "Earthrise photo (1968)", "Pale Blue Dot (1990)"]}',
  'https://science.nasa.gov/wp-content/uploads/2023/09/blue-marble-apollo-17-pia00122-jpg.webp',
  '#4169E1',
  1.0
),
(
  'Moon',
  'moon',
  'Earth''s only natural satellite, with a cratered surface.',
  ARRAY['satellite', 'craters', 'apollo', 'lunar', 'tides'],
  '{"mass": "7.342 × 10²² kg", "radius": "1,737.4 km", "gravity": "1.62 m/s²", "orbital_period": "27.3 days", "rotation_period": "27.3 days", "distance_from_sun": "Same as Earth"}',
  '{"water_presence": "Ice in polar craters", "atmosphere": "Extremely thin exosphere", "potential_for_life": "None"}',
  '{"discovery_date": "Known since prehistoric times", "discovered_by": "N/A", "missions": ["Apollo 11-17", "Luna missions", "Artemis program"], "key_events": ["First human landing (Apollo 11, 1969)", "Water ice confirmed (2009)", "Artemis I mission (2022)"]}',
  'https://science.nasa.gov/wp-content/uploads/2023/09/moon-full-svs11763-orig.jpg',
  '#C0C0C0',
  0.5
),
(
  'Saturn',
  'planet',
  'The ringed planet, a gas giant famous for its spectacular ring system.',
  ARRAY['rings', 'gas giant', 'titan', 'golden', 'beautiful'],
  '{"mass": "5.683 × 10²⁶ kg", "radius": "58,232 km", "gravity": "10.44 m/s²", "orbital_period": "29.5 Earth years", "rotation_period": "10.7 hours", "distance_from_sun": "1.43 billion km"}',
  '{"water_presence": "Water ice in rings and moons", "atmosphere": "Hydrogen (96%), Helium (3%)", "potential_for_life": "Moon Enceladus and Titan are candidates"}',
  '{"discovery_date": "Known since ancient times", "discovered_by": "Ancient astronomers", "missions": ["Pioneer 11", "Voyager 1 & 2", "Cassini-Huygens"], "key_events": ["Rings discovered by Galileo (1610)", "Titan''s atmosphere discovered (1944)", "Cassini Grand Finale (2017)"]}',
  'https://science.nasa.gov/wp-content/uploads/2023/05/saturn-farewell-pia21345-sse-banner-1920x640-1.jpg',
  '#F4A460',
  2.2
),
(
  'Venus',
  'planet',
  'Earth''s twin in size, but with a scorching hot surface and thick atmosphere.',
  ARRAY['hot', 'thick atmosphere', 'volcanic', 'brightest', 'evening star'],
  '{"mass": "4.867 × 10²⁴ kg", "radius": "6,051.8 km", "gravity": "8.87 m/s²", "orbital_period": "225 Earth days", "rotation_period": "243 Earth days (retrograde)", "distance_from_sun": "108.2 million km"}',
  '{"water_presence": "None on surface, destroyed by heat", "atmosphere": "CO₂ (96.5%), extreme greenhouse effect", "potential_for_life": "Possible microbial life in clouds"}',
  '{"discovery_date": "Known since ancient times", "discovered_by": "Ancient astronomers", "missions": ["Venera program", "Magellan", "Venus Express"], "key_events": ["First spacecraft to land on another planet (Venera 7, 1970)", "Surface mapped by Magellan (1990-1994)"]}',
  'https://science.nasa.gov/wp-content/uploads/2023/09/venus-mariner-10-pia23791-fig2-16x9-1.jpg',
  '#FFA07A',
  0.95
),
(
  'Mercury',
  'planet',
  'The smallest planet and closest to the Sun, with extreme temperature variations.',
  ARRAY['small', 'hot', 'cold', 'cratered', 'closest to sun'],
  '{"mass": "3.285 × 10²³ kg", "radius": "2,439.7 km", "gravity": "3.7 m/s²", "orbital_period": "88 Earth days", "rotation_period": "59 Earth days", "distance_from_sun": "57.9 million km"}',
  '{"water_presence": "Ice in polar craters", "atmosphere": "Extremely thin exosphere", "potential_for_life": "None"}',
  '{"discovery_date": "Known since ancient times", "discovered_by": "Ancient astronomers", "missions": ["Mariner 10", "MESSENGER", "BepiColombo"], "key_events": ["First flyby (Mariner 10, 1974)", "MESSENGER orbit (2011-2015)", "Water ice confirmed (2012)"]}',
  'https://science.nasa.gov/wp-content/uploads/2023/09/mercury-messenger-pia15162.jpg',
  '#A9A9A9',
  0.4
),
(
  'Europa',
  'moon',
  'Jupiter''s icy moon with a subsurface ocean, a top candidate for extraterrestrial life.',
  ARRAY['ice', 'ocean', 'jupiter moon', 'life candidate', 'water'],
  '{"mass": "4.8 × 10²² kg", "radius": "1,560.8 km", "gravity": "1.314 m/s²", "orbital_period": "3.5 Earth days", "rotation_period": "3.5 days (tidally locked)", "distance_from_sun": "778.5 million km"}',
  '{"water_presence": "Subsurface ocean under ice shell", "atmosphere": "Extremely thin oxygen atmosphere", "potential_for_life": "High - subsurface ocean may harbor life"}',
  '{"discovery_date": "January 8, 1610", "discovered_by": "Galileo Galilei", "missions": ["Voyager 1 & 2", "Galileo", "Europa Clipper (upcoming)"], "key_events": ["Discovery by Galileo (1610)", "Subsurface ocean evidence (1990s)", "Europa Clipper launch planned (2024)"]}',
  'https://science.nasa.gov/wp-content/uploads/2023/05/europa-galileo-pia19048.jpg',
  '#B0E0E6',
  0.6
)
ON CONFLICT (id) DO NOTHING;

-- Insert Achievements
INSERT INTO achievements (id, name, description, icon) VALUES
('explorer-10', 'Explorer', 'Viewed 10 different celestial objects', '🔭'),
('favorites-5', 'Collector', 'Added 5 objects to favorites', '⭐'),
('quiz-master', 'Quiz Master', 'Answered a quiz question correctly', '🎓')
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Quizzes
INSERT INTO quizzes (object_id, question, options, correct_answer)
SELECT 
  id,
  'What is the nickname of ' || name || '?',
  ARRAY[
    CASE name
      WHEN 'Mars' THEN 'The Red Planet'
      WHEN 'Jupiter' THEN 'The Giant Planet'
      WHEN 'Earth' THEN 'The Blue Planet'
      WHEN 'Moon' THEN 'Luna'
      WHEN 'Saturn' THEN 'The Ringed Planet'
      WHEN 'Venus' THEN 'The Evening Star'
      WHEN 'Mercury' THEN 'The Swift Planet'
      WHEN 'Europa' THEN 'The Ice Moon'
    END,
    'The Green Planet',
    'The Purple Planet',
    'The Golden Planet'
  ],
  0
FROM space_objects
WHERE name IN ('Mars', 'Jupiter', 'Earth', 'Moon', 'Saturn', 'Venus', 'Mercury', 'Europa')
ON CONFLICT DO NOTHING;

INSERT INTO quizzes (object_id, question, options, correct_answer)
SELECT 
  id,
  'How many moons does ' || name || ' have?',
  ARRAY[
    CASE name
      WHEN 'Mars' THEN '2 (Phobos and Deimos)'
      WHEN 'Jupiter' THEN '95 known moons'
      WHEN 'Earth' THEN '1 (The Moon)'
      WHEN 'Saturn' THEN '146 known moons'
      WHEN 'Venus' THEN '0'
      WHEN 'Mercury' THEN '0'
    END,
    '5',
    '10',
    '100'
  ],
  0
FROM space_objects
WHERE name IN ('Mars', 'Jupiter', 'Earth', 'Saturn', 'Venus', 'Mercury')
ON CONFLICT DO NOTHING;
