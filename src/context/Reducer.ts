import {InitialState, initialStateType} from "./Context";
import {ActionsType} from "./Actions";

export const Reducer = (state: initialStateType = InitialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "ADD":
            return {...state, tasks: [action.task,...state.tasks]}
        case "UPDATE":
            return {...state, tasks: state.tasks.map(task => task.id === action.task.id? {...task, ...action.task} : task)}
        case "DELETE":
            return {...state, tasks: state.tasks.filter(task => task.id !== action.id)}
        default:
            return state
    }
}

