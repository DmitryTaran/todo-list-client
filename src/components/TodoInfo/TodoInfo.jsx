import React, {useContext, useState} from 'react';
import Form from "../UI/Form/Form.jsx";
import cl from './todoInfo.module.css'
import {Context} from "../../App.jsx";
import TextArea from "../UI/TextArea/TextArea.jsx";
import {useFetching} from "../../hooks/useFetching.js";
import Input from "../UI/Input/Input.jsx";
import {updateTodo} from "../../http/todoAPI.js";
import Loading from "../UI/Loading/Loading.jsx";

const TodoInfo = ({todo, setActive}) => {

    const {todoListStore} = useContext(Context)

    const [text, setText] = useState(todo.text)

    const [description, setDescription] = useState(todo.description)

    const [editTodo, isEditTodoLoading] = useFetching(async () => {
        await updateTodo({...todo, text, description}).then(data => {
            todoListStore.updateTodo(todo.id, {...todo, text, description})
            setActive(false)
        })
    })

    return (
        <Form>
            <Loading isLoading={isEditTodoLoading}/>
            <h2 className={cl.title}>Текст задачи</h2>
            <div className={cl.inputBlock}>
                <Input value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <h2 className={cl.title}>Описание задачи</h2>
            <TextArea value={description} onChange={(e) => setDescription(e.target.value)}/>
            <button onClick={editTodo}>Сохранить</button>
        </Form>
    );
};

export default TodoInfo;