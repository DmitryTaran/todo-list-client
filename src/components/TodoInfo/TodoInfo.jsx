import React, {useContext, useState} from 'react';
import Form from "../UI/Form/Form.jsx";
import cl from './todoInfo.module.css'
import {Context} from "../../App.jsx";
import TextArea from "../UI/TextArea/TextArea.jsx";
import {useFetching} from "../../hooks/useFetching.js";
import Input from "../UI/Input/Input.jsx";
import {destroyTodo, updateTodo} from "../../http/todoAPI.js";
import Loading from "../UI/Loading/Loading.jsx";
import Confirmation from "../Confirmation/Confirmation.jsx";
import Modal from "../UI/Modal/Modal.jsx";
import DatePicker from "../UI/DatePicker/DatePicker.jsx";

const TodoInfo = ({todo, setActive}) => {

    const {todoListStore} = useContext(Context)

    const [text, setText] = useState(todo.text)

    const [description, setDescription] = useState(todo.description)

    const [deadline, setDeadline] = useState(todo.deadline || '')

    const [deleteConfirmationActive, setDeleteConfirmationActive] = useState(false)

    const [editTodo, isEditTodoLoading] = useFetching(async () => {
        await updateTodo({...todo, text, description, deadline}).then(() => {
            todoListStore.updateTodo(todo.id, {...todo, text, description, deadline})
            setActive(false)
        })
    })

    const [deleteTodo, isDeleteTodoLoading] = useFetching(async () => {
        await destroyTodo(todo.id).then(() => {
            todoListStore.deleteTodo(todo.id)
            setDeleteConfirmationActive(false)
        })
    })

    return (
        <Form>
            <Loading isLoading={isEditTodoLoading || isDeleteTodoLoading}/>
            <h2 className={cl.title}>Название</h2>
            <div className={cl.inputBlock}>
                <Input value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <h2 className={cl.title}>Описание</h2>
            <TextArea value={description} onChange={(e) => setDescription(e.target.value)}/>
            <h2 className={cl.title}>Дедлайн</h2>
            <DatePicker value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
            <div  className={cl.buttons}>
                <button className={cl.button} onClick={() => setDeleteConfirmationActive(true)}>Удалить</button>
                <button className={cl.button} onClick={editTodo}>Сохранить</button>
            </div>
            <Modal active={deleteConfirmationActive} setActive={setDeleteConfirmationActive}>
                <Confirmation
                    text={'Вы уверены, что хотите удалить задачу?'}
                    positiveAction={deleteTodo}
                    negativeAction={() => setDeleteConfirmationActive(false)}
                />
            </Modal>
        </Form>
    );
};

export default TodoInfo;