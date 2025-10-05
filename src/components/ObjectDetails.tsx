import { SpaceObject } from '../types';
import { Atom, Droplet, History, Star } from 'lucide-react';

interface Props {
  object: SpaceObject;
  viewMode: 'physics' | 'biology' | 'history' | 'overview';
}

export default function ObjectDetails({ object, viewMode }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-white">
      <h2 className="text-3xl font-bold mb-2">{object.name}</h2>
      <p className="text-gray-400 mb-6">{object.description}</p>

      {viewMode === 'physics' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Atom size={24} className="text-blue-400" />
            Physical Properties
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Mass" value={object.physics.mass} />
            <InfoItem label="Radius" value={object.physics.radius} />
            <InfoItem label="Gravity" value={object.physics.gravity} />
            {object.physics.orbital_period && (
              <InfoItem label="Orbital Period" value={object.physics.orbital_period} />
            )}
            {object.physics.rotation_period && (
              <InfoItem label="Rotation Period" value={object.physics.rotation_period} />
            )}
            {object.physics.distance_from_sun && (
              <InfoItem label="Distance from Sun" value={object.physics.distance_from_sun} />
            )}
          </div>
        </div>
      )}

      {viewMode === 'biology' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Droplet size={24} className="text-green-400" />
            Biological Conditions
          </h3>
          <div className="space-y-3">
            <InfoItem label="Water Presence" value={object.biology.water_presence} />
            <InfoItem label="Atmosphere" value={object.biology.atmosphere} />
            <InfoItem label="Potential for Life" value={object.biology.potential_for_life} />
          </div>
        </div>
      )}

      {viewMode === 'history' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <History size={24} className="text-purple-400" />
            Historical Information
          </h3>
          <div className="space-y-3">
            <InfoItem label="Discovery Date" value={object.history.discovery_date} />
            <InfoItem label="Discovered By" value={object.history.discovered_by} />

            <div>
              <p className="text-sm text-gray-400 mb-2">Missions:</p>
              <ul className="list-disc list-inside space-y-1">
                {object.history.missions.map((mission, idx) => (
                  <li key={idx} className="text-gray-300">{mission}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">Key Events:</p>
              <ul className="list-disc list-inside space-y-1">
                {object.history.key_events.map((event, idx) => (
                  <li key={idx} className="text-gray-300">{event}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'overview' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Star size={24} className="text-yellow-400" />
            Quick Facts
          </h3>
          <div className="space-y-2">
            <InfoItem label="Type" value={object.type.charAt(0).toUpperCase() + object.type.slice(1)} />
            <InfoItem label="Mass" value={object.physics.mass} />
            <InfoItem label="Radius" value={object.physics.radius} />
            <InfoItem label="Discovery" value={object.history.discovery_date} />
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  );
}
