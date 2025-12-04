import { useEffect, useState } from "react";
import { dummyData } from "../data/todos";
import type { Todo } from "../types/todo";

export default function useTodos()
{
      const [todos, setTodos] = useState(() => {
    const savedTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    return savedTodos.length > 0 ? savedTodos : dummyData;
  });

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
}, [todos]);

  function setTodoCompleted(id: number, completed: boolean) {
    setTodos(
      (prevTodo) => (
      prevTodo.map((todo) => (
        todo.id === id ? {...todo, completed} : todo
      ))
    ));
  }

  function addNewTodo(title: string)
  {
    setTodos(prevTodos => 
      [
        {
          id: Date.now(),
          title,
          completed: false,
        },
        ...prevTodos
      ]);
  }

  function deleteTodo(id: number)
  {
    setTodos(
      prevTodo => 
      prevTodo.filter((todo : Todo) => (todo.id != id))
    );
  }

  function deleteCompletedTodos()
  {
    setTodos((prevProps) => prevProps.filter(todo => !todo.completed));
  }

  return {
    todos,
    setTodoCompleted,
    addNewTodo,
    deleteTodo,
    deleteCompletedTodos
  }
}