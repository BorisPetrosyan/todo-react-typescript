import React, {createContext, useReducer, useState} from 'react';
import { taskReducer } from '../reducers/taskReducer';

const initialState = {
    id: null,
    isChecked: null,
    order: null,
    todo: null,
}

// export const TaskContext = createContext<any>(initialState);

const AppContext = createContext<{
    tasks: any;
    dispatch: React.Dispatch<any>;
    nav: number;
    setNav: any;
}>({
    tasks: initialState,
    dispatch: () => null,
    nav:1,
    setNav: () => null
});

 export const TaskContextProvider : React.FC = ({children}) => {
    const [tasks, dispatch] = useReducer(taskReducer,[])
    const [nav,setNav] = useState(1)
    return (
        <AppContext.Provider value={{ tasks, dispatch ,nav,setNav}}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContext;