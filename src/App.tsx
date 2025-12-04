import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TodoSummary from "./components/TodoSummary";
import useTodos from "./hooks/useTodos";

function App() {
  const {todos, setTodoCompleted, addNewTodo, deleteTodo, deleteCompletedTodos} = useTodos();

  return (
    <main className="py-10 h-screen overflow-y-auto">
      <h1 className="font-bold text-3xl text-center">Todo</h1>
      <div className="max-w-lg mx-auto bg-slate-100 p-5 space-y-6">
        <AddTodoForm onSubmit={addNewTodo}/>
        <TodoList todos = {todos} onCompletedChanged = {setTodoCompleted} onDelete={deleteTodo}/>
        <TodoSummary todos = {todos} deleteAllCompleted = {deleteCompletedTodos}/>
      </div>
    </main>
  );
}
export default App;
