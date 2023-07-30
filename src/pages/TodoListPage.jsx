import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import TodoList from "../components/TodoList/TodoList.jsx";
import {Context} from "../App.jsx";
import {observer} from "mobx-react-lite";
import {useFetching} from "../hooks/useFetching.js";
import Loading from "../components/UI/Loading/Loading.jsx";
import {getTodos} from "../http/todoAPI.js";

const TodoListPage = observer(() => {

    const {id} = useParams()

    const {boardStore, todoListStore} = useContext(Context)

    const [fetchTodos, isFetchTodosLoading] = useFetching(async () => {
        await getTodos(id).then(data => {
            todoListStore.setTodoList(data)
        })
    })

    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <div className="todo-list-page">
            <Loading isLoading={isFetchTodosLoading}/>
            <div className='title-pointer'>
                <h1>{boardStore.getCurrentTitle(id)}</h1>
            </div>
                <TodoList/>
        </div>
    );
});

export default TodoListPage;