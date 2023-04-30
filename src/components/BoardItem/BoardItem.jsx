import React, {useContext, useState} from 'react';
import cl from './boardItem.module.css'
import {BsPencil, RxCross2} from "react-icons/all.js";
import {Context} from "../../App.jsx";
import Modal from "../UI/Modal/Modal.jsx";
import Confirmation from "../Confirmation/Confirmation.jsx";
import UpdateBoardForm from "../UpdateBoardForm/UpdateBoardForm.jsx";
import {useFetching} from "../../hooks/useFetching.js";
import {destroyBoard} from "../../http/boardAPI.js";
import Loading from "../UI/Loading/Loading.jsx";

const BoardItem = ({board, ...props}) => {

    const {boardStore} = useContext(Context)

    const [confirmDeleteModalActive, setConfirmDeleteModalActive] = useState(false)

    const [updateBoardModalActive, setUpdateBoardModalActive] = useState(false)

    const [deleteBoard, isDeleteBoardLoading] = useFetching(async () => {
        await destroyBoard(board.id).then(data => {
            console.log(data)
            boardStore.deleteTodoBoard(board.id)
        })
    })


    const [isShowDeleteButton, setIsShowDeleteButton] = useState(false)

    return (
        <>
            <Loading isLoading={isDeleteBoardLoading}/>
            <div className={cl.boardItem}
                 onMouseEnter={() => setIsShowDeleteButton(true)}
                 onMouseLeave={() => setIsShowDeleteButton(false)}
                 {...props}
            >
                {
                    isShowDeleteButton &&
                    <div className={cl.buttonsPanel}>
                        <button className={cl.deleteButton} onClick={(e) => {
                            e.stopPropagation()
                            setUpdateBoardModalActive(true)
                        }}>
                            <BsPencil size={13}/>
                        </button>
                        <button
                            className={cl.deleteButton}
                            onClick={(e) => {
                                e.stopPropagation()
                                setConfirmDeleteModalActive(true)
                            }}
                        >
                            <RxCross2/>
                        </button>
                    </div>

                }
                <div className={cl.title}>
                    {board.title}
                </div>
            </div>

            <Modal setActive={setConfirmDeleteModalActive} active={confirmDeleteModalActive}>
                <Confirmation
                    text={'Вы уверены, что хотите удалить список задач?'}
                    positiveAction={deleteBoard}
                    negativeAction={() => setConfirmDeleteModalActive(false)}
                />
            </Modal>
            <Modal setActive={setUpdateBoardModalActive} active={updateBoardModalActive}>
                <UpdateBoardForm setActive={setUpdateBoardModalActive} board={board}/>
            </Modal>
        </>

    );
};

export default BoardItem;