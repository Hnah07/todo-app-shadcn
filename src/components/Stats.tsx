import { Todo } from "@/todoApi";

interface StatsProps {
  todos: Todo[];
}

const Stats = ({ todos }: StatsProps) => {
  const activeTodos = todos.filter((todo) => !todo.completed).length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const completionPercentage = todos.length
    ? Math.round((completedTodos / todos.length) * 100)
    : 0;

  return (
    <>
      <div className="h-px w-full bg-gray-200" />
      <div className="flex items-center justify-between gap-4 text-sm text-gray-500">
        <span>Total: {todos.length} todos</span>
        <span>Active: {activeTodos} todos</span>
        <span>Completed: {completedTodos} todos</span>
        <span>{completionPercentage}% completed</span>
      </div>
    </>
  );
};

export default Stats;
