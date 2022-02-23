import React from 'react'
import AddTaskComponent from "./addTask";
import TaskListComponent from "./TaskList";

const TodoListComponent = () => {
    return (
            <div style={{position:"relative"}}>
                    <AddTaskComponent/>
                    <TaskListComponent/>
            </div>
    );
}

export default TodoListComponent;