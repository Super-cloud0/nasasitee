import { Trophy, Heart, History } from 'lucide-react';
import { UserProfile as UserProfileType, Achievement } from '../types';

interface Props {
  profile: UserProfileType;
  achievements: Achievement[];
  onClose: () => void;
}

export default function UserProfile({ profile, achievements, onClose }: Props) {
  const unlockedAchievements = achievements.filter((a) =>
    profile.achievements.includes(a.id)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-2xl w-full p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Profile</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
              <Trophy size={20} className="text-yellow-400" />
              Achievements ({unlockedAchievements.length}/{achievements.length})
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => {
                const isUnlocked = profile.achievements.includes(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      isUnlocked
                        ? 'bg-blue-900 border-blue-500'
                        : 'bg-gray-800 border-gray-700 opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{achievement.icon}</div>
                    <h4 className="font-semibold">{achievement.name}</h4>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
              <Heart size={20} className="text-red-400" />
              Favorites
            </h3>
            <p className="text-gray-400">
              {profile.favorites.length} celestial objects saved
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
              <History size={20} className="text-purple-400" />
              Browsing History
            </h3>
            <p className="text-gray-400">
              {profile.browsing_history.length} objects explored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
