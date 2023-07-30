import React, {useContext, useEffect} from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import MyBoardsPage from "../../pages/MyBoardsPage.jsx";
import TodoListPage from "../../pages/TodoListPage.jsx";
import Layout from "../Layout/Layout.jsx";
import {BOARD_ROUTE, MAIN_ROUTE, MY_BOARDS_ROUTE} from "../../utils/consts.js";
import AuthPage from "../../pages/AuthPage.jsx";
import {Context} from "../../App.jsx";
import {useFetching} from "../../hooks/useFetching.js";
import {check} from "../../http/userAPI.js";
import Loading from "../UI/Loading/Loading.jsx";
import {observer} from "mobx-react-lite";
import {getBoards} from "../../http/boardAPI.js";

const AppRouter = observer(() => {

    const {userStore, boardStore} = useContext(Context)


    const [authCheck, isAuthCheckLoading] = useFetching(async () => {
        await check().then(data => {
            if (data) {
                userStore.setUser(data)
                userStore.setIsAuth(true)

            }
        })
        if (userStore.id)
            await getBoards(userStore.id).then(data => {
                boardStore.setTodoBoards(data)
            })
    })

    useEffect(() => {
        authCheck()
    }, [])
    return (
        <>
            <Loading isLoading={isAuthCheckLoading}/>
            <Routes>
                <Route path={MAIN_ROUTE} element={<Layout/>}>
                    {
                        userStore.isAuth ?
                            <Route>
                                <Route index element={<MyBoardsPage/>}/>
                                <Route path={BOARD_ROUTE + ":id"} element={<TodoListPage/>}/>
                            </Route>
                            :
                            <Route index element={<AuthPage/>}/>


                    }
                </Route>
            </Routes>
        </>

    );
});

export default AppRouter;