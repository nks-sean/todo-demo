import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import useTodos from "../../hooks/useTodos";
import { dummyData } from "../../data/todos";

describe("useTodos", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it("should initialize with dummy data when local storage is empty", () => {
        const { result } = renderHook(() => useTodos());
        expect(result.current.todos).toEqual(dummyData);
    });

    it("should add a new todo", () => {
        const { result } = renderHook(() => useTodos());
        const newTodoTitle = "New Task";

        act(() => {
            result.current.addNewTodo(newTodoTitle);
        });

        expect(result.current.todos[0].title).toBe(newTodoTitle);
        expect(result.current.todos[0].completed).toBe(false);
        // Expect length to increase by 1 (dummyData + 1)
        expect(result.current.todos.length).toBe(dummyData.length + 1);
    });

    it("should toggle todo completion", () => {
        const { result } = renderHook(() => useTodos());
        const todoToToggle = result.current.todos[0];

        act(() => {
            result.current.setTodoCompleted(todoToToggle.id, !todoToToggle.completed);
        });

        expect(result.current.todos[0].completed).toBe(!todoToToggle.completed);
    });

    it("should delete a todo", () => {
        const { result } = renderHook(() => useTodos());
        const todoToDelete = result.current.todos[0];
        const initialLength = result.current.todos.length;

        act(() => {
            result.current.deleteTodo(todoToDelete.id);
        });

        expect(result.current.todos.length).toBe(initialLength - 1);
        expect(result.current.todos.find(t => t.id === todoToDelete.id)).toBeUndefined();
    });

    it("should delete completed todos", () => {
        const { result } = renderHook(() => useTodos());

        // Ensure we have at least one completed todo
        act(() => {
            const todo = result.current.todos[0];
            result.current.setTodoCompleted(todo.id, true);
        });

        act(() => {
            result.current.deleteCompletedTodos();
        });

        const completedTodos = result.current.todos.filter(t => t.completed);
        expect(completedTodos.length).toBe(0);
    });
});
