import { SpaceObject } from '../types';
import { Star, Heart } from 'lucide-react';

interface Props {
  objects: SpaceObject[];
  selectedObject: SpaceObject | null;
  favorites: string[];
  onSelectObject: (object: SpaceObject) => void;
  onToggleFavorite: (objectId: string) => void;
}

export default function ObjectList({
  objects,
  selectedObject,
  favorites,
  onSelectObject,
  onToggleFavorite,
}: Props) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Celestial Objects</h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {objects.map((object) => (
          <div
            key={object.id}
            className={`p-4 border-b border-gray-800 cursor-pointer transition-colors ${
              selectedObject?.id === object.id
                ? 'bg-blue-900'
                : 'hover:bg-gray-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div onClick={() => onSelectObject(object)} className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Star size={16} className="text-yellow-400" />
                  <h4 className="font-semibold text-white">{object.name}</h4>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {object.description}
                </p>
                <span className="inline-block mt-2 px-2 py-1 bg-gray-800 text-xs rounded text-gray-300">
                  {object.type}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(object.id);
                }}
                className="ml-2 p-2 hover:bg-gray-700 rounded transition-colors"
              >
                <Heart
                  size={18}
                  className={
                    favorites.includes(object.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400'
                  }
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
