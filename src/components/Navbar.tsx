import React, {FC, useContext, useEffect, useState} from "react";
import AppContext from "../contexts/contextProvider";
import {State} from "../types/types";


const NavbarComponent: FC = () => {
    const {tasks,setNav,nav} = useContext(AppContext)
    const [isCheckedTasks, setIsCheckedTasks] = useState(tasks)
    const [notIsCheckedTasks, setNotIsCheckedTasks] = useState(tasks)

    useEffect(() => {
        setIsCheckedTasks(tasks.filter((task: { isChecked: any; }) => task.isChecked  ))
        setNotIsCheckedTasks(tasks.filter((task: { isChecked: any; }) => !task.isChecked  ))
    },[tasks])

    return (
                <div className='nav-container' style={{display:"flex",justifyContent:"space-between"}}>
                    <div>
                    <button
                        className={`nav-text ${nav === 2 ? 'active' : ''}`}
                        onClick={() =>setNav(2)}>
                        Completed List ({tasks.length}/{isCheckedTasks.length})
                    </button>
                    <button
                        className={`nav-text ${nav === 3 ? 'active' : ''}`}
                        onClick={() =>setNav(3)}>
                        Active List ({tasks.length}/{notIsCheckedTasks.length})
                    </button>
                    </div>
                  <button className={`nav-text ${nav === 1 ? 'active' : ''}`}
                          onClick={() =>setNav(1)}>
                      Todo List ({tasks.length})
                  </button>
                </div>
    );
}
export default NavbarComponent;