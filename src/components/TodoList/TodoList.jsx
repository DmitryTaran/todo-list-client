import React, {useContext, useEffect, useState} from 'react';
import TodoItem from "../TodoItem/TodoItem.jsx";
import cl from './todoList.module.css'
import {BsPlusLg, MdContentPasteSearch} from "react-icons/all.js";
import {Context} from "../../App.jsx";
import Modal from "../UI/Modal/Modal.jsx";
import AddTodoForm from "../AddTodoForm/AddTodoForm.jsx";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {getBoard} from "../../http/boardAPI.js";
import {useFetching} from "../../hooks/useFetching.js";
import Loading from "../UI/Loading/Loading.jsx";
import {getTodos} from "../../http/todoAPI.js";

const TodoList = observer(() => {

    const {todoListStore} = useContext(Context)

    const [addTodoModalActive, setAddTodoModalActive] = useState(false)

    return (
        <>
            <div className={cl.todoList}>

                {
                    todoListStore.todoList.map(todo => <TodoItem key={todo.id} todo={todo}/>)
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