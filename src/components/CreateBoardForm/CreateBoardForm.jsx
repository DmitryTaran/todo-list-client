import React, {useContext, useState} from 'react';
import Form from "../UI/Form/Form.jsx";
import Input from "../UI/Input/Input.jsx";
import cl from './createBoardForm.module.css'
import {Context} from "../../App.jsx";
import {useFetching} from "../../hooks/useFetching.js";
import {createBoard} from "../../http/boardAPI.js";
import Loading from "../UI/Loading/Loading.jsx";

const CreateBoardForm = ({setActive}) => {

    const {boardStore, userStore} = useContext(Context)

    const [title, setTitle] = useState('')
    // const addBoard = () => {
    //     boardStore.addTodoBoard({id: Date.now(), title})
    //     setActive(false)
    // }

    const [addBoard, isAddBoardLoading] = useFetching(async() => {
        await createBoard(userStore.id, title).then(data => {
            boardStore.addTodoBoard(data)
            setActive(false)
        })
    })


    return (
        <Form>
            <Loading isLoading={isAddBoardLoading}/>
            <h2 className={cl.title}>Создать доску</h2>
            <Input type="text" placeholder="Введите название доски" onChange={(e) => setTitle(e.target.value)}
                   value={title}/>
            <div className={cl.buttons}>
                <button className={cl.button} onClick={() => setActive(false)}>Отмена</button>
                <button className={cl.button} onClick={addBoard}>Создать</button>
            </div>
        </Form>
    );
};

export default CreateBoardForm;