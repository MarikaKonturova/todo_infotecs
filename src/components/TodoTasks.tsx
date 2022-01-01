import React, {ChangeEvent, useContext, useState} from 'react'
import {Context, taskType} from "../context/Context";
import {addTask} from "../context/Actions";
import s from './Todotasks.module.css'

export type tasksType = {
    onTaskChange: (tdt: taskType) => void
}

export function TodoTasks({onTaskChange}: tasksType) {
    const {state, dispatch} = useContext(Context)
    const {tasks} = state
    const [search, setSearch] = useState('')
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch((e.currentTarget.value).toLowerCase())
    }
    const onTdtAdd = () => {
        const newTask: taskType = {
            id: `note_${Date.now()}`,
            title: 'Untitled note',
            desc: '',
            status: 'pending'
        }
        dispatch(addTask(newTask))
    }


    return <div className={s.container}>
        <header className={s.header}>
            <h1 className={s.h1}>Tasks</h1>
            <button onClick={onTdtAdd} className={`${s.button} ${s.addButton}`}>Create task</button>
        </header>
        <input value={search} onChange={handleSearchChange} className={s.input}/>
        <div className={s.tasks}>
            {tasks.filter(task => {
                if (search === '') {
                    return task
                } else if (task.title.toLowerCase().includes(search.toLowerCase())) {
                    return task
                }
            }).map(task =>
                <div id={task.id}
                     className={`${s.task} ${task.status !== 'done' ? task.status !== 'started' ? `${s.pending}` : `${s.started}` : `${s.done}`}`}
                     onClick={() => onTaskChange(task)}>{task.title.length > 45 ? (task.title.substring(0, 45) + '...') : task.title}
                </div>)}
        </div>
    </div>
}
