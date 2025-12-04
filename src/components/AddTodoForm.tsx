import { useState } from "react"

interface AddTodoProps{
    onSubmit: (title: string) => void;
}

export default function AddTodoForm({onSubmit} : AddTodoProps)
{
    const [inputValue, setInput] = useState("");

    function HandleSubmit(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        if(!inputValue.trim()){
            return;
        }

        onSubmit(inputValue);
        setInput("");
    }

    return(
    <form className="flex" onSubmit={HandleSubmit}>
        <input 
        type="text"
        value={inputValue}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done?" 
        className="border border-gray-500 grow p-2"
        />
            <button 
            aria-label="AddButton"
            type="submit" className="w-16 rounded-e-md bg-slate-700 text-white hover:bg-slate-900"
            >
            Add
            </button>
    </form>
    )
}