import React, {useContext, useState} from 'react';
import Form from "../UI/Form/Form.jsx";
import Input from "../UI/Input/Input.jsx";
import cl from './updateBoardForm.module.css'
import {Context} from "../../App.jsx";
import {useFetching} from "../../hooks/useFetching.js";
import {updateBoard} from "../../http/boardAPI.js";
import Loading from "../UI/Loading/Loading.jsx";

const UpdateBoardForm = ({setActive, board}) => {

    const {boardStore} = useContext(Context)

    const [title, setTitle] = useState(board.title)

    const [editBoard, isEditBoardLoading] = useFetching(async() => {
        await updateBoard(board.id, title).then(data => {
            boardStore.updateTodoBoard({id: board.id, title})
            setActive(false)
        })
    })


    return (
        <Form>
            <Loading isLoading={isEditBoardLoading}/>
            <h2 className={cl.title}>Редактировать доску</h2>
            <Input type="text" placeholder="Введите название доски" onChange={(e) => setTitle(e.target.value)}
                   value={title}/>
            <div className={cl.buttons}>
                <button className={cl.button} onClick={() => setActive(false)}>Отмена</button>
                <button className={cl.button} onClick={editBoard}>Изменить</button>
            </div>
        </Form>
    );
};

export default UpdateBoardForm;