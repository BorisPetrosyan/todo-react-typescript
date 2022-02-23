

interface todo  {
    description: string
    title: string
}

interface taskCheck {
    id: number,
    isChecked: boolean
}

export type State = {
    id: number
    isChecked: boolean
    order: number;
    todo: todo;
}

export type EditTaskI = {
    preTitle : string
    preDescription : string
    open:  boolean
    setOpen: any
    taskId: number
}

export type Actions =
    { type: 'ADD_TASK' , task: State } |
    { type: 'CHECK_TASK', task: taskCheck, id:number  } |
    { type: 'REMOVE_TASK', id: number } |
    { type: 'TASK_UPDATE', task: { id:number, updatedTodo:todo}  }  |
    { type: 'CHANGE_POSITION', currentBoard: State , task: State }

