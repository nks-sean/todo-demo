import { createContext, useContext, type ReactNode } from "react";
import useTodos from "../hooks/useTodos";
import type { Todo } from "../types/todo";

// 1. Define the shape of our context (what data is available?)
interface TodoContextType {
    todos: Todo[];
    addNewTodo: (title: string) => void;
    setTodoCompleted: (id: number, completed: boolean) => void;
    deleteTodo: (id: number) => void;
    deleteCompletedTodos: () => void;
}

// 2. Create the Context (initially undefined)
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// 3. Create the Provider Component
export function TodoProvider({ children }: { children: ReactNode }) {
    // Use your existing hook!
    const todoState = useTodos();

    return (
        <TodoContext.Provider value={todoState}>
            {children}
        </TodoContext.Provider>
    );
}

// 4. Create a custom hook to use the context easily
export function useTodoContext() {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodoContext must be used within a TodoProvider");
    }
    return context;
}
