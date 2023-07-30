import React, {useContext, useState} from 'react';
import TodoItem from "../TodoItem/TodoItem.jsx";
import cl from './todoList.module.css'
import {BsPlusLg} from "react-icons/all.js";
import {Context} from "../../App.jsx";
import Modal from "../UI/Modal/Modal.jsx";
import AddTodoForm from "../AddTodoForm/AddTodoForm.jsx";
import {observer} from "mobx-react-lite";

const TodoList = observer(() => {

    const {todoListStore} = useContext(Context)

    const [addTodoModalActive, setAddTodoModalActive] = useState(false)

    return (
        <>
            <div className={cl.todoList}>
                {
                    todoListStore.todoList.map((todo, idx) => <TodoItem key={todo.id} todo={todo} index={idx}/>)
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