import { ChangeEvent, useState } from "react";
import "./style.css"
import {useLocalStorage} from "usehooks-ts"

const storageKey = "todos"

function ToDoList() {
    const [tasks, setTasks] = useLocalStorage(storageKey, Array<string>);
    const [newTask, setNewTask] = useState("");

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value)
    }

    const addTask = () => {
        if (newTask == "") { return }
        setTasks([...tasks, newTask])
        setNewTask("")
    }

    const deleteTask = (index: Number) => {
        const updated = [...tasks]
        updated.splice(index.valueOf(), 1)
        setTasks(updated)
    }

    const moveUp = (index: Number) => {
        if (index === 0) { return }
        const temp = tasks[index.valueOf()-1]
        const updated = [...tasks]
        updated[index.valueOf()-1] = tasks[index.valueOf()]
        updated[index.valueOf()] = temp
        setTasks(updated)
    }

    const moveDown = (index: Number) => {
        if (index === tasks.length-1) { return }
        const temp = tasks[index.valueOf()+1]
        const updated = [...tasks]
        updated[index.valueOf()+1] = tasks[index.valueOf()]
        updated[index.valueOf()] = temp
        setTasks(updated)
    }

    document.addEventListener('keydown', function(event) {
        if (!(event.key == "Enter")) return;
        addTask();
    });
    
    return (
        <>
            <div>
                <h1>To do app 🦫</h1>
                <div>
                    <input className="input input-field" type="text" placeholder="new task" value={newTask} onChange={inputChange} />
                    <button className="input btn btn--success" onClick={addTask}>Add</button>
                </div>
            </div>
            <ol className="tasks">
                {tasks.map((value, index) => 
                    <li className="task-item" key={index}>
                        <span className="task-item-text">{value}</span>
                        <button className="input btn" onClick={() => moveUp(index)}>👆</button>
                        <button className="input btn" onClick={() => moveDown(index)}>👇</button>
                        <button className="input btn btn--danger" onClick={() => deleteTask(index)}>🗑️</button>
                    </li>
                )}
            </ol>
        </>
    );
}

export default ToDoList