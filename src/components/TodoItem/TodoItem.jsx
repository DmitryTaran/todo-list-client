import React, {useContext, useState} from 'react';
import cl from './todoItem.module.css'
import Modal from "../UI/Modal/Modal.jsx";
import {Context} from "../../App.jsx";
import TodoInfo from "../TodoInfo/TodoInfo.jsx";
import {observer} from "mobx-react-lite";
import {useFetching} from "../../hooks/useFetching.js";
import {updateTodo} from "../../http/todoAPI.js";
import Loading from "../UI/Loading/Loading.jsx";
import CheckBox from "../UI/CheckBox/CheckBox.jsx";
import {AiOutlineClockCircle, HiPencilSquare} from "react-icons/all.js";
import {compareDate, getDate} from "../../utils/funcs.js";
import Accordion from "../UI/Accordion/Accordion.jsx";

const TodoItem = observer(({todo, index, ...props}) => {

    const [todoInfoActive, setTodoInfoActive] = useState(false)
    const {todoListStore} = useContext(Context)
    const [isCompleted, setIsCompleted] = useState(todo.completed)
    const [updateCompletion, isUpdateCompletionLoading] = useFetching(async () => {
        await updateTodo({...todo, completed: !isCompleted})
            .then((data) => {
                todoListStore.updateTodo(todo.id, data)
            })
    })


    return (
        <>
            <Loading isLoading={isUpdateCompletionLoading}/>
            <Accordion
                head={
                    <TodoItemHead
                        todo={todo}
                        index={index}
                        setTodoInfoActive={setTodoInfoActive}
                        setIsCompleted={setIsCompleted}
                        isCompleted={isCompleted}
                        updateCompletion={updateCompletion}/>
                }
                body={<TodoItemBody todo={todo}/>}
                {...props}
            />
            <Modal active={todoInfoActive} setActive={setTodoInfoActive}>
                <TodoInfo todo={todo} setActive={setTodoInfoActive}/>
            </Modal>
        </>

    )
})
const TodoItemHead = ({todo, index, setTodoInfoActive, setIsCompleted, isCompleted, updateCompletion}) => {
    return (
        <div
            className={cl.todoTitle}
            // onDragEnter={(e) => e.target.style.color = 'red'}
            // onDragLeave={(e) => e.preventDefault()}
        >
            <div>{index + 1}. {todo.text}</div>
            <div className={cl.activePanel}>
                {todo.deadline &&
                    <div className={cl.clock}>
                        <AiOutlineClockCircle size={20}/>
                    </div>}
                <CheckBox
                    isCompleted={isCompleted}
                    setIsCompleted={setIsCompleted}
                    update={updateCompletion}
                    isFailed={todo.deadline ? compareDate(todo.deadline) : false}
                />
                <button className={cl.button} onClick={(e) => {
                    e.stopPropagation()
                    setTodoInfoActive(true)
                }}>
                    {<HiPencilSquare/>}
                </button>
            </div>
        </div>
    )
}

const TodoItemBody = ({todo}) => {
    return (
        <div>
            {todo.description ? todo.description : "Вы не добавили описание к данной задаче"}
            <br/>
            Дата создания: {getDate(todo.createdAt)}
            {todo.deadline &&
                <div>
                    Дедлайн: {getDate(todo.deadline)}
                </div>
            }
        </div>
    )
}


export default TodoItem;