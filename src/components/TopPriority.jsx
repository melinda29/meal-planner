export default function TopPriority({ todo }) {
  if (!todo) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Priority</h2>
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-500">No high priority tasks</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Priority</h2>
      <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
        <div className="flex items-start gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 mt-1 flex-shrink-0"></div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-red-800">{todo.text}</p>
            <p className="text-sm text-red-600 mt-2">Added at {todo.time}</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">Focus on this first!</p>
    </div>
  );
}