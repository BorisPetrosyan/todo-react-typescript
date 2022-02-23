import React, {FC, useContext, useEffect, useRef, useState} from 'react'

import AppContext from '../contexts/contextProvider';
import {ActionType} from "../constants/userConstant";
import useClickOutside from "../hooks/useClickOutside";
import {EditTaskI} from "../types/types";


const EditTaskComponent : ( props: EditTaskI) => JSX.Element = (props: EditTaskI) => {

    const {preTitle, preDescription, open, setOpen, taskId} = props
    const { dispatch } = useContext(AppContext);

    const modalRef = useRef<null | HTMLElement>(null)
    const focusRef = useRef<null | HTMLElement>(null)

    useClickOutside(modalRef, () => {
        if (open) setOpen(false)
    })

    useEffect(() => {
        if(focusRef.current) {
            (focusRef.current as HTMLElement).focus()
        }
    },[open])

    const [title, setTitle] = useState(preTitle);
    const [description, setDescription] = useState(preDescription);


    const onUpdateTask = (e: {
        nativeEvent: any;
        preventDefault: () => void; }
    ) => {
        let buttonName = e.nativeEvent.submitter.name
        e.preventDefault();
        if(buttonName === 'cancel') {
            setOpen(false)
            return
        }
        dispatch({
            type: ActionType.TASK_UPDATE,
            task: {
                id:taskId,
                updatedTodo:{
                    title,
                    description
                }
            }
        });
        setTitle('')
        setDescription('')
        setOpen(false)
    }

    return (
        <form
            onSubmit={onUpdateTask}
            className='edit-modal d-flex-between'
            ref={modalRef as any}
        >
            <div>
                <div style={{display:"flex", flexDirection:'column'}}>
                    <label className='label-input'>title</label>
                <input
                    ref={focusRef as any}
                    required
                    placeholder='title...'
                    className='input-style '
                    value={title}
                    onChange={
                        (e) => {
                            setTitle(e.target.value)
                        }
                    }
                />

                </div>
                <div style={{display:"flex", flexDirection:'column'}}>
                    <label className='label-input'>description</label>
                <input
                    required
                    placeholder='description...'
                    className='input-style '
                    value={description}
                    onChange={
                        (e) => {
                            setDescription(e.target.value)
                        }
                    }
                />

                </div>
                <button className={'edit-cancel'} name='cancel'>Cancel</button>
                <button type="submit" className={'edit-accept'} name='accept'>Update Todo</button>
            </div>

        </form>

    );
}

export default EditTaskComponent;