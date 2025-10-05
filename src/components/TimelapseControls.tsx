import { Play, Pause, RotateCcw } from 'lucide-react';

interface Props {
  isPlaying: boolean;
  timeScale: number;
  onPlayPause: () => void;
  onTimeScaleChange: (scale: number) => void;
  onReset: () => void;
}

export default function TimelapseControls({
  isPlaying,
  timeScale,
  onPlayPause,
  onTimeScaleChange,
  onReset,
}: Props) {
  const speeds = [
    { label: '1 Day', value: 1 },
    { label: '1 Week', value: 7 },
    { label: '1 Month', value: 30 },
    { label: '1 Year', value: 365 },
  ];

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-white">
      <h3 className="text-lg font-semibold mb-4">Time-lapse Controls</h3>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={onPlayPause}
          className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button
          onClick={onReset}
          className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
        >
          <RotateCcw size={20} />
        </button>

        <span className="text-sm text-gray-400">
          {isPlaying ? 'Playing' : 'Paused'}
        </span>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Time Scale</label>
        <div className="grid grid-cols-4 gap-2">
          {speeds.map((speed) => (
            <button
              key={speed.value}
              onClick={() => onTimeScaleChange(speed.value)}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                timeScale === speed.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {speed.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm text-gray-400 mb-2 block">Custom Speed (x{timeScale})</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={timeScale}
          onChange={(e) => onTimeScaleChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}
