import React, {useContext, useRef, useState} from 'react';
import TodoItem from "../TodoItem/TodoItem.jsx";
import cl from './todoList.module.css'
import {BsPlusLg} from "react-icons/all.js";
import {Context} from "../../App.jsx";
import Modal from "../UI/Modal/Modal.jsx";
import AddTodoForm from "../AddTodoForm/AddTodoForm.jsx";
import {observer} from "mobx-react-lite";
import {useFetching} from "../../hooks/useFetching.js";
import {swapTodos} from "../../http/todoAPI.js";
import Loading from "../UI/Loading/Loading.jsx";

const TodoList = observer(() => {

    const {todoListStore} = useContext(Context)

    const [addTodoModalActive, setAddTodoModalActive] = useState(false)

    const [currentTodo, setCurrentTodo] = useState(null)

    const [droppedTodo, setDroppedTodo] = useState(null)

    const [changeOrder, isChangeOrderLoading] = useFetching(async () => {
        await swapTodos(currentTodo, droppedTodo).then(data => {
            todoListStore.setTodoList(data)
            setDroppedTodo(null)
            setCurrentTodo(null)
        })
    })

    const onDragStart = (e, todo) => {
        setCurrentTodo(todo)
    }

    const onDragOver = (e) => {
        e.preventDefault()
    }

    const onDragEnd = (e) => {
        e.preventDefault()
        if (!droppedTodo) {
            return
        }
        if (currentTodo.id === droppedTodo.id)
            return
        changeOrder()
    }
    const onDrop = (e, todo) => {
        e.preventDefault()
        if (todo?.id === currentTodo.id)
            return
        setDroppedTodo(todo)
    }

    return (
        <>
            <Loading isLoading={isChangeOrderLoading}/>
            <div className={cl.todoList}>
                {
                    todoListStore.todoList.map((todo, idx) =>
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            index={idx}
                            onDragStart={(e) => onDragStart(e, todo)}
                            onDragOver={(e) => onDragOver(e)}
                            onDragEnd={(e) => onDragEnd(e)}
                            onDrop={(e) => onDrop(e, todo)}
                            draggable
                        />
                    )
                }
                <div className={cl.addTodo} onClick={() => setAddTodoModalActive(true)}>
                    <BsPlusLg size={30} color={'#6b6b6b'}/>
                </div>
            </div>
            <Modal active={addTodoModalActive} setActive={setAddTodoModalActive}>
                <AddTodoForm setActive={setAddTodoModalActive}/>
            </Modal>
        </>

    );
});

export default TodoList;