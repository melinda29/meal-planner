import { useState } from 'react';

export default function HealthTargets({ healthTargets, setHealthTargets }) {
  const [input, setInput] = useState('');
  const [target, setTarget] = useState('');

  const handleAdd = () => {
    if (input.trim() && target.trim()) {
      const newTarget = {
        id: Date.now(),
        name: input,
        target: parseInt(target),
        current: 0,
      };
      setHealthTargets([...healthTargets, newTarget]);
      setInput('');
      setTarget('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const updateCurrent = (id, value) => {
    setHealthTargets(
      healthTargets.map(ht =>
        ht.id === id ? { ...ht, current: Math.min(value, ht.target) } : ht
      )
    );
  };

  const deleteTarget = (id) => {
    setHealthTargets(healthTargets.filter(ht => ht.id !== id));
  };

  const getProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Health Targets</h2>

      {/* Input section */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., Water, Exercise, Sleep"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Target"
          className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    <div className="space-y-4">
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
        >
          Add
        </button>
    </div>  
      {/* Health targets list */}
      <div className="space-y-4">
        {healthTargets.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No health targets yet. Add one to get started!</p>
        ) : (
          healthTargets.map((ht) => (
            <div key={ht.id} className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">{ht.name}</h3>
                <button
                  onClick={() => deleteTarget(ht.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                >
                  Delete
                </button>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-green-500 h-full transition-all"
                    style={{ width: `${getProgress(ht.current, ht.target)}%` }}
                  ></div>
                </div>
              </div>

              {/* Current/Target input */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={ht.current}
                  onChange={(e) => updateCurrent(ht.id, parseInt(e.target.value) || 0)}
                  min="0"
                  max={ht.target}
                  className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">
                  / {ht.target}
                </span>
                <span className="text-sm font-semibold text-green-600 ml-auto">
                  {Math.round(getProgress(ht.current, ht.target))}%
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}