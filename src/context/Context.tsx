import React, {createContext, FC, useEffect, useReducer} from 'react'
import {ActionsType} from "./Actions";
import {Reducer} from "./Reducer";

export type taskType = {
    id: string
    title: string
    desc: string,
    status: statusType
}

let tasks = []  as taskType[]


if(typeof window !== 'undefined'){
    tasks= localStorage.getItem('tasks')? JSON.parse(localStorage.getItem('tasks') as string) : []
}
export type statusType = 'pending' | 'started' | 'done'



export const InitialState = {
    tasks: tasks as taskType[]
}
export type initialStateType = typeof InitialState

export const Context = createContext<{ state: initialStateType, dispatch: React.Dispatch<ActionsType> }>
({state: InitialState, dispatch: () => null});

export const ContextProvider: FC = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, InitialState)
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }, [state.tasks])
    return (
        <Context.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </Context.Provider>
    )
}

