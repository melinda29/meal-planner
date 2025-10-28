import { useState } from 'react';

export default function Goals({ goals, setGoals }) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      const newGoal = {
        id: Date.now(),
        text: input,
        date: new Date().toLocaleDateString(),
      };
      setGoals([...goals, newGoal]);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Daily Goals</h2>

      {/* Input section */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Write down your goal for today..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition font-semibold"
        >
          Add
        </button>
      </div>

      {/* Goals list */}
      <div className="space-y-2">
        {goals.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No goals set yet. Write down what you want to achieve today!</p>
        ) : (
          goals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200 hover:border-purple-300 transition"
            >
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{goal.text}</p>
                <p className="text-xs text-gray-500 mt-1">{goal.date}</p>
              </div>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Goal count */}
      {goals.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            {goals.length} goal{goals.length !== 1 ? 's' : ''} for today
          </p>
        </div>
      )}
    </div>
  );
}