import React, {FC, useContext, useState} from 'react'

import AppContext from '../contexts/contextProvider';
import {ActionType} from "../constants/userConstant";


const AddTaskComponent : FC = () => {

    const { dispatch ,tasks} = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onAddTask = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch({
            type: ActionType.ADD_TASK,
            task: {
                order:tasks.length + 1,
                id:Math.random(),
                isChecked:false,
                created:new Date(),
                todo:{
                    title,
                    description
                }
            }
        });
        setTitle('')
        setDescription('')
    }

    return (
        <form onSubmit={onAddTask} style={{display:"flex",justifyContent:"space-between"}}>
            <div>

                <input
                    required
                    placeholder='title...'
                    className='input-style'
                    value={title}
                    onChange={
                        (e) => {
                            setTitle(e.target.value)
                        }
                    }
                />
                <input
                    required
                    placeholder='description...'
                    className='input-style'
                     value={description}
                    onChange={
                        (e) => {
                            setDescription(e.target.value)
                        }
                    }
                />
            </div>
            <button  className={'add-todo'}>Add Todo</button>
        </form>
    );
}

export default AddTaskComponent;