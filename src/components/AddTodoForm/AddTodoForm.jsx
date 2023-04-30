import React, {useContext, useState} from 'react';
import Form from "../UI/Form/Form.jsx";
import cl from "../CreateBoardForm/createBoardForm.module.css";
import Input from "../UI/Input/Input.jsx";
import TextArea from "../UI/TextArea/TextArea.jsx";
import {Context} from "../../App.jsx";
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching.js";
import {createTodo} from "../../http/todoAPI.js";
import Loading from "../UI/Loading/Loading.jsx";

const AddTodoForm = ({setActive}) => {

    const {id} = useParams()

    const {todoListStore} = useContext(Context)

    const [text, setText] = useState('')
    const [description, setDescription] = useState('')

    const [addTodo, isAddTodoLoading] = useFetching(async () => {
        await createTodo(text, description, id).then(data => {
            todoListStore.addTodo(data)
            setActive(false)
            setText('')
            setDescription('')
        })
    })

    return (
        <Form>
            <Loading isLoading={isAddTodoLoading}/>
            <h2 className={cl.title}>Добавить задачу</h2>
            <Input type="text" placeholder="Введите название задачи" onChange={(e) => setText(e.target.value)}
                   value={text}/>
            <TextArea
                placeholder="Введите описание задачи"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <div className={cl.buttons}>
                <button className={cl.button} onClick={() => setActive(false)}>Отмена</button>
                <button className={cl.button} onClick={addTodo}>Добавить
                </button>
            </div>
        </Form>
    );
};

export default AddTodoForm;