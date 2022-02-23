import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {ActionType} from "../constants/userConstant";
import AppContext from "../contexts/contextProvider";
import EditTaskComponent from "./editTask";

const TaskListComponent :FC = () => {
    const [preTitle,setPreValue] = useState('')
    const [preDescription,setPreDescription] = useState('')
    const [taskId,setTaskId] =useState(0)
    const [open, setOpen] = useState(false)

    const {
        tasks,
        dispatch,
        nav
    } = useContext(AppContext)
    const [filterTasks, setFilterTasks] = useState(tasks)

    const onChecked = (id: any, isChecked: boolean) => {
        dispatch({
            type: ActionType.CHECK_TASK,
            task: {
                id,
                isChecked
            }
        })
    }


    useEffect(() => {
        setFilterTasks(tasks)
    },[nav,tasks])

    const [currentBoard, setCurrentBoard] = useState(null)

    function dragOverHandler(e: React.DragEvent<HTMLDivElement> ) {
        e.preventDefault()
        let target = e.target as HTMLButtonElement
            target.style.boxShadow = '0 1px 7px yellowgreen'
    }

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, task: any) {
        setCurrentBoard(task)
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        let target = e.target as HTMLButtonElement
        target.style.boxShadow = 'none'
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, task: unknown) {
        e.preventDefault()
        dispatch({
            type: ActionType.CHANGE_POSITION,
            task,
            currentBoard
        })
        let target = e.target as HTMLButtonElement
        target.style.boxShadow = 'none'
    }

    const sortTasks = (a: { order: number; }, b: { order: number; }) => {
        if(a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }
    const checkTasks = (task: { id: React.Key | null | undefined; isChecked: any; title: any }) => {
        if(nav === 3) return `${task.isChecked  ? 'd-none': 'd-show'}`
        if(nav === 2) return `${task.isChecked  ? 'd-show': 'd-none'}`
    }
    return (
        <div className={tasks.length && 'border-for'} >
            <div className={`backdrop ${open && 'd-show'}`}/>
            {
                open &&
                <EditTaskComponent
                    open={open}
                    setOpen={setOpen}
                    preTitle={preTitle}
                    preDescription={preDescription}
                    taskId={taskId}
                />
            }
            {filterTasks.sort(sortTasks).map((task: {
                id: React.Key | null | undefined | any; isChecked: any; title: any; todo: any;}) => {
                return (
                    <div
                        className={checkTasks(task)}
                        key={task.id }
                        style={{height:40,display:'flex',justifyContent:'space-between'}}
                        onDragStart={(e) => dragStartHandler(e,task)}
                        onDragLeave={(e) => dragEndHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e,task)}
                        draggable={true}
                    >
                        <div style={{display:'flex'}} >
                        <img
                            onClick={() => {onChecked(task.id, !task.isChecked)}}
                            style={{padding:10,height:20}}
                            src={`/crop${!task.isChecked ? 'Empty' : ''}.png`}
                            alt='crop'/>
                        <div
                            className='add-text'
                            style={task?.isChecked ? { textDecoration: 'line-through',padding:10} : {padding:10}} >
                            {task.todo.title}
                        </div>
                            <div
                                className='description-text'
                                style={task?.isChecked ? { textDecoration: 'line-through',padding:10} : {padding:10}} >
                                {task.todo.description}
                            </div>
                        </div>
                        <div   style={{padding:10}}>
                            <button
                                className='editBtn'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setOpen(true)
                                    setPreValue (task.todo.title)
                                    setPreDescription(task.todo.description)
                                    setTaskId(task.id)
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className='deleteBtn'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    dispatch({
                                        type: ActionType.REMOVE_TASK,
                                        id: task.id
                                    })
                                }}>
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default TaskListComponent;