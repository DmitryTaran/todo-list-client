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

const TodoItem = observer(({todo, index}) => {

    const {todoListStore} = useContext(Context)

    const [todoInfoActive, setTodoInfoActive] = useState(false)

    const [isCompleted, setIsCompleted] = useState(todo.completed)

    const [isExpanded, setIsExpanded] = useState(false)

    const [updateCompletion, isUpdateCompletionLoading] = useFetching(async () => {
        await updateTodo({...todo, completed: !isCompleted})
            .then((data) => {
                todoListStore.updateTodo(todo.id, data)
            })
    })
    return (
        <>
            <Loading isLoading={isUpdateCompletionLoading}/>
            <div className={cl.todoItem} onClick={() => setIsExpanded(!isExpanded)}>
                <div className={cl.todoTitle}>
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
                <div className={isExpanded ? cl.todoDescriptionActive : cl.todoDescription}>
                    {todo.description ? todo.description : "Вы не добавили описание к данной задаче"}
                    <br/>
                    Дата создания: {getDate(todo.createdAt)}
                    {todo.deadline &&
                        <div>
                            Дедлайн: {getDate(todo.deadline)}
                        </div>
                    }
                </div>

            </div>
            <Modal active={todoInfoActive} setActive={setTodoInfoActive}>
                <TodoInfo todo={todo} setActive={setTodoInfoActive}/>
            </Modal>
        </>

    );
});

export default TodoItem;