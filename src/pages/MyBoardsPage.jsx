import React, {useContext, useEffect} from 'react';
import BoardsList from "../components/BoardsList/BoardsList.jsx";
import {useFetching} from "../hooks/useFetching.js";
import {getBoards} from "../http/boardAPI.js";
import {Context} from "../App.jsx";
import Loading from "../components/UI/Loading/Loading.jsx";

const MyBoardsPage = () => {

    const {userStore, boardStore} = useContext(Context)

    const [fetchBoards, isFetchBoardsLoading] = useFetching(async () => {
        await getBoards(userStore.id).then(data => {
            boardStore.setTodoBoards(data)
        })
    })

    useEffect(() => {
        fetchBoards()
    }, [])

    return (
        <div>
            <Loading isLoading={isFetchBoardsLoading}/>
            <div className='title-wrapper'>
                <h1>Мои доски</h1>
            </div>
            <BoardsList/>
        </div>
    );
};

export default MyBoardsPage;