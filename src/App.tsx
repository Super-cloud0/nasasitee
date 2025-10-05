import { useState, useEffect } from 'react';
import { SpaceObject, UserProfile as UserProfileType, Achievement, Quiz as QuizType } from './types';
import { supabase } from './lib/supabase';
import SearchBar from './components/SearchBar';
import ObjectList from './components/ObjectList';
import SpaceObjectViewer from './components/SpaceObjectViewer';
import ComparisonView from './components/ComparisonView';
import ObjectDetails from './components/ObjectDetails';
import TimelapseControls from './components/TimelapseControls';
import NASAGallery from './components/NASAGallery';
import Quiz from './components/Quiz';
import UserProfile from './components/UserProfile';
import {
  Search,
  GitCompare,
  Book,
  User,
  Camera,
  GraduationCap,
  Layers,
} from 'lucide-react';

export default function App() {
  const [objects, setObjects] = useState<SpaceObject[]>([]);
  const [selectedObject, setSelectedObject] = useState<SpaceObject | null>(null);
  const [comparisonObject, setComparisonObject] = useState<SpaceObject | null>(null);
  const [viewMode, setViewMode] = useState<'physics' | 'biology' | 'history' | 'overview'>('overview');
  const [comparisonMode, setComparisonMode] = useState<'side-by-side' | 'overlay'>('side-by-side');
  const [isTimelapsePlaying, setIsTimelapsePlaying] = useState(false);
  const [timeScale, setTimeScale] = useState(1);
  const [showNASAGallery, setShowNASAGallery] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<QuizType | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'explore' | 'compare' | 'learn'>('explore');

  useEffect(() => {
    loadObjects();
    loadAchievements();
    initUserProfile();
  }, []);

  const loadObjects = async () => {
    const { data, error } = await supabase
      .from('space_objects')
      .select('*')
      .order('name');

    if (data && !error) {
      setObjects(data);
      if (data.length > 0) {
        setSelectedObject(data[0]);
      }
    }
  };

  const loadAchievements = async () => {
    const { data } = await supabase.from('achievements').select('*');
    if (data) setAchievements(data);
  };

  const initUserProfile = async () => {
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (data) {
      setUserProfile(data);
    } else {
      const { data: newProfile } = await supabase
        .from('user_profiles')
        .insert({
          user_id: 'guest',
          favorites: [],
          browsing_history: [],
          achievements: [],
        })
        .select()
        .single();

      if (newProfile) setUserProfile(newProfile);
    }
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/search-objects`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ query }),
        }
      );

      const data = await response.json();
      if (data.object) {
        const foundObject = objects.find((obj) => obj.id === data.object.id);
        if (foundObject) {
          setSelectedObject(foundObject);
          addToBrowsingHistory(foundObject.id);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleToggleFavorite = async (objectId: string) => {
    if (!userProfile) return;

    const newFavorites = userProfile.favorites.includes(objectId)
      ? userProfile.favorites.filter((id) => id !== objectId)
      : [...userProfile.favorites, objectId];

    await supabase
      .from('user_profiles')
      .update({ favorites: newFavorites })
      .eq('id', userProfile.id);

    setUserProfile({ ...userProfile, favorites: newFavorites });

    if (newFavorites.length >= 5 && !userProfile.achievements.includes('favorites-5')) {
      unlockAchievement('favorites-5');
    }
  };

  const addToBrowsingHistory = async (objectId: string) => {
    if (!userProfile) return;

    const newHistory = [objectId, ...userProfile.browsing_history.filter((id) => id !== objectId)].slice(0, 50);

    await supabase
      .from('user_profiles')
      .update({ browsing_history: newHistory })
      .eq('id', userProfile.id);

    setUserProfile({ ...userProfile, browsing_history: newHistory });

    if (newHistory.length >= 10 && !userProfile.achievements.includes('explorer-10')) {
      unlockAchievement('explorer-10');
    }
  };

  const unlockAchievement = async (achievementId: string) => {
    if (!userProfile) return;

    const newAchievements = [...userProfile.achievements, achievementId];

    await supabase
      .from('user_profiles')
      .update({ achievements: newAchievements })
      .eq('id', userProfile.id);

    setUserProfile({ ...userProfile, achievements: newAchievements });
  };

  const loadQuiz = async () => {
    if (!selectedObject) return;

    const { data } = await supabase
      .from('quizzes')
      .select('*')
      .eq('object_id', selectedObject.id)
      .limit(1)
      .maybeSingle();

    if (data) {
      setCurrentQuiz(data);
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = (correct: boolean) => {
    if (correct && userProfile && !userProfile.achievements.includes('quiz-master')) {
      unlockAchievement('quiz-master');
    }
    setTimeout(() => {
      setShowQuiz(false);
      setCurrentQuiz(null);
    }, 2000);
  };

  const handleObjectSelect = (object: SpaceObject) => {
    setSelectedObject(object);
    addToBrowsingHistory(object.id);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Astronomy Explorer</h1>
            <button
              onClick={() => setShowProfile(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <User size={20} />
              Profile
            </button>
          </div>

          <SearchBar onSearch={handleSearch} isSearching={isSearching} />

          <div className="flex gap-2 mt-6">
            <TabButton
              icon={<Search size={18} />}
              label="Explore"
              active={activeTab === 'explore'}
              onClick={() => setActiveTab('explore')}
            />
            <TabButton
              icon={<GitCompare size={18} />}
              label="Compare"
              active={activeTab === 'compare'}
              onClick={() => setActiveTab('compare')}
            />
            <TabButton
              icon={<GraduationCap size={18} />}
              label="Learn"
              active={activeTab === 'learn'}
              onClick={() => setActiveTab('learn')}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'explore' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <ObjectList
                objects={objects}
                selectedObject={selectedObject}
                favorites={userProfile?.favorites || []}
                onSelectObject={handleObjectSelect}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>

            <div className="lg:col-span-2 space-y-4">
              {selectedObject && (
                <>
                  <div className="h-96 rounded-lg overflow-hidden border border-gray-700">
                    <SpaceObjectViewer
                      object={selectedObject}
                      showOrbit={isTimelapsePlaying}
                      timeScale={isTimelapsePlaying ? timeScale : 0}
                    />
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <ViewModeButton
                      label="Overview"
                      active={viewMode === 'overview'}
                      onClick={() => setViewMode('overview')}
                    />
                    <ViewModeButton
                      label="Physics"
                      active={viewMode === 'physics'}
                      onClick={() => setViewMode('physics')}
                    />
                    <ViewModeButton
                      label="Biology"
                      active={viewMode === 'biology'}
                      onClick={() => setViewMode('biology')}
                    />
                    <ViewModeButton
                      label="History"
                      active={viewMode === 'history'}
                      onClick={() => setViewMode('history')}
                    />
                    <button
                      onClick={() => setShowNASAGallery(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                    >
                      <Camera size={18} />
                      NASA Gallery
                    </button>
                  </div>

                  <ObjectDetails object={selectedObject} viewMode={viewMode} />

                  <TimelapseControls
                    isPlaying={isTimelapsePlaying}
                    timeScale={timeScale}
                    onPlayPause={() => setIsTimelapsePlaying(!isTimelapsePlaying)}
                    onTimeScaleChange={setTimeScale}
                    onReset={() => {
                      setIsTimelapsePlaying(false);
                      setTimeScale(1);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <select
                value={selectedObject?.id || ''}
                onChange={(e) => {
                  const obj = objects.find((o) => o.id === e.target.value);
                  if (obj) setSelectedObject(obj);
                }}
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
              >
                <option value="">Select first object</option>
                {objects.map((obj) => (
                  <option key={obj.id} value={obj.id}>
                    {obj.name}
                  </option>
                ))}
              </select>

              <select
                value={comparisonObject?.id || ''}
                onChange={(e) => {
                  const obj = objects.find((o) => o.id === e.target.value);
                  if (obj) setComparisonObject(obj);
                }}
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
              >
                <option value="">Select second object</option>
                {objects.map((obj) => (
                  <option key={obj.id} value={obj.id}>
                    {obj.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() =>
                  setComparisonMode(
                    comparisonMode === 'side-by-side' ? 'overlay' : 'side-by-side'
                  )
                }
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <Layers size={18} />
                {comparisonMode === 'side-by-side' ? 'Side by Side' : 'Overlay'}
              </button>
            </div>

            {selectedObject && comparisonObject && (
              <>
                <div className="h-96 rounded-lg overflow-hidden border border-gray-700">
                  <ComparisonView
                    object1={selectedObject}
                    object2={comparisonObject}
                    mode={comparisonMode}
                    timeScale={isTimelapsePlaying ? timeScale : 0}
                  />
                </div>

                <TimelapseControls
                  isPlaying={isTimelapsePlaying}
                  timeScale={timeScale}
                  onPlayPause={() => setIsTimelapsePlaying(!isTimelapsePlaying)}
                  onTimeScaleChange={setTimeScale}
                  onReset={() => {
                    setIsTimelapsePlaying(false);
                    setTimeScale(1);
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ObjectDetails object={selectedObject} viewMode="overview" />
                  <ObjectDetails object={comparisonObject} viewMode="overview" />
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'learn' && selectedObject && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Book size={24} />
                Educational Mode
              </h2>
              <p className="text-gray-400 mb-6">
                Learn about {selectedObject.name} through interactive quizzes and flashcards.
              </p>

              <button
                onClick={loadQuiz}
                className="w-full py-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-semibold"
              >
                Start Quiz
              </button>
            </div>

            {showQuiz && currentQuiz && (
              <Quiz quiz={currentQuiz} onComplete={handleQuizComplete} />
            )}

            <ObjectDetails object={selectedObject} viewMode="overview" />
            <ObjectDetails object={selectedObject} viewMode="physics" />
            <ObjectDetails object={selectedObject} viewMode="biology" />
            <ObjectDetails object={selectedObject} viewMode="history" />
          </div>
        )}

        {/* Minimal UI to indicate the app is mounted correctly */}
        <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
          <h1>Astronomy Explorer</h1>
          <p>Если вы видите этот текст, приложение успешно смонтировано.</p>
          <div style={{ marginTop: 12, color: '#888' }}>Готово</div>
        </div>
      </main>

      {showNASAGallery && selectedObject && (
        <NASAGallery
          objectName={selectedObject.name}
          onClose={() => setShowNASAGallery(false)}
        />
      )}

      {showProfile && userProfile && (
        <UserProfile
          profile={userProfile}
          achievements={achievements}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}

function TabButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-semibold ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ViewModeButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );
}
