import React, {useState} from 'react';
import './App.css';
import {TodoTasks} from "./components/TodoTasks";
import {TodoTask} from "./components/TodoTask";
import {taskType} from "./context/Context";

function App() {

    const [activeTask, setActiveTask] = useState<taskType | null>(localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task') as string) : null)
    const onTaskChange = (task?: taskType) => {
        if (task) {
            localStorage.setItem('task', JSON.stringify(task))
            setActiveTask(task)
        } else {
            localStorage.setItem('task', JSON.stringify(null))
            setActiveTask(null)
        }

    }

    return (
        <div className="App">

            <div className={'container'}>
                <div  className={'todotasks'}>
                    <TodoTasks onTaskChange={onTaskChange}/>
                </div>
                <div className={'todotask'}>
                    <TodoTask task={activeTask} onTaskChange={onTaskChange}/>
                </div>
            </div>
        </div>
    );
}

export default App;
