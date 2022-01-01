import {taskType} from "./Context";


export const updateTask = (task: taskType) => {
    return {
        type: 'UPDATE',
        task
    } as const
}
export const addTask = (task: taskType) => {
    return {
        type: 'ADD',
        task
    } as const
}
export const deleteTask = (id: string) => {
    return {
        type: 'DELETE',
        id
    } as const
}

export type ActionsType = ReturnType<typeof updateTask> | ReturnType<typeof addTask>| ReturnType<typeof deleteTask>
