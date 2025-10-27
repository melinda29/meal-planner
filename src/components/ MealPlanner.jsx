import { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TimeSlots from './TimeSlots';
import TopPriority from './TopPriority';
import HealthTargets from './HealthTargets';
import Goals from './Goals';
import SuccessOfDay from './SuccessOfDay';

export default function MealPlanner() {
  const [todos, setTodos] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [healthTargets, setHealthTargets] = useState([]);
  const [goals, setGoals] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedTimeSlots = localStorage.getItem('timeSlots');
    const savedHealthTargets = localStorage.getItem('healthTargets');
    const savedGoals = localStorage.getItem('goals');

    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedTimeSlots) setTimeSlots(JSON.parse(savedTimeSlots));
    if (savedHealthTargets) setHealthTargets(JSON.parse(savedHealthTargets));
    if (savedGoals) setGoals(JSON.parse(savedGoals));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('timeSlots', JSON.stringify(timeSlots));
  }, [timeSlots]);

  useEffect(() => {
    localStorage.setItem('healthTargets', JSON.stringify(healthTargets));
  }, [healthTargets]);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const addTodo = (text, priority = 'medium') => {
    const newTodo = {
      id: Date.now(),
      text,
      priority,
      completed: false,
      time: new Date().toLocaleTimeString(),
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const getTopPriority = () => {
    return todos.find(todo => todo.priority === 'high' && !todo.completed);
  };

  const getSuccessPercentage = () => {
    if (todos.length === 0) return 0;
    const completed = todos.filter(todo => todo.completed).length;
    return Math.round((completed / todos.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Daily Planner</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main section */}
          <div className="lg:col-span-2 space-y-6">
            <TodoList todos={todos} onAdd={addTodo} onDelete={deleteTodo} onToggle={toggleTodo} />
            <TimeSlots timeSlots={timeSlots} setTimeSlots={setTimeSlots} />
            <Goals goals={goals} setGoals={setGoals} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TopPriority todo={getTopPriority()} />
            <SuccessOfDay percentage={getSuccessPercentage()} completedCount={todos.filter(t => t.completed).length} totalCount={todos.length} />
            <HealthTargets healthTargets={healthTargets} setHealthTargets={setHealthTargets} />
          </div>
        </div>
      </div>
    </div>
  );
}
