import { Trash2 } from "lucide-react";
import type { Todo } from "../types/todo";

interface TodoItemProps
{
    todo: Todo
    onCompletedChanged : (id: number, completed: boolean) => void;
    onDelete : (id:number) => void;
}

function TodoItem({todo, onCompletedChanged, onDelete} : TodoItemProps)
{
    return <div className="flex items-center gap-1">
        <label className="grow flex items-center gap-5 border rounded-md p-2 border-gray-400 bg-white hover:bg-slate-50">
            <input type="checkbox" 
            className="scale-125" 
            checked = {todo.completed}
            onChange={(e) => onCompletedChanged(todo.id, e.target.checked)}/>
                <span className= {todo.completed ? "line-through text-gray-600" : "" }>
                {todo.title}
                </span>
        </label>
        <button
        aria-label="DeleteButton"
        onClick={() => onDelete(todo.id)}
        className="p-2">
            <Trash2 size = {20} className="text-gray-500"/>
            </button>
    </div>
}

export default TodoItem;