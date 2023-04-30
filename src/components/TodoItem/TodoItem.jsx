import React, {useContext, useState} from 'react';
import cl from './todoItem.module.css'
import Modal from "../UI/Modal/Modal.jsx";
import {BsTrash} from "react-icons/all.js";
import {Context} from "../../App.jsx";
import Confirmation from "../Confirmation/Confirmation.jsx";
import TodoInfo from "../TodoInfo/TodoInfo.jsx";
import {observer} from "mobx-react-lite";
import {useFetching} from "../../hooks/useFetching.js";
import {destroyTodo, updateTodo} from "../../http/todoAPI.js";
import Loading from "../UI/Loading/Loading.jsx";
import CheckBox from "../UI/CheckBox/CheckBox.jsx";

const TodoItem = observer(({todo}) => {

    const {todoListStore} = useContext(Context)

    const [todoInfoActive, setTodoInfoActive] = useState(false)

    const [deleteConfirmationActive, setDeleteConfirmationActive] = useState(false)

    const [isCompleted, setIsCompleted] = useState(todo.completed)

    const [deleteTodo, isDeleteTodoLoading] = useFetching(async () => {
        await destroyTodo(todo.id).then(() => {
            todoListStore.deleteTodo(todo.id)
            setDeleteConfirmationActive(false)
        })
    })

    const [updateCompletion, isUpdateCompletionLoading] = useFetching(async () => {
        await updateTodo({...todo, completed: !isCompleted})
            .then((data) => {
                todoListStore.updateTodo(todo.id, data)
            })
    })

    return (
        <>
            <Loading isLoading={isDeleteTodoLoading || isUpdateCompletionLoading}/>
            <div
                draggable={true}
                className={cl.todoItem}
                onClick={() => setTodoInfoActive(true)}
            >
                <div className={cl.todoText}>
                    {todo.text}
                </div>
                <div className={cl.activePanel}>
                    <CheckBox
                        isCompleted={isCompleted}
                        setIsCompleted={setIsCompleted}
                        update={updateCompletion}
                    />
                    <button className={cl.button} onClick={(e) => {
                        e.stopPropagation()
                        setDeleteConfirmationActive(true)
                    }}>
                        {<BsTrash/>}
                    </button>
                </div>
            </div>
            <Modal active={todoInfoActive} setActive={setTodoInfoActive}>
                <TodoInfo todo={todo} setActive={setTodoInfoActive}/>
            </Modal>
            <Modal active={deleteConfirmationActive} setActive={setDeleteConfirmationActive}>
                <Confirmation
                    text={'Вы уверены, что хотите удалить задачу?'}
                    positiveAction={deleteTodo}
                    negativeAction={() => setDeleteConfirmationActive(false)}
                />
            </Modal>
        </>

    );
});

export default TodoItem;