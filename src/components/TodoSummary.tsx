import type { Todo } from "../types/todo"

interface TodoSummaryProps {
    todos : Todo[];
    deleteAllCompleted: () => void;
}

export default function TodoSummary({todos, deleteAllCompleted} : TodoSummaryProps)
{
    const completedTodos = todos.filter((todo) => todo.completed);

    return (
        <div className="text-center space-y-2">
            <p>
                {completedTodos.length} / {todos.length} completed.
            </p>

            {
                completedTodos.length > 0 && (
                <button 
                onClick={deleteAllCompleted}
                className="border border-gray-300 p-2 bg-red-300 rounded-lg"
                >
                    Remove Completed Todos
                </button>
            )
            }
            
        </div>
    )
}