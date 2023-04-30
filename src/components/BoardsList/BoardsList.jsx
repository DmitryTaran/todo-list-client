import React, {useCallback, useContext, useState} from 'react';
import BoardItem from "../BoardItem/BoardItem.jsx";
import cl from './boardsList.module.css'
import {BsPlusLg} from "react-icons/all.js";
import {useNavigate} from "react-router-dom";
import {BOARD_ROUTE} from "../../utils/consts.js";
import {Context} from "../../App.jsx";
import {observer} from "mobx-react-lite";
import Modal from "../UI/Modal/Modal.jsx";
import CreateBoardForm from "../CreateBoardForm/CreateBoardForm.jsx";

const BoardsList = observer(() => {

    const navigate = useNavigate()

    const {boardStore} = useContext(Context)

    const [createBoardActive, setCreateBoardActive] = useState(false)

    return (
        <>
            <div className={cl.boardList}>
                {boardStore.todoBoards.map(board =>
                    <BoardItem key={board.id} board={board} onClick={() => navigate(BOARD_ROUTE + board.id)}/>
                )}
                <div className={cl.addBoard} onClick={() => setCreateBoardActive(true)}>
                    <BsPlusLg size={70} color={'#6b6b6b'}/>
                </div>
            </div>
            <Modal active={createBoardActive} setActive={setCreateBoardActive}>
                <CreateBoardForm setActive={setCreateBoardActive}/>
            </Modal>
        </>

    );
});

export default BoardsList;