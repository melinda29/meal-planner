export default function SuccessOfDay({ percentage, completedCount, totalCount }) {
  const getMotivationalMessage = () => {
    if (percentage === 0) return "Let's get started!";
    if (percentage < 25) return "You're on your way!";
    if (percentage < 50) return "Great progress!";
    if (percentage < 75) return "Almost there!";
    if (percentage < 100) return "So close!";
    return "Amazing day!";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Success of the Day</h2>

      {/* Progress circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeDasharray={`${(percentage / 100) * (2 * Math.PI * 54)} ${2 * Math.PI * 54}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.3s ease' }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-blue-600">{percentage}%</span>
            <span className="text-xs text-gray-500">Complete</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <p className="text-center text-gray-700 font-semibold">
          {completedCount} of {totalCount} tasks completed
        </p>
      </div>

      {/* Motivational message */}
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700">
          {getMotivationalMessage()}
        </p>
      </div>
    </div>
  );
}