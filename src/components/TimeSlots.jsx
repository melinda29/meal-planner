import { useState } from 'react';

export default function TimeSlots({ timeSlots, setTimeSlots }) {
  const [selectedHour, setSelectedHour] = useState('09:00');
  const [activity, setActivity] = useState('');

  const handleAdd = () => {
    if (activity.trim()) {
      const newSlot = {
        id: Date.now(),
        hour: selectedHour,
        activity,
        completed: false,
      };
      setTimeSlots([...timeSlots, newSlot]);
      setActivity('');
    }
  };

  const toggleSlot = (id) => {
    setTimeSlots(
      timeSlots.map(slot =>
        slot.id === id ? { ...slot, completed: !slot.completed } : slot
      )
    );
  };

  const deleteSlot = (id) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };

  const sortedSlots = [...timeSlots].sort((a, b) => a.hour.localeCompare(b.hour));

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = String(i).padStart(2, '0');
    return `${hour}:00`;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Time Slots</h2>

      {/* Input section */}
      <div className="flex gap-2 mb-6">
        <select
          value={selectedHour}
          onChange={(e) => setSelectedHour(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAdd();
            }
          }}
          placeholder="What's planned for this hour?"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition font-semibold"
        >
          Add
        </button>
      </div>

      {/* Time slots list */}
      <div className="space-y-2">
        {sortedSlots.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No time slots scheduled yet. Plan your day!</p>
        ) : (
          sortedSlots.map((slot) => (
            <div
              key={slot.id}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 transition ${
                slot.completed
                  ? 'bg-gray-100 border-gray-300'
                  : 'bg-indigo-50 border-indigo-300'
              }`}
            >
              {/* Time badge */}
              <div className="w-16 flex-shrink-0">
                <span className="inline-block bg-indigo-500 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                  {slot.hour}
                </span>
              </div>

              {/* Activity */}
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    slot.completed ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}
                >
                  {slot.activity}
                </p>
              </div>

              {/* Checkbox */}
              <input
                type="checkbox"
                checked={slot.completed}
                onChange={() => toggleSlot(slot.id)}
                className="w-5 h-5 cursor-pointer"
              />

              {/* Delete button */}
              <button
                onClick={() => deleteSlot(slot.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {sortedSlots.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {sortedSlots.filter(s => s.completed).length} of {sortedSlots.length} time slots completed
          </p>
        </div>
      )}
    </div>
  );
}