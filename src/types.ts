export interface SpaceObject {
  id: string;
  name: string;
  type: 'planet' | 'moon' | 'star' | 'galaxy' | 'asteroid';
  description: string;
  keywords: string[];
  physics: {
    mass: string;
    radius: string;
    gravity: string;
    orbital_period?: string;
    rotation_period?: string;
    distance_from_sun?: string;
  };
  biology: {
    water_presence: string;
    atmosphere: string;
    potential_for_life: string;
  };
  history: {
    discovery_date: string;
    discovered_by: string;
    missions: string[];
    key_events: string[];
  };
  image_url: string;
  model_url?: string;
  color: string;
  scale: number;
}

export interface UserProfile {
  id: string;
  user_id: string;
  favorites: string[];
  browsing_history: string[];
  achievements: string[];
  created_at: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Quiz {
  id: string;
  object_id: string;
  question: string;
  options: string[];
  correct_answer: number;
}
